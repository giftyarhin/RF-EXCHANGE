// RFEX enhanced interactions
(function(){
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const modal = document.getElementById('featureModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.querySelector('.modal-close');
  
  // ========== CURRENCY CONVERTER ==========
  
  // Exchange rates (relative to USD) - will be updated with live data
  let exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    NGN: 1650,
    GHS: 15.5,
    BTC: 0.0000106,    // ~$94,250
    ETH: 0.000351,     // ~$2,850
    USDT: 1.0,
    BNB: 0.00235,      // ~$425
    SOL: 0.00603       // ~$166
  };

  let lastRateUpdate = null;

  // Fetch live cryptocurrency rates
  async function fetchLiveCryptoRates() {
    try {
      // Using CoinGecko free API (no API key required)
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,tether&vs_currencies=usd');
      const data = await response.json();
      
      if (data) {
        // Update crypto rates (convert to rate per 1 USD)
        if (data.bitcoin?.usd) exchangeRates.BTC = 1 / data.bitcoin.usd;
        if (data.ethereum?.usd) exchangeRates.ETH = 1 / data.ethereum.usd;
        if (data.binancecoin?.usd) exchangeRates.BNB = 1 / data.binancecoin.usd;
        if (data.solana?.usd) exchangeRates.SOL = 1 / data.solana.usd;
        if (data.tether?.usd) exchangeRates.USDT = 1 / data.tether.usd;
        
        lastRateUpdate = new Date();
        console.log('✅ Live crypto rates updated:', data);
        
        // Update last update time display
        updateLastUpdateTime();
        
        // Show notification
        showRateUpdateNotification('Crypto');
        
        // Update conversion if converter is visible
        if (document.getElementById('convertFromAmount')?.value) {
          updateConversion('from');
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch live crypto rates, using fallback rates:', error);
    }
  }

  // Fetch live fiat rates
  async function fetchLiveFiatRates() {
    try {
      // Using exchangerate-api.com free tier (no API key required for basic usage)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      if (data?.rates) {
        // Update fiat rates
        if (data.rates.EUR) exchangeRates.EUR = data.rates.EUR;
        if (data.rates.GBP) exchangeRates.GBP = data.rates.GBP;
        if (data.rates.NGN) exchangeRates.NGN = data.rates.NGN;
        if (data.rates.GHS) exchangeRates.GHS = data.rates.GHS;
        
        console.log('✅ Live fiat rates updated:', data.rates);
        
        // Update last update time display
        updateLastUpdateTime();
        
        // Show notification
        showRateUpdateNotification('Fiat');
        
        // Update conversion if converter is visible
        if (document.getElementById('convertFromAmount')?.value) {
          updateConversion('from');
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch live fiat rates, using fallback rates:', error);
    }
  }

  // Show rate update notification
  function showRateUpdateNotification(type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, rgba(16,185,129,0.95), rgba(6,182,212,0.95));
      color: white;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 8px 20px rgba(16,185,129,0.4);
      animation: slideInRight 0.3s ease-out;
      backdrop-filter: blur(10px);
    `;
    notification.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${type} rates updated • ${new Date().toLocaleTimeString()}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Update last update time display
  function updateLastUpdateTime() {
    const timeEl = document.getElementById('lastUpdateTime');
    if (timeEl && lastRateUpdate) {
      timeEl.textContent = `Updated ${lastRateUpdate.toLocaleTimeString()}`;
    }
  }

  // Add CSS animation for notification
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Fetch live rates on page load
  fetchLiveCryptoRates();
  fetchLiveFiatRates();

  // Update rates every 30 seconds for crypto
  setInterval(fetchLiveCryptoRates, 30000);

  // Update rates every 5 minutes for fiat (they don't change as frequently)
  setInterval(fetchLiveFiatRates, 300000);

  // Update conversion
  window.updateConversion = function(source) {
    const fromAmount = parseFloat(document.getElementById('convertFromAmount')?.value) || 0;
    const fromCurrency = document.getElementById('convertFromCurrency')?.value || 'USD';
    const toCurrency = document.getElementById('convertToCurrency')?.value || 'USDT';
    
    if (fromAmount <= 0) {
      document.getElementById('convertToAmount').value = '';
      document.getElementById('exchangeRateText').textContent = `1 ${fromCurrency} = ${(exchangeRates[fromCurrency] / exchangeRates[toCurrency]).toFixed(8)} ${toCurrency}`;
      return;
    }
    
    // Convert: from -> USD -> to
    const usdValue = fromAmount / exchangeRates[fromCurrency];
    const toAmount = usdValue * exchangeRates[toCurrency];
    
    // Format based on currency type
    let decimals = 2;
    if (['BTC', 'ETH'].includes(toCurrency)) {
      decimals = 8;
    } else if (['BNB', 'SOL'].includes(toCurrency)) {
      decimals = 6;
    } else if (['NGN', 'GHS'].includes(toCurrency)) {
      decimals = 2;
    }
    
    document.getElementById('convertToAmount').value = toAmount.toFixed(decimals);
    
    // Update exchange rate display
    const rate = exchangeRates[fromCurrency] / exchangeRates[toCurrency];
    let rateDecimals = 2;
    if (['BTC', 'ETH'].includes(toCurrency)) {
      rateDecimals = 8;
    } else if (['BNB', 'SOL'].includes(toCurrency)) {
      rateDecimals = 6;
    } else if (rate > 100) {
      rateDecimals = 2;
    } else if (rate < 0.01) {
      rateDecimals = 8;
    }
    
    document.getElementById('exchangeRateText').textContent = 
      `1 ${fromCurrency} = ${rate.toFixed(rateDecimals)} ${toCurrency}`;
  };

  // Swap currencies
  window.swapCurrencies = function() {
    const fromCurrency = document.getElementById('convertFromCurrency').value;
    const toCurrency = document.getElementById('convertToCurrency').value;
    const fromAmount = document.getElementById('convertFromAmount').value;
    const toAmount = document.getElementById('convertToAmount').value;
    
    // Swap currency selectors
    document.getElementById('convertFromCurrency').value = toCurrency;
    document.getElementById('convertToCurrency').value = fromCurrency;
    
    // Swap amounts
    document.getElementById('convertFromAmount').value = toAmount;
    
    // Recalculate
    updateConversion('from');
  };

  // Execute conversion
  window.executeConvert = function() {
    const fromAmount = parseFloat(document.getElementById('convertFromAmount')?.value) || 0;
    const fromCurrency = document.getElementById('convertFromCurrency')?.value;
    const toAmount = parseFloat(document.getElementById('convertToAmount')?.value) || 0;
    const toCurrency = document.getElementById('convertToCurrency')?.value;
    
    if (fromAmount <= 0) {
      alert('Please enter an amount to convert');
      return;
    }
    
    alert(`✅ Conversion Successful!\n\n${fromAmount} ${fromCurrency}\n↓\n${toAmount} ${toCurrency}\n\nThis is a demo conversion. In a real exchange, this would execute the trade instantly.`);
  };
  
  // Mobile nav toggle
  navToggle && navToggle.addEventListener('click', ()=>{
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav && navToggle && !nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove('active');
    }
  });

  // Close mobile menu when clicking a link
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        if(window.innerWidth <= 900 && nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });

  // Feature card modal forms
  const forms = {
    account: {
      title: 'Create Your Account',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'account')">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" name="fullname" required placeholder="Enter your full name">
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Create a strong password">
          </div>
          <div class="form-group">
            <label>Preferred Fiat Currency</label>
            <select name="currency" required>
              <option value="">Select currency</option>
              <option value="GHS">GHS - Ghanaian Cedi</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <button type="submit" class="form-submit">Create Account</button>
          <p class="form-note">This is a demo. No real account will be created.</p>
        </form>
      `
    },
    kyc: {
      title: 'KYC Verification',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'kyc')">
          <div class="form-group">
            <label>ID Type</label>
            <select name="idtype" required>
              <option value="">Select ID type</option>
              <option value="passport">Passport</option>
              <option value="ghana-card">Ghana Card</option>
              <option value="drivers">Driver's License</option>
            </select>
          </div>
          <div class="form-group">
            <label>ID Number</label>
            <input type="text" name="idnumber" required placeholder="Enter your ID number">
          </div>
          <div class="form-group">
            <label>Upload ID Document</label>
            <input type="file" name="iddoc" accept="image/*,.pdf">
          </div>
          <div class="form-group">
            <label>Upload Selfie</label>
            <input type="file" name="selfie" accept="image/*">
          </div>
          <button type="submit" class="form-submit">Submit for Verification</button>
          <p class="form-note">Your documents will be reviewed by our team within 24-48 hours.</p>
        </form>
      `
    },
    wallet: {
      title: 'Your Wallet',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'wallet')">
          <div class="form-group">
            <label>Wallet Type</label>
            <select name="wallettype" required>
              <option value="">Select wallet</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt">Tether (USDT)</option>
              <option value="fiat">Fiat Wallet (GHS/USD/EUR)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Action</label>
            <select name="action" required>
              <option value="">Select action</option>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
              <option value="history">View History</option>
            </select>
          </div>
          <div class="form-group">
            <label>Amount (optional)</label>
            <input type="number" name="amount" step="0.01" placeholder="0.00">
          </div>
          <button type="submit" class="form-submit">Proceed</button>
          <p class="form-note">Demo mode - transactions will not be processed.</p>
        </form>
      `
    },
    giftcard: {
      title: 'Gift Card Marketplace',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'giftcard')">
          <div class="form-group">
            <label>Action</label>
            <select name="action" required>
              <option value="">Select action</option>
              <option value="buy">Buy Gift Card</option>
              <option value="sell">Sell Gift Card</option>
            </select>
          </div>
          <div class="form-group">
            <label>Card Type</label>
            <select name="cardtype" required>
              <option value="">Select card</option>
              <option value="amazon">Amazon</option>
              <option value="steam">Steam</option>
              <option value="apple">Apple</option>
              <option value="google">Google Play</option>
            </select>
          </div>
          <div class="form-group">
            <label>Amount (USD)</label>
            <input type="number" name="amount" required step="5" min="5" placeholder="25.00">
          </div>
          <div class="form-group">
            <label>Additional Notes</label>
            <textarea name="notes" placeholder="Any special requirements or card codes..."></textarea>
          </div>
          <button type="submit" class="form-submit">Continue</button>
          <p class="form-note">Demo marketplace - no real transactions will occur.</p>
        </form>
      `
    },
    bank: {
      title: 'Bank Transfer Deposit',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'bank')">
          <div class="form-group">
            <label>Select Bank</label>
            <select name="bank" required>
              <option value="">Choose your bank</option>
              <option value="gcb">GCB Bank</option>
              <option value="access">Access Bank</option>
              <option value="ecobank">Ecobank</option>
              <option value="fidelity">Fidelity Bank</option>
              <option value="zenith">Zenith Bank</option>
              <option value="gtbank">GTBank</option>
            </select>
          </div>
          <div class="form-group">
            <label>Account Number</label>
            <input type="text" name="accountnumber" required placeholder="Your bank account number">
          </div>
          <div class="form-group">
            <label>Account Name</label>
            <input type="text" name="accountname" required placeholder="Name on account">
          </div>
          <div class="form-group">
            <label>Deposit Amount (GHS)</label>
            <input type="number" name="amount" required step="0.01" min="10" placeholder="100.00">
          </div>
          <div class="form-group">
            <label>Currency to Receive</label>
            <select name="receivecurrency" required>
              <option value="">Select currency</option>
              <option value="usdt">USDT</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="ghs">GHS (Fiat Wallet)</option>
            </select>
          </div>
          <button type="submit" class="form-submit">Generate Payment Details</button>
          <p class="form-note">You'll receive our bank details to complete the transfer.</p>
        </form>
      `
    },
    mobile: {
      title: 'Mobile Money Deposit',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'mobile')">
          <div class="form-group">
            <label>Mobile Money Provider</label>
            <select name="provider" required>
              <option value="">Select provider</option>
              <option value="mtn">MTN Mobile Money</option>
              <option value="vodafone">Vodafone Cash</option>
              <option value="airteltigo">AirtelTigo Money</option>
            </select>
          </div>
          <div class="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="phone" required placeholder="0XX XXX XXXX">
          </div>
          <div class="form-group">
            <label>Account Name</label>
            <input type="text" name="name" required placeholder="Name registered on mobile money">
          </div>
          <div class="form-group">
            <label>Deposit Amount (GHS)</label>
            <input type="number" name="amount" required step="1" min="5" placeholder="50.00">
          </div>
          <div class="form-group">
            <label>Receive As</label>
            <select name="receiveas" required>
              <option value="">Select asset</option>
              <option value="usdt">USDT</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="ghs">GHS (Fiat Wallet)</option>
            </select>
          </div>
          <button type="submit" class="form-submit">Send Payment Prompt</button>
          <p class="form-note">You'll receive a prompt on your phone to approve the payment.</p>
        </form>
      `
    },
    crypto: {
      title: 'Crypto Deposit',
      fields: `
        <form class="modal-form" onsubmit="return handleFormSubmit(event, 'crypto')">
          <div class="form-group">
            <label>Select Cryptocurrency</label>
            <select name="crypto" required onchange="updateDepositAddress(this.value)">
              <option value="">Choose crypto</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt-erc20">USDT (ERC20)</option>
              <option value="usdt-trc20">USDT (TRC20)</option>
              <option value="bnb">BNB (BSC)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Network</label>
            <input type="text" id="network" readonly placeholder="Network will appear here" style="background:rgba(255,255,255,0.02)">
          </div>
          <div class="form-group">
            <label>Deposit Address</label>
            <input type="text" id="depositAddress" readonly placeholder="Select crypto to generate address" style="background:rgba(255,255,255,0.02);font-size:0.85rem">
          </div>
          <div class="form-group">
            <label>Amount to Deposit</label>
            <input type="number" name="amount" step="0.00000001" placeholder="0.00">
          </div>
          <div style="background:rgba(255,183,3,0.1);padding:12px;border-radius:8px;margin-top:10px">
            <strong style="color:var(--accent)">⚠️ Important:</strong>
            <p style="font-size:0.85rem;margin:5px 0 0;color:var(--muted)">Only send the selected cryptocurrency to this address. Sending other assets may result in permanent loss.</p>
          </div>
          <button type="submit" class="form-submit">I've Sent the Deposit</button>
          <p class="form-note">Deposits are credited after network confirmations (typically 10-30 min).</p>
        </form>
        <script>
          function updateDepositAddress(crypto) {
            const addresses = {
              'btc': { addr: 'bc1q9x7y8z5w4v3u2t1s0r9q8p7o6n5m4l3k2j1', network: 'Bitcoin (BTC)' },
              'eth': { addr: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'Ethereum (ERC20)' },
              'usdt-erc20': { addr: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'Ethereum (ERC20)' },
              'usdt-trc20': { addr: 'TYASr6cqKFxXsLS1vPMkHpJvZqMbWRJAXX', network: 'Tron (TRC20)' },
              'bnb': { addr: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'BSC (BEP20)' }
            };
            const selected = addresses[crypto];
            if(selected) {
              document.getElementById('depositAddress').value = selected.addr;
              document.getElementById('network').value = selected.network;
            }
          }
        </script>
      `
    }
  };

  // Open referral modal
  window.openReferralModal = function() {
    const referralCode = 'RFEX' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const referralLink = `https://rfex.example/signup?ref=${referralCode}`;
    
    modalTitle.textContent = '🎉 Your Referral Link';
    modalBody.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:3rem;margin-bottom:16px">🔗</div>
        <h3 style="color:var(--accent);margin-bottom:12px">Share & Earn!</h3>
        <p style="color:var(--muted);margin-bottom:24px">
          Share this link with friends and earn 30% commission on their trading fees forever!
        </p>
        
        <div class="form-group" style="text-align:left">
          <label>Your Unique Referral Code</label>
          <div style="display:flex;gap:8px">
            <input type="text" id="refCode" value="${referralCode}" readonly style="flex:1;background:rgba(255,183,3,0.1);border:1px solid rgba(255,183,3,0.3);font-weight:600;text-align:center;font-size:1.2rem">
            <button onclick="copyToClipboard('refCode')" class="copy-btn">Copy</button>
          </div>
        </div>

        <div class="form-group" style="text-align:left;margin-top:16px">
          <label>Your Referral Link</label>
          <div style="display:flex;gap:8px">
            <input type="text" id="refLink" value="${referralLink}" readonly style="flex:1;background:rgba(255,255,255,0.03);font-size:0.9rem">
            <button onclick="copyToClipboard('refLink')" class="copy-btn">Copy</button>
          </div>
        </div>

        <div style="margin-top:30px;padding:20px;background:linear-gradient(135deg,rgba(255,183,3,0.1),rgba(6,182,212,0.05));border-radius:12px;border:1px solid rgba(255,183,3,0.2)">
          <h4 style="margin:0 0 12px;color:var(--accent)">💡 Quick Share Options</h4>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <button onclick="shareVia('whatsapp','${referralLink}')" class="btn-ghost" style="padding:10px 16px;font-size:0.9rem">
              📱 WhatsApp
            </button>
            <button onclick="shareVia('twitter','${referralLink}')" class="btn-ghost" style="padding:10px 16px;font-size:0.9rem">
              🐦 Twitter
            </button>
            <button onclick="shareVia('telegram','${referralLink}')" class="btn-ghost" style="padding:10px 16px;font-size:0.9rem">
              ✈️ Telegram
            </button>
            <button onclick="shareVia('email','${referralLink}')" class="btn-ghost" style="padding:10px 16px;font-size:0.9rem">
              📧 Email
            </button>
          </div>
        </div>

        <div style="margin-top:24px;padding:16px;background:rgba(6,182,212,0.1);border-radius:10px">
          <strong style="color:var(--accent-2)">💰 Your Earnings Breakdown:</strong>
          <div style="margin-top:12px;text-align:left;color:var(--muted);font-size:0.9rem">
            <div style="margin:6px 0">✅ 30% of all spot trading fees</div>
            <div style="margin:6px 0">✅ 30% of all futures trading fees</div>
            <div style="margin:6px 0">✅ Lifetime recurring commission</div>
            <div style="margin:6px 0">✅ Instant payouts to your wallet</div>
            <div style="margin:6px 0">✅ No limits on earnings!</div>
          </div>
        </div>

        <button onclick="document.getElementById('featureModal').style.display='none';document.body.style.overflow=''" 
                class="btn-primary" style="margin-top:24px;width:100%;padding:14px;border:none;border-radius:10px;cursor:pointer">
          Done
        </button>
      </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  // Copy to clipboard function
  window.copyToClipboard = function(elementId) {
    const input = document.getElementById(elementId);
    input.select();
    document.execCommand('copy');
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  };

  // Share via social media
  window.shareVia = function(platform, link) {
    const message = `Join me on RFEX - the best crypto exchange for Africa! Trade with low fees and get instant deposits via mobile money. Sign up now: ${link}`;
    const encodedMsg = encodeURIComponent(message);
    const encodedLink = encodeURIComponent(link);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodedMsg}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedMsg}`,
      telegram: `https://t.me/share/url?url=${encodedLink}&text=${encodeURIComponent('Join me on RFEX - the best crypto exchange for Africa!')}`,
      email: `mailto:?subject=${encodeURIComponent('Join RFEX - Crypto Exchange')}&body=${encodedMsg}`
    };
    
    if(urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  // Add gift card forms to the forms object
  forms.buy = {
    title: '🎁 Buy Gift Cards',
    fields: `
      <form class="modal-form" onsubmit="return handleFormSubmit(event, 'buy-giftcard')">
        <div class="form-group">
          <label>Select Region</label>
          <select name="region" id="buyRegion" required onchange="updateGiftCardsByRegion()">
            <option value="">Choose region</option>
            <option value="usa">🇺🇸 United States (USA)</option>
            <option value="uk">🇬🇧 United Kingdom (UK)</option>
            <option value="eu">🇪🇺 Europe (EU)</option>
            <option value="canada">🇨🇦 Canada</option>
            <option value="australia">🇦� Australia</option>
            <option value="global">� Global</option>
          </select>
        </div>

        <div style="margin-bottom:20px" id="giftCardSelection" style="display:none">
          <h4 style="margin:0 0 12px;color:var(--accent)">Select Gift Card</h4>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-height:400px;overflow-y:auto;padding-right:8px" id="cardOptions">
            <!-- Cards will be populated based on region -->
          </div>
        </div>
        
        <div class="form-group">
          <label>Select Amount (USD)</label>
          <select name="amount" required onchange="updateBuyTotal()">
            <option value="">Choose amount</option>
            <option value="10">$10</option>
            <option value="25">$25</option>
            <option value="50">$50</option>
            <option value="100">$100</option>
            <option value="200">$200</option>
            <option value="500">$500</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Payment Method</label>
          <select name="payment" required>
            <option value="">Select payment</option>
            <option value="btc">Bitcoin (BTC)</option>
            <option value="eth">Ethereum (ETH)</option>
            <option value="usdt">USDT</option>
            <option value="wallet">RFEX Wallet Balance</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Email for Delivery</label>
          <input type="email" name="email" required placeholder="your@email.com">
        </div>
        
        <div style="background:rgba(255,183,3,0.1);padding:14px;border-radius:10px;margin-top:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Card Value:</span>
            <strong>$<span id="cardValue">0</span></strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Processing Fee (2%):</span>
            <strong>$<span id="processingFee">0</span></strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.1);padding-top:8px">
            <span style="color:var(--accent);font-weight:600">Total:</span>
            <strong style="color:var(--accent);font-size:1.2rem">$<span id="totalCost">0</span></strong>
          </div>
        </div>
        
        <button type="submit" class="form-submit">Purchase Gift Card</button>
        <p class="form-note">Gift card code will be delivered instantly to your email.</p>
      </form>
    `
  };

  forms.sell = {
    title: '💳 Sell Gift Cards',
    fields: `
      <form class="modal-form" onsubmit="return handleFormSubmit(event, 'sell-giftcard')">
        <div class="form-group">
          <label>Select Region</label>
          <select name="region" id="sellRegion" required onchange="updateSellCardsByRegion()">
            <option value="">Choose region</option>
            <option value="usa">🇺🇸 United States (USA)</option>
            <option value="uk">🇬🇧 United Kingdom (UK)</option>
            <option value="eu">🇪� Europe (EU)</option>
            <option value="canada">🇨🇦 Canada</option>
            <option value="australia">🇦� Australia</option>
            <option value="global">🌍 Global</option>
          </select>
        </div>

        <div style="margin-bottom:20px" id="sellCardSelection" style="display:none">
          <h4 style="margin:0 0 12px;color:var(--accent)">Select Card Type</h4>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-height:350px;overflow-y:auto;padding-right:8px" id="sellCardOptions">
            <!-- Cards will be populated based on region -->
          </div>
        </div>

        <div class="form-group">
          <label>Type of Card</label>
          <select name="cardformat" required>
            <option value="">Select card type</option>
            <option value="ecode">E-Code (Digital)</option>
            <option value="physical">Physical Card</option>
            <option value="receipt">Receipt</option>
            <option value="screenshot">Screenshot</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Card Value (USD)</label>
          <input type="number" name="cardvalue" id="sellCardValue" required step="0.01" min="10" placeholder="100.00" onchange="updateSellPrice()">
        </div>
        
        <div class="form-group">
          <label>Card Code/Number</label>
          <input type="text" name="cardcode" placeholder="Enter gift card code">
        </div>
        
        <div class="form-group">
          <label>Upload Card Image (Optional)</label>
          <input type="file" name="cardimage" accept="image/*">
          <small style="color:var(--muted);font-size:0.85rem">Upload a clear photo of your gift card</small>
        </div>
        
        <div class="form-group">
          <label>Receive Payment As</label>
          <select name="receiveas" id="sellPaymentMethod" required onchange="updateSellPaymentDisplay()">
            <option value="">Select payment method</option>
            <option value="naira">🇳🇬 Nigerian Naira (NGN)</option>
            <option value="cedis">🇬🇭 Ghanaian Cedis (GHS)</option>
            <option value="btc">₿ Bitcoin (BTC)</option>
            <option value="ltc">Ł Litecoin (LTC)</option>
            <option value="usdt-trc20">₮ USDT (TRC20)</option>
            <option value="eth">Ξ Ethereum (ETH)</option>
            <option value="wallet">💼 RFEX Wallet</option>
          </select>
        </div>

        <div id="paymentDetails" style="display:none;margin-top:10px">
          <div class="form-group" id="bankDetailsSection" style="display:none">
            <label>Bank Account Number</label>
            <input type="text" name="accountnumber" placeholder="Your account number">
          </div>
          <div class="form-group" id="walletAddressSection" style="display:none">
            <label>Wallet Address</label>
            <input type="text" name="walletaddress" placeholder="Your crypto wallet address">
          </div>
        </div>
        
        <div style="background:rgba(6,182,212,0.1);padding:14px;border-radius:10px;margin-top:16px;border:1px solid rgba(6,182,212,0.3)">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Card Value:</span>
            <strong>$<span id="sellOriginalValue">0.00</span></strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Exchange Rate:</span>
            <strong><span id="sellRate">0</span>%</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.1);padding-top:8px">
            <span style="color:var(--accent-2);font-weight:600">You'll Receive:</span>
            <strong style="color:var(--accent-2);font-size:1.2rem"><span id="sellCurrency">$</span><span id="sellFinalAmount">0.00</span></strong>
          </div>
        </div>
        
        <button type="submit" class="form-submit">Submit for Review</button>
        <p class="form-note">Admin will verify and release payment within 24 hours.</p>
      </form>
    `
  };

  // Update buy total calculation
  window.updateBuyTotal = function() {
    const amountSelect = document.querySelector('select[name="amount"]');
    const value = parseFloat(amountSelect?.value) || 0;
    const fee = value * 0.02;
    const total = value + fee;
    
    const cardValueEl = document.getElementById('cardValue');
    const processingFeeEl = document.getElementById('processingFee');
    const totalCostEl = document.getElementById('totalCost');
    
    if(cardValueEl) cardValueEl.textContent = value.toFixed(2);
    if(processingFeeEl) processingFeeEl.textContent = fee.toFixed(2);
    if(totalCostEl) totalCostEl.textContent = total.toFixed(2);
  };

  // Update gift cards based on region
  window.updateGiftCardsByRegion = function() {
    const region = document.getElementById('buyRegion')?.value;
    const cardOptionsEl = document.getElementById('cardOptions');
    const selectionDiv = document.getElementById('giftCardSelection');
    
    if(!region || !cardOptionsEl) return;
    
    selectionDiv.style.display = 'block';
    
    const cardsByRegion = {
      usa: [
        {id: 'amazon', icon: '🛒', name: 'Amazon US', range: '$10 - $500'},
        {id: 'steam', icon: '🎮', name: 'Steam', range: '$10 - $200'},
        {id: 'apple', icon: '🍎', name: 'Apple US', range: '$10 - $500'},
        {id: 'google', icon: '📱', name: 'Google Play US', range: '$10 - $300'},
        {id: 'itunes', icon: '🎵', name: 'iTunes US', range: '$15 - $200'},
        {id: 'xbox', icon: '🎯', name: 'Xbox US', range: '$10 - $200'},
        {id: 'amex-serve', icon: '💳', name: 'Amex Serve', range: '$25 - $500'},
        {id: 'bestbuy', icon: '🔌', name: 'Best Buy', range: '$15 - $500'},
        {id: 'amex', icon: '💎', name: 'American Express', range: '$25 - $500'},
        {id: 'footlocker', icon: '👟', name: 'Foot Locker US', range: '$10 - $250'},
        {id: 'ebay', icon: '🛍️', name: 'eBay US', range: '$15 - $500'}
      ],
      uk: [
        {id: 'amazon-uk', icon: '🛒', name: 'Amazon UK', range: '£10 - £500'},
        {id: 'steam', icon: '🎮', name: 'Steam', range: '£10 - £200'},
        {id: 'apple-uk', icon: '🍎', name: 'Apple UK', range: '£10 - £500'},
        {id: 'google-uk', icon: '📱', name: 'Google Play UK', range: '£10 - £300'},
        {id: 'xbox-uk', icon: '🎯', name: 'Xbox UK', range: '£10 - £200'},
        {id: 'ebay-uk', icon: '🛍️', name: 'eBay UK', range: '£15 - £500'}
      ],
      eu: [
        {id: 'amazon-eu', icon: '🛒', name: 'Amazon EU', range: '€10 - €500'},
        {id: 'steam', icon: '🎮', name: 'Steam', range: '€10 - €200'},
        {id: 'apple-eu', icon: '🍎', name: 'Apple EU', range: '€10 - €500'},
        {id: 'google-eu', icon: '📱', name: 'Google Play EU', range: '€10 - €300'},
        {id: 'xbox-eu', icon: '🎯', name: 'Xbox EU', range: '€10 - €200'}
      ],
      canada: [
        {id: 'amazon-ca', icon: '🛒', name: 'Amazon Canada', range: 'C$10 - C$500'},
        {id: 'steam', icon: '🎮', name: 'Steam', range: 'C$10 - C$200'},
        {id: 'apple-ca', icon: '🍎', name: 'Apple Canada', range: 'C$10 - C$500'},
        {id: 'google-ca', icon: '📱', name: 'Google Play CA', range: 'C$10 - C$300'},
        {id: 'xbox-ca', icon: '🎯', name: 'Xbox Canada', range: 'C$10 - C$200'},
        {id: 'ebay-ca', icon: '🛍️', name: 'eBay Canada', range: 'C$15 - C$500'}
      ],
      australia: [
        {id: 'amazon-au', icon: '🛒', name: 'Amazon Australia', range: 'A$10 - A$500'},
        {id: 'steam', icon: '🎮', name: 'Steam', range: 'A$10 - A$200'},
        {id: 'apple-au', icon: '🍎', name: 'Apple Australia', range: 'A$10 - A$500'},
        {id: 'google-au', icon: '📱', name: 'Google Play AU', range: 'A$10 - A$300'},
        {id: 'xbox-au', icon: '🎯', name: 'Xbox Australia', range: 'A$10 - A$200'},
        {id: 'ebay-au', icon: '🛍️', name: 'eBay Australia', range: 'A$15 - A$500'}
      ],
      global: [
        {id: 'steam', icon: '🎮', name: 'Steam Global', range: '$10 - $200'},
        {id: 'apple', icon: '🍎', name: 'Apple Global', range: '$10 - $500'},
        {id: 'google', icon: '📱', name: 'Google Play', range: '$10 - $300'},
        {id: 'xbox', icon: '🎯', name: 'Xbox Global', range: '$10 - $200'}
      ]
    };
    
    const cards = cardsByRegion[region] || [];
    
    cardOptionsEl.innerHTML = cards.map(card => `
      <label class="giftcard-option">
        <input type="radio" name="cardtype" value="${card.id}" required>
        <div class="giftcard-box">
          <div style="font-size:2rem">${card.icon}</div>
          <strong>${card.name}</strong>
          <span>${card.range}</span>
        </div>
      </label>
    `).join('');
  };

  // Update gift cards based on region for sell
  window.updateSellCardsByRegion = function() {
    const region = document.getElementById('sellRegion')?.value;
    const cardOptionsEl = document.getElementById('sellCardOptions');
    const selectionDiv = document.getElementById('sellCardSelection');
    
    if(!region || !cardOptionsEl) return;
    
    selectionDiv.style.display = 'block';
    
    const cardsByRegion = {
      usa: [
        {id: 'amazon', icon: '🛒', name: 'Amazon', rate: '85%'},
        {id: 'steam', icon: '🎮', name: 'Steam', rate: '80%'},
        {id: 'apple', icon: '🍎', name: 'Apple', rate: '82%'},
        {id: 'google', icon: '📱', name: 'Google Play', rate: '78%'},
        {id: 'itunes', icon: '🎵', name: 'iTunes', rate: '80%'},
        {id: 'xbox', icon: '🎯', name: 'Xbox', rate: '75%'},
        {id: 'amex-serve', icon: '💳', name: 'Amex Serve', rate: '88%'},
        {id: 'bestbuy', icon: '🔌', name: 'Best Buy', rate: '83%'},
        {id: 'amex', icon: '💎', name: 'American Express', rate: '90%'},
        {id: 'footlocker', icon: '👟', name: 'Foot Locker', rate: '77%'},
        {id: 'ebay', icon: '🛍️', name: 'eBay', rate: '84%'}
      ],
      uk: [
        {id: 'amazon-uk', icon: '🛒', name: 'Amazon UK', rate: '85%'},
        {id: 'steam', icon: '🎮', name: 'Steam', rate: '80%'},
        {id: 'apple-uk', icon: '🍎', name: 'Apple UK', rate: '82%'},
        {id: 'google-uk', icon: '📱', name: 'Google Play UK', rate: '78%'},
        {id: 'xbox-uk', icon: '🎯', name: 'Xbox UK', rate: '75%'},
        {id: 'ebay-uk', icon: '🛍️', name: 'eBay UK', rate: '84%'}
      ],
      eu: [
        {id: 'amazon-eu', icon: '🛒', name: 'Amazon EU', rate: '85%'},
        {id: 'steam', icon: '🎮', name: 'Steam', rate: '80%'},
        {id: 'apple-eu', icon: '🍎', name: 'Apple EU', rate: '82%'},
        {id: 'google-eu', icon: '📱', name: 'Google Play EU', rate: '78%'},
        {id: 'xbox-eu', icon: '🎯', name: 'Xbox EU', rate: '75%'}
      ],
      canada: [
        {id: 'amazon-ca', icon: '🛒', name: 'Amazon Canada', rate: '85%'},
        {id: 'steam', icon: '🎮', name: 'Steam', rate: '80%'},
        {id: 'apple-ca', icon: '🍎', name: 'Apple Canada', rate: '82%'},
        {id: 'google-ca', icon: '📱', name: 'Google Play CA', rate: '78%'},
        {id: 'xbox-ca', icon: '🎯', name: 'Xbox Canada', rate: '75%'},
        {id: 'ebay-ca', icon: '🛍️', name: 'eBay Canada', rate: '84%'}
      ],
      australia: [
        {id: 'amazon-au', icon: '🛒', name: 'Amazon AU', rate: '85%'},
        {id: 'steam', icon: '🎮', name: 'Steam', rate: '80%'},
        {id: 'apple-au', icon: '🍎', name: 'Apple AU', rate: '82%'},
        {id: 'google-au', icon: '📱', name: 'Google Play AU', rate: '78%'},
        {id: 'xbox-au', icon: '🎯', name: 'Xbox AU', rate: '75%'},
        {id: 'ebay-au', icon: '🛍️', name: 'eBay AU', rate: '84%'}
      ],
      global: [
        {id: 'steam', icon: '🎮', name: 'Steam Global', rate: '80%'},
        {id: 'apple', icon: '🍎', name: 'Apple Global', rate: '82%'},
        {id: 'google', icon: '📱', name: 'Google Play', rate: '78%'},
        {id: 'xbox', icon: '🎯', name: 'Xbox Global', rate: '75%'}
      ]
    };
    
    const cards = cardsByRegion[region] || [];
    
    cardOptionsEl.innerHTML = cards.map(card => `
      <label class="giftcard-option">
        <input type="radio" name="cardtype" value="${card.id}" required onchange="updateSellPrice()">
        <div class="giftcard-box">
          <div style="font-size:2rem">${card.icon}</div>
          <strong>${card.name}</strong>
          <span>${card.rate}</span>
        </div>
      </label>
    `).join('');
  };

  // Update sell price calculation
  window.updateSellPrice = function() {
    const rates = {
      // USA cards
      amazon: 85, 
      steam: 80, 
      apple: 82, 
      google: 78, 
      itunes: 80, 
      xbox: 75,
      'amex-serve': 88,
      bestbuy: 83,
      amex: 90,
      footlocker: 77,
      ebay: 84,
      // UK cards
      'amazon-uk': 85,
      'apple-uk': 82,
      'google-uk': 78,
      'xbox-uk': 75,
      'ebay-uk': 84,
      // EU cards
      'amazon-eu': 85,
      'apple-eu': 82,
      'google-eu': 78,
      'xbox-eu': 75,
      // Canada cards
      'amazon-ca': 85,
      'apple-ca': 82,
      'google-ca': 78,
      'xbox-ca': 75,
      'ebay-ca': 84,
      // Australia cards
      'amazon-au': 85,
      'apple-au': 82,
      'google-au': 78,
      'xbox-au': 75,
      'ebay-au': 84
    };
    
    // Currency conversion rates (USD to local currency)
    const currencyRates = {
      naira: 1650,      // 1 USD = 1650 NGN
      cedis: 15.5,      // 1 USD = 15.5 GHS
      btc: 0.000023,    // 1 USD = 0.000023 BTC (approx)
      ltc: 0.0115,      // 1 USD = 0.0115 LTC (approx)
      'usdt-trc20': 1,  // 1 USD = 1 USDT
      eth: 0.00037,     // 1 USD = 0.00037 ETH (approx)
      wallet: 1         // 1 USD = 1 USD
    };
    
    const currencySymbols = {
      naira: '₦',
      cedis: '₵',
      btc: '₿',
      ltc: 'Ł',
      'usdt-trc20': '₮',
      eth: 'Ξ',
      wallet: '$'
    };
    
    const valueInput = document.getElementById('sellCardValue');
    const value = parseFloat(valueInput?.value) || 0;
    const selectedCard = document.querySelector('input[name="cardtype"]:checked');
    const rate = selectedCard ? rates[selectedCard.value] : 0;
    const usdAmount = (value * rate / 100);
    
    // Get selected payment method
    const paymentMethod = document.getElementById('sellPaymentMethod')?.value || 'wallet';
    const conversionRate = currencyRates[paymentMethod] || 1;
    const currencySymbol = currencySymbols[paymentMethod] || '$';
    const finalAmount = usdAmount * conversionRate;
    
    const originalValueEl = document.getElementById('sellOriginalValue');
    const sellRateEl = document.getElementById('sellRate');
    const finalAmountEl = document.getElementById('sellFinalAmount');
    const currencyEl = document.getElementById('sellCurrency');
    
    if(originalValueEl) originalValueEl.textContent = value.toFixed(2);
    if(sellRateEl) sellRateEl.textContent = rate;
    if(currencyEl) currencyEl.textContent = currencySymbol;
    
    // Format based on currency type
    if(paymentMethod === 'btc') {
      if(finalAmountEl) finalAmountEl.textContent = finalAmount.toFixed(8);
    } else if(paymentMethod === 'eth' || paymentMethod === 'ltc') {
      if(finalAmountEl) finalAmountEl.textContent = finalAmount.toFixed(6);
    } else if(paymentMethod === 'usdt-trc20' || paymentMethod === 'wallet') {
      if(finalAmountEl) finalAmountEl.textContent = finalAmount.toFixed(2);
    } else {
      if(finalAmountEl) finalAmountEl.textContent = finalAmount.toFixed(2);
    }
  };

  // Update payment details display based on selected method
  window.updateSellPaymentDisplay = function() {
    const paymentMethod = document.getElementById('sellPaymentMethod')?.value;
    const paymentDetailsDiv = document.getElementById('paymentDetails');
    const bankSection = document.getElementById('bankDetailsSection');
    const walletSection = document.getElementById('walletAddressSection');
    
    if(!paymentMethod) {
      if(paymentDetailsDiv) paymentDetailsDiv.style.display = 'none';
      return;
    }
    
    if(paymentDetailsDiv) paymentDetailsDiv.style.display = 'block';
    
    // Show bank details for Naira and Cedis
    if(paymentMethod === 'naira' || paymentMethod === 'cedis') {
      if(bankSection) bankSection.style.display = 'block';
      if(walletSection) walletSection.style.display = 'none';
    }
    // Show wallet address for crypto
    else if(['btc', 'ltc', 'usdt-trc20', 'eth'].includes(paymentMethod)) {
      if(bankSection) bankSection.style.display = 'none';
      if(walletSection) walletSection.style.display = 'block';
    }
    // Hide both for RFEX wallet
    else {
      if(bankSection) bankSection.style.display = 'none';
      if(walletSection) walletSection.style.display = 'none';
    }
    
    // Recalculate price with new currency
    updateSellPrice();
  };

  // Open modal when gift card is clicked
  document.querySelectorAll('.giftcard-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const giftcard = this.getAttribute('data-giftcard');
      const formData = forms[giftcard];
      if(formData) {
        modalTitle.textContent = formData.title;
        modalBody.innerHTML = formData.fields;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Tier details modal
  const tierDetails = {
    starter: {
      icon: '🥉',
      name: 'Starter Tier',
      commission: '20%',
      target: '0-9 Active Referrals',
      benefits: [
        '20% commission on all trading fees',
        'Real-time earnings tracking',
        'Instant wallet payouts',
        'Access to referral dashboard',
        'Basic referral tools & links'
      ],
      nextTier: 'Invite 10 friends to unlock Pro Tier (30% commission)!',
      color: '#cd7f32'
    },
    pro: {
      icon: '🥈',
      name: 'Pro Tier',
      commission: '30%',
      target: '10-49 Active Referrals',
      benefits: [
        '30% commission on all trading fees (+10% boost!)',
        'Priority customer support',
        'Advanced analytics dashboard',
        'Custom referral landing pages',
        'Exclusive promotional materials',
        'Weekly performance reports'
      ],
      nextTier: 'Invite 50 friends to unlock Elite Tier (40% commission)!',
      color: '#c0c0c0'
    },
    elite: {
      icon: '🥇',
      name: 'Elite Tier',
      commission: '40%',
      target: '50+ Active Referrals',
      benefits: [
        '40% commission on all trading fees (+20% boost!)',
        'VIP customer support (24/7 priority)',
        'Dedicated account manager',
        'Custom API integration',
        'Featured on RFEX partners page',
        'Exclusive events & networking',
        'Early access to new features',
        'Monthly bonus rewards'
      ],
      nextTier: 'You\'ve reached the highest tier - keep earning!',
      color: '#ffd700'
    }
  };

  document.querySelectorAll('.tier-clickable').forEach(card => {
    card.addEventListener('click', function(e) {
      const tier = this.getAttribute('data-tier');
      const details = tierDetails[tier];
      
      if(details) {
        modalTitle.textContent = `${details.icon} ${details.name}`;
        modalBody.innerHTML = `
          <div style="padding:20px">
            <div style="text-align:center;margin-bottom:24px">
              <div style="font-size:4rem;margin-bottom:12px">${details.icon}</div>
              <div style="font-size:2.5rem;font-weight:700;color:${details.color};margin-bottom:8px">
                ${details.commission} Commission
              </div>
              <div style="color:var(--muted);font-size:1.1rem">${details.target}</div>
            </div>

            <div style="background:linear-gradient(135deg,rgba(255,183,3,0.1),rgba(6,182,212,0.05));padding:20px;border-radius:12px;border:1px solid rgba(255,183,3,0.2);margin-bottom:24px">
              <h3 style="margin:0 0 16px;color:var(--accent)">✨ Tier Benefits</h3>
              <div style="display:flex;flex-direction:column;gap:10px">
                ${details.benefits.map(benefit => `
                  <div style="display:flex;align-items:start;gap:10px">
                    <span style="color:#10b981;font-size:1.2rem;flex-shrink:0">✓</span>
                    <span style="color:var(--muted)">${benefit}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background:rgba(6,182,212,0.1);padding:16px;border-radius:10px;border:1px solid rgba(6,182,212,0.3);margin-bottom:24px">
              <strong style="color:var(--accent-2)">🎯 Next Milestone:</strong>
              <p style="margin:8px 0 0;color:var(--muted)">${details.nextTier}</p>
            </div>

            <div style="text-align:center">
              <h4 style="color:var(--muted);margin-bottom:12px">Ready to start earning?</h4>
              <button onclick="openReferralModal()" class="btn-primary" style="padding:14px 28px;border:none;border-radius:10px;cursor:pointer;margin-right:10px">
                Get My Referral Link
              </button>
              <button onclick="document.getElementById('featureModal').style.display='none';document.body.style.overflow=''" 
                      class="btn-ghost" style="padding:14px 28px;border-radius:10px;cursor:pointer">
                Close
              </button>
            </div>
          </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open modal when feature card is clicked
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const feature = this.getAttribute('data-feature');
      const formData = forms[feature];
      if(formData) {
        modalTitle.textContent = formData.title;
        modalBody.innerHTML = formData.fields;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open modal when payment card is clicked
  document.querySelectorAll('.payment-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const payment = this.getAttribute('data-payment');
      const formData = forms[payment];
      if(formData) {
        modalTitle.textContent = formData.title;
        modalBody.innerHTML = formData.fields;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalClose && modalClose.addEventListener('click', closeModal);
  
  window.addEventListener('click', function(e) {
    if(e.target === modal) closeModal();
  });

  // Handle form submissions
  window.handleFormSubmit = function(e, formType) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(`${formType} form submitted:`, data);
    
    // Show success message
    modalBody.innerHTML = `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:60px;margin-bottom:20px">✅</div>
        <h3 style="color:var(--accent);margin-bottom:10px">Success!</h3>
        <p style="color:var(--muted)">Your ${formType} information has been received.</p>
        <button onclick="document.getElementById('featureModal').style.display='none';document.body.style.overflow=''" 
                class="btn-primary" style="margin-top:20px;padding:12px 24px;border:none;border-radius:10px;cursor:pointer">
          Close
        </button>
      </div>
    `;
    
    return false;
  };

  // Input feedback with glow effect
  const amount = document.getElementById('amount');
  if(amount){
    amount.addEventListener('focus', ()=>{
      amount.style.transform = 'scale(1.02)';
    });
    amount.addEventListener('blur', ()=>{
      amount.style.transform = 'scale(1)';
    });
  }

  // Scroll-triggered animations for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if(entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards for scroll animation
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });

  // Ticker price animation (simulate live updates)
  const tickerPairs = document.querySelectorAll('.ticker .pair strong');
  if(tickerPairs.length > 0) {
    setInterval(() => {
      tickerPairs.forEach(price => {
        const currentPrice = parseFloat(price.textContent.replace(/,/g, ''));
        const change = (Math.random() - 0.5) * (currentPrice * 0.001);
        const newPrice = (currentPrice + change).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        price.textContent = newPrice;
        
        // Flash effect
        price.style.color = change > 0 ? '#10b981' : '#ef4444';
        setTimeout(() => { price.style.color = ''; }, 300);
      });
    }, 3000);
  }

  // ========== TRADING MARKET FUNCTIONALITY ==========
  
  // Market data
  const marketData = {
    'BTC/USDT': { price: 94250.50, change: 2.45, volume: 1250000000, quote: 'USDT' },
    'ETH/USDT': { price: 2850.75, change: -1.23, volume: 850000000, quote: 'USDT' },
    'BNB/USDT': { price: 425.30, change: 3.67, volume: 320000000, quote: 'USDT' },
    'SOL/USDT': { price: 165.80, change: 5.12, volume: 280000000, quote: 'USDT' },
    'XRP/USDT': { price: 0.6234, change: -2.34, volume: 450000000, quote: 'USDT' },
    'ADA/USDT': { price: 0.4567, change: 1.89, volume: 180000000, quote: 'USDT' },
    'ETH/BTC': { price: 0.0302, change: -3.45, volume: 95000000, quote: 'BTC' },
    'BNB/BTC': { price: 0.0045, change: 1.23, volume: 42000000, quote: 'BTC' }
  };

  let currentPair = 'BTC/USDT';
  let chartData = [];
  let tradingViewWidget = null;

  // Initialize trading interface
  function initTradingMarket() {
    renderMarketPairs();
    selectPair('BTC/USDT');
    updateMarketStats();
    initTradingViewChart();
    startPriceUpdates();
    initTradingForm();
  }

  // Render market pairs list
  function renderMarketPairs() {
    const container = document.getElementById('marketPairs');
    if (!container) return;

    const html = Object.keys(marketData).map(pair => {
      const data = marketData[pair];
      const changeClass = data.change >= 0 ? 'positive' : 'negative';
      const changeSign = data.change >= 0 ? '+' : '';
      
      return `
        <div class="pair-item ${pair === currentPair ? 'active' : ''}" onclick="selectPair('${pair}')">
          <span class="pair-name">${pair}</span>
          <span class="pair-change ${changeClass}">${changeSign}${data.change.toFixed(2)}%</span>
          <span class="pair-price">$${data.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Select trading pair
  window.selectPair = function(pair) {
    currentPair = pair;
    const data = marketData[pair];
    
    // Update header
    document.getElementById('currentPair').textContent = pair;
    document.getElementById('currentPrice').textContent = `$${data.price.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    const changeEl = document.getElementById('priceChange');
    const changeSign = data.change >= 0 ? '+' : '';
    changeEl.textContent = `${changeSign}${data.change.toFixed(2)}%`;
    changeEl.className = `price-change ${data.change >= 0 ? 'positive' : 'negative'}`;
    
    // Update active pair in list
    renderMarketPairs();
    
    // Update order book
    generateOrderBook();
    
    // Update form labels
    const baseCurrency = pair.split('/')[0];
    document.getElementById('buyCrypto').textContent = baseCurrency;
    document.getElementById('sellCrypto').textContent = baseCurrency;
    document.getElementById('buyPairName').textContent = baseCurrency;
    document.getElementById('sellPairName').textContent = baseCurrency;
    document.getElementById('cryptoSymbol').textContent = baseCurrency;
    
    // Update chart
    updateTradingViewChart();
  };

  // Generate order book
  function generateOrderBook() {
    const container = document.getElementById('orderBookContent');
    if (!container) return;

    const data = marketData[currentPair];
    const basePrice = data.price;
    
    let html = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:8px;font-weight:600;color:var(--muted);font-size:0.8rem;border-bottom:1px solid rgba(255,255,255,0.05)"><span>Price</span><span>Amount</span><span>Total</span></div>';
    
    // Asks (sell orders)
    for (let i = 5; i >= 1; i--) {
      const price = (basePrice * (1 + i * 0.001)).toFixed(2);
      const amount = (Math.random() * 2 + 0.5).toFixed(4);
      const total = (price * amount).toFixed(2);
      html += `
        <div class="orderbook-row ask">
          <span style="color:#ef4444">${price}</span>
          <span>${amount}</span>
          <span>${total}</span>
        </div>
      `;
    }
    
    // Current price divider
    html += `<div style="padding:12px 8px;text-align:center;font-weight:700;color:var(--accent);background:rgba(255,183,3,0.1);margin:4px 0">${basePrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>`;
    
    // Bids (buy orders)
    for (let i = 1; i <= 5; i++) {
      const price = (basePrice * (1 - i * 0.001)).toFixed(2);
      const amount = (Math.random() * 2 + 0.5).toFixed(4);
      const total = (price * amount).toFixed(2);
      html += `
        <div class="orderbook-row bid">
          <span style="color:#10b981">${price}</span>
          <span>${amount}</span>
          <span>${total}</span>
        </div>
      `;
    }
    
    container.innerHTML = html;
  }

  // Update market stats
  function updateMarketStats() {
    const totalVolume = Object.values(marketData).reduce((sum, data) => sum + data.volume, 0);
    const totalTrades = Math.floor(totalVolume / 50000);
    
    document.getElementById('totalVolume').textContent = (totalVolume / 1000000000).toFixed(2) + 'B';
    document.getElementById('totalTrades').textContent = totalTrades.toLocaleString('en-US');
  }

  // Initialize TradingView Chart
  function initTradingViewChart() {
    const chartContainer = document.getElementById('tradingChart');
    if (!chartContainer) return;

    // Convert pair format (BTC/USDT -> BTCUSDT)
    const symbol = currentPair.replace('/', '');
    
    // Create TradingView widget
    tradingViewWidget = new TradingView.widget({
      autosize: true,
      symbol: 'BINANCE:' + symbol,
      interval: '15',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#0F172A',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingChart',
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      studies: [
        'MASimple@tv-basicstudies',
        'RSI@tv-basicstudies'
      ],
      disabled_features: [
        'use_localstorage_for_settings',
        'header_symbol_search',
        'symbol_search_hot_key'
      ],
      enabled_features: [
        'study_templates'
      ],
      overrides: {
        'mainSeriesProperties.candleStyle.upColor': '#10b981',
        'mainSeriesProperties.candleStyle.downColor': '#ef4444',
        'mainSeriesProperties.candleStyle.borderUpColor': '#10b981',
        'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
        'mainSeriesProperties.candleStyle.wickUpColor': '#10b981',
        'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
        'paneProperties.background': '#1E293B',
        'paneProperties.backgroundType': 'solid',
        'paneProperties.vertGridProperties.color': 'rgba(255,255,255,0.05)',
        'paneProperties.horzGridProperties.color': 'rgba(255,255,255,0.05)',
        'scalesProperties.textColor': '#94A3B8',
        'scalesProperties.lineColor': 'rgba(255,255,255,0.1)'
      },
      loading_screen: {
        backgroundColor: '#1E293B',
        foregroundColor: '#FFB703'
      }
    });
  }

  // Update chart when pair changes
  function updateTradingViewChart() {
    if (!tradingViewWidget) {
      initTradingViewChart();
      return;
    }

    // Convert pair format (BTC/USDT -> BTCUSDT)
    const symbol = currentPair.replace('/', '');
    
    // Update symbol in TradingView widget using activeChart()
    if (tradingViewWidget.activeChart) {
      tradingViewWidget.activeChart().setSymbol('BINANCE:' + symbol, function() {
        console.log('✅ TradingView chart updated to:', symbol);
      });
    }
  }

  // Start live price updates
  function startPriceUpdates() {
    setInterval(() => {
      // Update all prices with small random changes
      Object.keys(marketData).forEach(pair => {
        const data = marketData[pair];
        const change = (Math.random() - 0.5) * 0.02; // ±2% max change
        data.price = data.price * (1 + change);
        data.change = data.change + (Math.random() - 0.5) * 0.5;
      });
      
      // Update current pair display
      const data = marketData[currentPair];
      document.getElementById('currentPrice').textContent = `$${data.price.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      
      const changeEl = document.getElementById('priceChange');
      const changeSign = data.change >= 0 ? '+' : '';
      changeEl.textContent = `${changeSign}${data.change.toFixed(2)}%`;
      changeEl.className = `price-change ${data.change >= 0 ? 'positive' : 'negative'}`;
      
      // Update market pairs list
      renderMarketPairs();
      
      // Update order book
      generateOrderBook();
      
      // Add new point to chart
      chartData.push({
        time: chartData.length,
        price: data.price
      });
      if (chartData.length > 24) chartData.shift();
      if (typeof drawChart === 'function') {
        drawChart();
      }
      
      // Add recent trade
      addRecentTrade();
    }, 2000); // Update every 2 seconds
  }

  // Add recent trade
  function addRecentTrade() {
    const container = document.getElementById('recentTrades');
    if (!container) return;
    
    const data = marketData[currentPair];
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const amount = (Math.random() * 2 + 0.1).toFixed(4);
    const total = (data.price * amount).toFixed(2);
    const time = new Date().toLocaleTimeString();
    
    const tradeHtml = `
      <div class="trade-row-item">
        <span class="trade-time">${time}</span>
        <span class="trade-type ${type}">${type.toUpperCase()}</span>
        <span>${amount}</span>
        <span>$${total}</span>
      </div>
    `;
    
    container.insertAdjacentHTML('afterbegin', tradeHtml);
    
    // Keep only last 10 trades
    const trades = container.querySelectorAll('.trade-row-item');
    if (trades.length > 10) {
      trades[trades.length - 1].remove();
    }
  }

  // Initialize trading form
  function initTradingForm() {
    // Tab switching
    document.querySelectorAll('.trade-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabType = tab.dataset.tab;
        
        document.querySelectorAll('.trade-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.trade-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${tabType}Form`).classList.add('active');
      });
    });

    // Order type change handlers
    document.getElementById('buyOrderType')?.addEventListener('change', (e) => {
      document.getElementById('buyLimitPrice').style.display = 
        e.target.value === 'limit' ? 'block' : 'none';
    });

    document.getElementById('sellOrderType')?.addEventListener('change', (e) => {
      document.getElementById('sellLimitPrice').style.display = 
        e.target.value === 'limit' ? 'block' : 'none';
    });

    // Amount percentage buttons
    document.querySelectorAll('.percent-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const percent = parseInt(btn.dataset.percent);
        const form = btn.closest('.trade-form');
        const isBuy = form.id === 'buyForm';
        
        if (isBuy) {
          const balance = 1000; // Demo USDT balance
          const price = marketData[currentPair].price;
          const amount = (balance * percent / 100) / price;
          document.getElementById('buyAmount').value = amount.toFixed(6);
          calculateBuyTotal();
        } else {
          const balance = 0.05; // Demo crypto balance
          const amount = balance * percent / 100;
          document.getElementById('sellAmount').value = amount.toFixed(6);
          calculateSellTotal();
        }
      });
    });

    // Calculate totals on input
    document.getElementById('buyAmount')?.addEventListener('input', calculateBuyTotal);
    document.getElementById('buyPrice')?.addEventListener('input', calculateBuyTotal);
    document.getElementById('sellAmount')?.addEventListener('input', calculateSellTotal);
    document.getElementById('sellPrice')?.addEventListener('input', calculateSellTotal);

    // Market filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        filterMarkets(filter);
      });
    });
  }

  // Calculate buy total
  function calculateBuyTotal() {
    const amount = parseFloat(document.getElementById('buyAmount')?.value) || 0;
    const orderType = document.getElementById('buyOrderType')?.value;
    const price = orderType === 'limit' 
      ? parseFloat(document.getElementById('buyPrice')?.value) || 0
      : marketData[currentPair].price;
    
    const total = amount * price;
    document.getElementById('buyTotal').value = total.toFixed(2);
  }

  // Calculate sell total
  function calculateSellTotal() {
    const amount = parseFloat(document.getElementById('sellAmount')?.value) || 0;
    const orderType = document.getElementById('sellOrderType')?.value;
    const price = orderType === 'limit' 
      ? parseFloat(document.getElementById('sellPrice')?.value) || 0
      : marketData[currentPair].price;
    
    const total = amount * price;
    document.getElementById('sellTotal').value = total.toFixed(2);
  }

  // Execute trade
  window.executeTrade = function(type) {
    const amount = parseFloat(document.getElementById(`${type}Amount`)?.value) || 0;
    const orderType = document.getElementById(`${type}OrderType`)?.value;
    
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    const baseCurrency = currentPair.split('/')[0];
    const price = orderType === 'limit' 
      ? parseFloat(document.getElementById(`${type}Price`)?.value) || marketData[currentPair].price
      : marketData[currentPair].price;
    
    const total = amount * price;
    
    alert(`✅ ${type.toUpperCase()} Order Executed!\n\nPair: ${currentPair}\nType: ${orderType.toUpperCase()}\nAmount: ${amount} ${baseCurrency}\nPrice: $${price.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nThis is a demo - no real trade was placed.`);
    
    // Reset form
    document.getElementById(`${type}Amount`).value = '';
    document.getElementById(`${type}Total`).value = '';
    if (orderType === 'limit') {
      document.getElementById(`${type}Price`).value = '';
    }
  };

  // Filter markets
  function filterMarkets(filter) {
    const pairs = Object.keys(marketData);
    const filtered = filter === 'all' 
      ? pairs 
      : pairs.filter(pair => pair.includes(filter.toUpperCase()));
    
    const container = document.getElementById('marketPairs');
    if (!container) return;

    const html = filtered.map(pair => {
      const data = marketData[pair];
      const changeClass = data.change >= 0 ? 'positive' : 'negative';
      const changeSign = data.change >= 0 ? '+' : '';
      
      return `
        <div class="pair-item ${pair === currentPair ? 'active' : ''}" onclick="selectPair('${pair}')">
          <span class="pair-name">${pair}</span>
          <span class="pair-change ${changeClass}">${changeSign}${data.change.toFixed(2)}%</span>
          <span class="pair-price">$${data.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Initialize on page load
  if (document.getElementById('marketPairs')) {
    initTradingMarket();
  }

  // ========== WALLETS FUNCTIONALITY ==========
  
  // Wallet data
  const wallets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', balance: 0.05234, price: 94250.50, change24h: 2.45 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', balance: 1.8567, price: 2850.75, change24h: -1.23 },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', balance: 5420.00, price: 1.00, change24h: 0.01 },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', icon: '🟡', balance: 12.45, price: 425.30, change24h: 3.67 },
    { id: 'sol', name: 'Solana', symbol: 'SOL', icon: '◎', balance: 28.90, price: 165.80, change24h: 5.12 },
    { id: 'xrp', name: 'XRP', symbol: 'XRP', icon: '✕', balance: 1240.50, price: 0.6234, change24h: -2.34 },
    { id: 'ngn', name: 'Nigerian Naira', symbol: 'NGN', icon: '₦', balance: 45000, price: 0.000606, change24h: 0 },
    { id: 'ghs', name: 'Ghanaian Cedis', symbol: 'GHS', icon: '₵', balance: 3200, price: 0.0645, change24h: 0 }
  ];

  // Transaction data
  let transactions = [
    { id: 1, type: 'deposit', currency: 'BTC', amount: 0.05, usdValue: 4712.53, date: new Date(Date.now() - 3600000), status: 'completed' },
    { id: 2, type: 'withdraw', currency: 'USDT', amount: -1000, usdValue: 1000, date: new Date(Date.now() - 7200000), status: 'completed' },
    { id: 3, type: 'transfer', currency: 'ETH', amount: 0.5, usdValue: 1425.38, date: new Date(Date.now() - 10800000), status: 'completed' },
    { id: 4, type: 'deposit', currency: 'NGN', amount: 50000, usdValue: 30.30, date: new Date(Date.now() - 14400000), status: 'pending' },
    { id: 5, type: 'withdraw', currency: 'BNB', amount: -5, usdValue: 2126.50, date: new Date(Date.now() - 86400000), status: 'completed' }
  ];

  // Initialize wallets
  function initWallets() {
    renderWallets();
    renderTransactions();
    updatePortfolioValue();
  }

  // Render wallet cards
  function renderWallets() {
    const container = document.getElementById('walletsGrid');
    if (!container) return;

    const html = wallets.map(wallet => {
      const usdValue = wallet.balance * wallet.price;
      const changeClass = wallet.change24h >= 0 ? 'positive' : 'negative';
      const changeSign = wallet.change24h >= 0 ? '+' : '';
      
      return `
        <div class="wallet-card" onclick="openWalletDetails('${wallet.id}')">
          <div class="wallet-header">
            <div>
              <div class="wallet-icon">${wallet.icon}</div>
            </div>
            <div style="text-align:right">
              <div class="wallet-name">${wallet.name}</div>
              <div class="wallet-symbol">${wallet.symbol}</div>
            </div>
          </div>
          <div class="wallet-balance">${wallet.balance.toLocaleString('en-US', {minimumFractionDigits: wallet.symbol === 'BTC' || wallet.symbol === 'ETH' ? 4 : 2})}</div>
          <div class="wallet-usd-value">
            ≈ $${usdValue.toLocaleString('en-US', {minimumFractionDigits: 2})}
            <span class="change-${changeClass.replace('positive', 'positive').replace('negative', 'negative')}" style="margin-left:8px;font-size:0.85rem">${changeSign}${wallet.change24h}%</span>
          </div>
          <div class="wallet-footer">
            <button class="wallet-btn" onclick="event.stopPropagation(); openWalletAction('${wallet.id}', 'deposit')">Deposit</button>
            <button class="wallet-btn" onclick="event.stopPropagation(); openWalletAction('${wallet.id}', 'send')">Send</button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Render transactions
  function renderTransactions(filter = 'all') {
    const container = document.getElementById('transactionsList');
    if (!container) return;

    const filtered = filter === 'all' 
      ? transactions 
      : transactions.filter(t => t.type === filter);

    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px">No transactions found</p>';
      return;
    }

    const html = filtered.map(tx => {
      const isPositive = tx.amount > 0;
      const amountClass = isPositive ? 'positive' : 'negative';
      const amountSign = isPositive ? '+' : '';
      
      let icon = '💰';
      if (tx.type === 'deposit') icon = '⬇️';
      else if (tx.type === 'withdraw') icon = '⬆️';
      else if (tx.type === 'transfer') icon = '🔄';

      return `
        <div class="transaction-item">
          <div class="transaction-icon ${tx.type}">
            ${icon}
          </div>
          <div class="transaction-details">
            <div class="transaction-type">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} ${tx.currency}</div>
            <div class="transaction-date">${formatDate(tx.date)}</div>
          </div>
          <div class="transaction-amount ${amountClass}">
            ${amountSign}${Math.abs(tx.amount).toLocaleString('en-US', {minimumFractionDigits: 2})} ${tx.currency}
          </div>
          <div class="transaction-status ${tx.status}">
            ${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Format date
  function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  // Update portfolio value
  function updatePortfolioValue() {
    const total = wallets.reduce((sum, wallet) => sum + (wallet.balance * wallet.price), 0);
    const change24h = wallets.reduce((sum, wallet) => {
      const value = wallet.balance * wallet.price;
      const change = value * (wallet.change24h / 100);
      return sum + change;
    }, 0);
    
    const changePercent = (change24h / total) * 100;
    
    document.getElementById('totalPortfolioValue').textContent = `$${total.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    const changeEl = document.getElementById('portfolioChange');
    const changeClass = change24h >= 0 ? 'change-positive' : 'change-negative';
    const changeSign = change24h >= 0 ? '+' : '';
    changeEl.className = changeClass;
    changeEl.textContent = `${changeSign}$${Math.abs(change24h).toLocaleString('en-US', {minimumFractionDigits: 2})} (${changeSign}${changePercent.toFixed(2)}%)`;
  }

  // Refresh wallet balances
  window.refreshWalletBalances = function(event) {
    // Simulate balance update
    wallets.forEach(wallet => {
      const change = (Math.random() - 0.5) * 0.02;
      wallet.balance = wallet.balance * (1 + change);
    });
    
    renderWallets();
    updatePortfolioValue();
    
    // Show success message
    if (event && event.target) {
      const btn = event.target.closest('.refresh-btn');
      if (btn) {
        btn.style.transform = 'rotate(720deg)';
        setTimeout(() => {
          btn.style.transform = '';
          if (typeof showNotification === 'function') {
            showNotification('Balances refreshed successfully!', 'success');
          }
        }, 600);
      }
    }
  };

  // Open wallet modal
  window.openWalletModal = function(action) {
    const titles = {
      deposit: 'Deposit Funds',
      withdraw: 'Withdraw Funds',
      transfer: 'Transfer Between Wallets',
      history: 'Transaction History'
    };
    
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = titles[action] || 'Wallet Action';
    
    let content = '';
    
    if (action === 'deposit') {
      content = `
        <form class="modal-form" onsubmit="return handleWalletAction(event, 'deposit')">
          <div class="form-group">
            <label>Select Currency</label>
            <select name="currency" required>
              ${wallets.map(w => `<option value="${w.id}">${w.name} (${w.symbol})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Deposit Method</label>
            <select name="method" required>
              <option value="crypto">Crypto Transfer</option>
              <option value="bank">Bank Transfer</option>
              <option value="mobile">Mobile Money</option>
            </select>
          </div>
          <button type="submit" class="form-submit">Generate Deposit Address</button>
        </form>
      `;
    } else if (action === 'withdraw') {
      content = `
        <form class="modal-form" onsubmit="return handleWalletAction(event, 'withdraw')">
          <div class="form-group">
            <label>Select Currency</label>
            <select name="currency" required>
              ${wallets.map(w => `<option value="${w.id}">${w.name} (${w.symbol}) - ${w.balance.toFixed(4)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Withdrawal Address</label>
            <input type="text" name="address" required placeholder="Enter withdrawal address">
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input type="number" name="amount" required step="0.00000001" min="0" placeholder="0.00">
          </div>
          <button type="submit" class="form-submit">Withdraw Funds</button>
          <p class="form-note">Network fees will be deducted from your withdrawal amount.</p>
        </form>
      `;
    } else if (action === 'transfer') {
      content = `
        <form class="modal-form" onsubmit="return handleWalletAction(event, 'transfer')">
          <div class="form-group">
            <label>From Wallet</label>
            <select name="from" required>
              ${wallets.map(w => `<option value="${w.id}">${w.name} (${w.symbol})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>To Wallet</label>
            <select name="to" required>
              ${wallets.map(w => `<option value="${w.id}">${w.name} (${w.symbol})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input type="number" name="amount" required step="0.00000001" min="0" placeholder="0.00">
          </div>
          <button type="submit" class="form-submit">Transfer Now</button>
        </form>
      `;
    } else if (action === 'history') {
      content = `<div style="max-height:400px;overflow-y:auto">${document.getElementById('transactionsList')?.innerHTML || 'No transactions'}</div>`;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
  };

  // Handle wallet action
  window.handleWalletAction = function(event, action) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    alert(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} Request Submitted!\n\n${JSON.stringify(data, null, 2)}\n\nThis is a demo - no real transaction was made.`);
    
    document.getElementById('featureModal').style.display = 'none';
    return false;
  };

  // Open wallet details
  window.openWalletDetails = function(walletId) {
    const wallet = wallets.find(w => w.id === walletId);
    if (!wallet) return;
    
    alert(`${wallet.icon} ${wallet.name} (${wallet.symbol})\n\nBalance: ${wallet.balance.toFixed(4)} ${wallet.symbol}\nUSD Value: $${(wallet.balance * wallet.price).toFixed(2)}\n24h Change: ${wallet.change24h}%\n\nClick Deposit or Send buttons for actions.`);
  };

  // Open wallet action
  window.openWalletAction = function(walletId, action) {
    const wallet = wallets.find(w => w.id === walletId);
    if (!wallet) return;
    
    alert(`${action === 'deposit' ? '⬇️ Deposit' : '⬆️ Send'} ${wallet.name}\n\nThis would open the ${action} form for ${wallet.symbol}.\n\nDemo only.`);
  };

  // Filter transactions
  window.filterTransactions = function(filter) {
    document.querySelectorAll('.transaction-filters .filter-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    
    renderTransactions(filter);
  };

  // Show notification
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, ${type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)'}, rgba(6,182,212,0.95));
      color: white;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 8px 20px rgba(16,185,129,0.4);
      animation: slideInRight 0.3s ease-out;
      backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Initialize wallets on page load
  if (document.getElementById('walletsGrid')) {
    initWallets();
  }

  // ========== P2P TRADING FUNCTIONALITY ==========
  
  // P2P Offers Data
  const p2pOffers = [
    { id: 1, advertiser: 'CryptoKing', trades: 245, completion: 98, type: 'sell', crypto: 'USDT', fiat: 'NGN', price: 1685, min: 5000, max: 500000, payments: ['bank', 'mobile'] },
    { id: 2, advertiser: 'BitMaster', trades: 189, completion: 100, type: 'sell', crypto: 'USDT', fiat: 'NGN', price: 1670, min: 10000, max: 1000000, payments: ['bank'] },
    { id: 3, advertiser: 'TradeQueen', trades: 567, completion: 99, type: 'sell', crypto: 'USDT', fiat: 'GHS', price: 16.2, min: 100, max: 5000, payments: ['mobile', 'bank'] },
    { id: 4, advertiser: 'SafeTrade', trades: 342, completion: 97, type: 'sell', crypto: 'BTC', fiat: 'NGN', price: 158500000, min: 50000, max: 5000000, payments: ['bank'] },
    { id: 5, advertiser: 'QuickPay', trades: 423, completion: 99, type: 'buy', crypto: 'USDT', fiat: 'NGN', price: 1650, min: 5000, max: 300000, payments: ['bank', 'mobile', 'paypal'] },
    { id: 6, advertiser: 'GhanaTrader', trades: 156, completion: 96, type: 'sell', crypto: 'ETH', fiat: 'GHS', price: 46200, min: 500, max: 20000, payments: ['mobile'] },
    { id: 7, advertiser: 'FastCash', trades: 892, completion: 100, type: 'buy', crypto: 'USDT', fiat: 'USD', price: 1.02, min: 50, max: 10000, payments: ['paypal', 'bank'] },
    { id: 8, advertiser: 'ReliableTrade', trades: 234, completion: 98, type: 'sell', crypto: 'BNB', fiat: 'NGN', price: 712000, min: 10000, max: 1000000, payments: ['bank', 'mobile'] }
  ];

  // My Orders Data
  const myOrders = [
    { id: 'ORD001', type: 'buy', crypto: 'USDT', amount: 100, fiat: 'NGN', total: 168500, date: new Date(Date.now() - 3600000), status: 'active' },
    { id: 'ORD002', type: 'sell', crypto: 'BTC', amount: 0.01, fiat: 'NGN', total: 942500, date: new Date(Date.now() - 7200000), status: 'completed' },
    { id: 'ORD003', type: 'buy', crypto: 'ETH', amount: 0.5, fiat: 'GHS', total: 2310, date: new Date(Date.now() - 10800000), status: 'completed' },
    { id: 'ORD004', type: 'sell', crypto: 'USDT', amount: 500, fiat: 'USD', total: 510, date: new Date(Date.now() - 14400000), status: 'cancelled' }
  ];

  let currentP2PTab = 'buy';
  let currentP2PFilters = {
    currency: 'USDT',
    payment: 'all',
    fiat: 'NGN'
  };

  // Initialize P2P Trading
  function initP2P() {
    renderP2POffers();
  }

  // Switch P2P Tab
  window.switchP2PTab = function(tab) {
    currentP2PTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.p2p-tab').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tab) btn.classList.add('active');
    });
    
    // Show/hide sections
    document.getElementById('p2pOffersSection').style.display = 
      (tab === 'buy' || tab === 'sell') ? 'block' : 'none';
    document.getElementById('myOrdersSection').style.display = 
      tab === 'my-orders' ? 'block' : 'none';
    document.getElementById('createAdSection').style.display = 
      tab === 'create' ? 'block' : 'none';
    
    // Render appropriate content
    if (tab === 'buy' || tab === 'sell') {
      renderP2POffers();
    } else if (tab === 'my-orders') {
      renderMyOrders('active');
    }
  };

  // Filter P2P Offers
  window.filterP2POffers = function() {
    currentP2PFilters = {
      currency: document.getElementById('p2pCurrency').value,
      payment: document.getElementById('p2pPayment').value,
      fiat: document.getElementById('p2pFiat').value
    };
    renderP2POffers();
  };

  // Render P2P Offers
  function renderP2POffers() {
    const container = document.getElementById('p2pOffersList');
    if (!container) return;

    let filtered = p2pOffers.filter(offer => {
      // Filter by buy/sell type (opposite of current tab)
      const offerType = currentP2PTab === 'buy' ? 'sell' : 'buy';
      if (offer.type !== offerType) return false;
      
      // Filter by currency
      if (offer.crypto !== currentP2PFilters.currency) return false;
      
      // Filter by fiat
      if (offer.fiat !== currentP2PFilters.fiat) return false;
      
      // Filter by payment method
      if (currentP2PFilters.payment !== 'all') {
        if (!offer.payments.includes(currentP2PFilters.payment)) return false;
      }
      
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:60px 20px">No offers found. Try adjusting your filters.</p>';
      return;
    }

    const paymentIcons = {
      bank: '🏦',
      mobile: '📱',
      paypal: '💳',
      cash: '💵'
    };

    const html = filtered.map(offer => {
      const avatar = offer.advertiser.charAt(0).toUpperCase();
      
      return `
        <div class="offer-card">
          <div class="advertiser-info" onclick="showAdvertiserProfile('${offer.advertiser}', ${offer.trades}, ${offer.completion})" title="Click to view profile">
            <div class="advertiser-avatar">${avatar}</div>
            <div class="advertiser-details">
              <div class="advertiser-name">${offer.advertiser}</div>
              <div class="advertiser-stats">
                <span class="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  ${offer.trades} trades
                </span>
                <span class="stat-item" style="color:#10b981">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  ${offer.completion}%
                </span>
              </div>
            </div>
          </div>
          
          <div class="price-info" onclick="showPriceDetails(${offer.price}, '${offer.fiat}', '${offer.crypto}')" title="Click for price breakdown">
            <div class="price-amount">${offer.price.toLocaleString()} ${offer.fiat}</div>
            <div class="price-currency">per ${offer.crypto}</div>
          </div>
          
          <div class="limits-info" onclick="showLimitsInfo(${offer.min}, ${offer.max}, '${offer.fiat}', ${offer.price}, '${offer.crypto}')" title="Click for limit details" style="cursor:pointer">
            <div>
              <span class="limit-label">Available:</span>
              <span class="limit-value">${(offer.max / offer.price).toFixed(2)} ${offer.crypto}</span>
            </div>
            <div>
              <span class="limit-label">Limit:</span>
              <span class="limit-value">${offer.min.toLocaleString()} - ${offer.max.toLocaleString()} ${offer.fiat}</span>
            </div>
          </div>
          
          <div class="payment-methods">
            ${offer.payments.map(p => `
              <span class="payment-badge" onclick="event.stopPropagation(); showPaymentInfo('${p}')" title="Click for ${p} payment details">
                ${paymentIcons[p]} ${p.charAt(0).toUpperCase() + p.slice(1)}
              </span>
            `).join('')}
          </div>
          
          <button class="trade-btn ${currentP2PTab === 'buy' ? '' : 'sell-btn'}" onclick="openP2PTrade(${offer.id})">
            ${currentP2PTab === 'buy' ? 'Buy' : 'Sell'} ${offer.crypto}
          </button>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Open P2P Trade
  window.openP2PTrade = function(offerId) {
    const offer = p2pOffers.find(o => o.id === offerId);
    if (!offer) return;

    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `${currentP2PTab === 'buy' ? 'Buy' : 'Sell'} ${offer.crypto} from ${offer.advertiser}`;
    
    const content = `
      <form class="modal-form" onsubmit="return executeP2PTrade(event, ${offerId})">
        <div style="background:rgba(255,183,3,0.1);padding:16px;border-radius:10px;margin-bottom:20px;border:1px solid rgba(255,183,3,0.3)">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Price:</span>
            <strong>${offer.price.toLocaleString()} ${offer.fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Available:</span>
            <strong>${(offer.max / offer.price).toFixed(2)} ${offer.crypto}</strong>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="color:var(--muted)">Limit:</span>
            <strong>${offer.min.toLocaleString()} - ${offer.max.toLocaleString()} ${offer.fiat}</strong>
          </div>
        </div>

        <div class="form-group">
          <label>I want to spend (${offer.fiat})</label>
          <input type="number" name="amount" id="p2pAmount" required step="0.01" min="${offer.min}" max="${offer.max}" placeholder="${offer.min}" oninput="calculateP2P(${offer.price}, '${offer.crypto}')">
        </div>

        <div class="form-group">
          <label>I will receive (${offer.crypto})</label>
          <input type="number" id="p2pReceive" readonly placeholder="0.00">
        </div>

        <div class="form-group">
          <label>Payment Method</label>
          <select name="payment" required>
            ${offer.payments.map(p => `<option value="${p}">${paymentIcons[p]} ${p.charAt(0).toUpperCase() + p.slice(1)}</option>`).join('')}
          </select>
        </div>

        <div style="background:rgba(239,68,68,0.1);padding:12px;border-radius:8px;margin:16px 0;border:1px solid rgba(239,68,68,0.3)">
          <strong style="color:#ef4444">⚠️ Important:</strong>
          <p style="margin:8px 0 0;font-size:0.9rem;color:var(--muted)">Funds will be held in escrow until both parties confirm the transaction. Do not release crypto until payment is received.</p>
        </div>

        <button type="submit" class="form-submit">${currentP2PTab === 'buy' ? 'Buy' : 'Sell'} ${offer.crypto}</button>
      </form>
    `;
    
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
  };

  // Calculate P2P trade
  window.calculateP2P = function(price, crypto) {
    const amount = parseFloat(document.getElementById('p2pAmount')?.value) || 0;
    const receive = amount / price;
    document.getElementById('p2pReceive').value = receive.toFixed(8);
  };

  // Execute P2P Trade
  window.executeP2PTrade = function(event, offerId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const offer = p2pOffers.find(o => o.id === offerId);
    
    alert(`✅ P2P Order Created!\n\nType: ${currentP2PTab.toUpperCase()}\nCrypto: ${offer.crypto}\nAmount: ${data.amount} ${offer.fiat}\nReceive: ${document.getElementById('p2pReceive').value} ${offer.crypto}\nPayment: ${data.payment}\n\nYour order is now in escrow. Follow the payment instructions to complete the trade.\n\nThis is a demo - no real trade was created.`);
    
    document.getElementById('featureModal').style.display = 'none';
    return false;
  };

  // Render My Orders
  function renderMyOrders(filter) {
    const container = document.getElementById('myOrdersList');
    if (!container) return;

    const filtered = filter === 'all' 
      ? myOrders 
      : myOrders.filter(o => o.status === filter);

    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px">No orders found</p>';
      return;
    }

    const html = filtered.map(order => {
      return `
        <div class="order-item">
          <div class="order-type-badge ${order.type}">${order.type.toUpperCase()}</div>
          <div class="order-details">
            <div class="order-crypto">${order.amount} ${order.crypto}</div>
            <div class="order-info">
              ${order.total.toLocaleString()} ${order.fiat} • ${formatDate(order.date)}
            </div>
          </div>
          <div class="order-amount">${order.total.toLocaleString()} ${order.fiat}</div>
          <div class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Filter My Orders
  window.filterMyOrders = function(status) {
    document.querySelectorAll('.order-filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderMyOrders(status);
  };

  // Create P2P Ad
  window.createP2PAd = function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Get selected payment methods
    const payments = Array.from(event.target.querySelectorAll('input[name="payment"]:checked'))
      .map(cb => cb.value);
    
    if (payments.length === 0) {
      alert('Please select at least one payment method');
      return false;
    }
    
    alert(`✅ P2P Advertisement Created!\n\nType: ${data.type.toUpperCase()}\nCrypto: ${data.crypto}\nFiat: ${data.fiat}\nPrice: ${data.price}\nLimits: ${data.min} - ${data.max}\nPayments: ${payments.join(', ')}\nTime Limit: ${data.timeLimit} min\n\nYour ad is now live and visible to all users!\n\nThis is a demo - no real ad was created.`);
    
    event.target.reset();
    return false;
  };

  // Show Advertiser Profile (Interactive)
  window.showAdvertiserProfile = function(name, trades, completion) {
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `👤 ${name}'s Profile`;
    
    const trustScore = Math.round((completion / 100) * 5 * 10) / 10;
    const avgTime = Math.floor(Math.random() * 30) + 10; // 10-40 min
    const registered = Math.floor(Math.random() * 365) + 30; // 30-395 days
    
    modalBody.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="width:80px;height:80px;margin:0 auto 16px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#071423">
          ${name.charAt(0)}
        </div>
        <h3 style="margin:0 0 8px">${name}</h3>
        <p style="color:var(--muted);margin:0">Verified Trader</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:24px">
        <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;text-align:center">
          <div style="font-size:1.8rem;font-weight:700;color:var(--accent)">${trades}</div>
          <div style="color:var(--muted);font-size:0.9rem;margin-top:4px">Total Trades</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;text-align:center">
          <div style="font-size:1.8rem;font-weight:700;color:#10b981">${completion}%</div>
          <div style="color:var(--muted);font-size:0.9rem;margin-top:4px">Completion</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;text-align:center">
          <div style="font-size:1.8rem;font-weight:700;color:var(--accent-2)">${trustScore}/5</div>
          <div style="color:var(--muted);font-size:0.9rem;margin-top:4px">Trust Score</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;text-align:center">
          <div style="font-size:1.8rem;font-weight:700;color:#fff">${avgTime}min</div>
          <div style="color:var(--muted);font-size:0.9rem;margin-top:4px">Avg. Response</div>
        </div>
      </div>

      <div style="margin-top:24px;padding:16px;background:rgba(16,185,129,0.1);border-radius:12px;border:1px solid rgba(16,185,129,0.3)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <strong style="color:#10b981">Verified Trader</strong>
        </div>
        <p style="margin:0;color:var(--muted);font-size:0.9rem">
          Member for ${registered} days • Last active: 2 hours ago
        </p>
      </div>

      <button onclick="document.getElementById('featureModal').style.display='none'" class="form-submit" style="margin-top:20px">Close</button>
    `;
    
    modal.style.display = 'flex';
  };

  // Show Price Details (Interactive)
  window.showPriceDetails = function(price, fiat, crypto) {
    const marketPrice = price * 0.99; // Mock market price
    const premium = ((price - marketPrice) / marketPrice * 100).toFixed(2);
    
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `💰 Price Details`;
    
    modalBody.innerHTML = `
      <div style="padding:20px">
        <div style="text-align:center;margin-bottom:24px">
          <div style="font-size:2.5rem;font-weight:700;background:linear-gradient(135deg,var(--accent),var(--accent-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
            ${price.toLocaleString()} ${fiat}
          </div>
          <div style="color:var(--muted);margin-top:8px">per ${crypto}</div>
        </div>

        <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px">
            <span style="color:var(--muted)">Market Price:</span>
            <strong>${marketPrice.toLocaleString()} ${fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px">
            <span style="color:var(--muted)">This Offer:</span>
            <strong>${price.toLocaleString()} ${fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1)">
            <span style="color:var(--muted)">Premium:</span>
            <strong style="color:${premium > 0 ? '#ef4444' : '#10b981'}">${premium > 0 ? '+' : ''}${premium}%</strong>
          </div>
        </div>

        <div style="background:rgba(255,183,3,0.1);padding:14px;border-radius:10px;border:1px solid rgba(255,183,3,0.3)">
          <div style="font-weight:600;margin-bottom:8px;color:var(--accent)">💡 Price Calculation Examples:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.9rem">
            <span style="color:var(--muted)">Buy 100 ${crypto}:</span>
            <strong>${(price * 100).toLocaleString()} ${fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.9rem">
            <span style="color:var(--muted)">Buy 500 ${crypto}:</span>
            <strong>${(price * 500).toLocaleString()} ${fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.9rem">
            <span style="color:var(--muted)">Buy 1000 ${crypto}:</span>
            <strong>${(price * 1000).toLocaleString()} ${fiat}</strong>
          </div>
        </div>

        <button onclick="document.getElementById('featureModal').style.display='none'" class="form-submit" style="margin-top:20px">Close</button>
      </div>
    `;
    
    modal.style.display = 'flex';
  };

  // Show Limits Info (Interactive)
  window.showLimitsInfo = function(min, max, fiat, price, crypto) {
    const minCrypto = (min / price).toFixed(6);
    const maxCrypto = (max / price).toFixed(6);
    
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `📊 Trading Limits`;
    
    modalBody.innerHTML = `
      <div style="padding:20px">
        <div style="background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;margin-bottom:20px">
          <h4 style="margin:0 0 16px;color:var(--accent)">Minimum Order</h4>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Fiat Amount:</span>
            <strong style="font-size:1.2rem">${min.toLocaleString()} ${fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="color:var(--muted)">Crypto Amount:</span>
            <strong style="font-size:1.2rem">${minCrypto} ${crypto}</strong>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.05);padding:20px;border-radius:12px;margin-bottom:20px">
          <h4 style="margin:0 0 16px;color:var(--accent-2)">Maximum Order</h4>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:var(--muted)">Fiat Amount:</span>
            <strong style="font-size:1.2rem">${max.toLocaleString()} ${fiat}</strong>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="color:var(--muted)">Crypto Amount:</span>
            <strong style="font-size:1.2rem">${maxCrypto} ${crypto}</strong>
          </div>
        </div>

        <div style="background:rgba(16,185,129,0.1);padding:14px;border-radius:10px;border:1px solid rgba(16,185,129,0.3)">
          <div style="display:flex;align-items:start;gap:8px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink:0;margin-top:2px">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <div style="font-weight:600;color:#10b981;margin-bottom:4px">Trading Limits Info</div>
              <p style="margin:0;color:var(--muted);font-size:0.9rem">
                You can trade any amount between ${min.toLocaleString()} ${fiat} and ${max.toLocaleString()} ${fiat} with this advertiser. Orders outside this range will be rejected.
              </p>
            </div>
          </div>
        </div>

        <button onclick="document.getElementById('featureModal').style.display='none'" class="form-submit" style="margin-top:20px">Close</button>
      </div>
    `;
    
    modal.style.display = 'flex';
  };

  // Show Payment Info (Interactive)
  window.showPaymentInfo = function(method) {
    const paymentDetails = {
      bank: {
        name: 'Bank Transfer',
        icon: '🏦',
        time: '5-30 minutes',
        fee: '0%',
        description: 'Direct bank-to-bank transfer. Instant for same-bank transfers, up to 30 minutes for inter-bank.',
        requirements: ['Valid bank account', 'Account name must match KYC', 'Save payment proof'],
        tips: ['Use bank app for faster transfer', 'Keep transaction reference', 'Send exact amount']
      },
      mobile: {
        name: 'Mobile Money',
        icon: '📱',
        time: '1-5 minutes',
        fee: '0%',
        description: 'Pay using MTN, Vodafone, or AirtelTigo mobile money. Instant confirmation.',
        requirements: ['Active mobile money account', 'Sufficient balance', 'Phone number verification'],
        tips: ['Dial *170# for MTN', 'Keep transaction ID', 'Verify recipient number']
      },
      paypal: {
        name: 'PayPal',
        icon: '💳',
        time: 'Instant',
        fee: '0%',
        description: 'Send via PayPal Friends & Family. Instant transfer with email confirmation.',
        requirements: ['Verified PayPal account', 'Email must match KYC', 'Send as Friends & Family'],
        tips: ['Use correct email', 'Do not add notes', 'Screenshot confirmation']
      },
      cash: {
        name: 'Cash Deposit',
        icon: '💵',
        time: '10-60 minutes',
        fee: '0%',
        description: 'Deposit cash at bank branch or ATM. Upload deposit slip for verification.',
        requirements: ['Deposit slip/receipt', 'Clear photo upload', 'Match exact amount'],
        tips: ['Keep original receipt', 'Photo must be clear', 'Deposit to correct account']
      }
    };
    
    const info = paymentDetails[method];
    if (!info) return;
    
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `${info.icon} ${info.name}`;
    
    modalBody.innerHTML = `
      <div style="padding:20px">
        <div style="text-align:center;margin-bottom:24px">
          <div style="font-size:4rem;margin-bottom:12px">${info.icon}</div>
          <h3 style="margin:0 0 8px">${info.name}</h3>
          <p style="color:var(--muted);margin:0">${info.description}</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:24px">
          <div style="background:rgba(255,255,255,0.05);padding:14px;border-radius:10px;text-align:center">
            <div style="color:var(--muted);font-size:0.85rem;margin-bottom:4px">Processing Time</div>
            <div style="font-weight:700;color:var(--accent)">${info.time}</div>
          </div>
          <div style="background:rgba(255,255,255,0.05);padding:14px;border-radius:10px;text-align:center">
            <div style="color:var(--muted);font-size:0.85rem;margin-bottom:4px">Platform Fee</div>
            <div style="font-weight:700;color:#10b981">${info.fee}</div>
          </div>
        </div>

        <div style="margin-bottom:20px">
          <h4 style="margin:0 0 12px;color:var(--accent)">✓ Requirements</h4>
          ${info.requirements.map(req => `
            <div style="display:flex;align-items:center;gap:8px;padding:8px;background:rgba(255,255,255,0.03);border-radius:8px;margin-bottom:6px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span style="font-size:0.9rem">${req}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="margin:0 0 12px;color:var(--accent-2)">💡 Tips</h4>
          ${info.tips.map(tip => `
            <div style="display:flex;align-items:start;gap:8px;padding:8px;background:rgba(255,183,3,0.05);border-radius:8px;margin-bottom:6px">
              <span style="color:var(--accent);font-size:1.2rem;line-height:1">•</span>
              <span style="font-size:0.9rem">${tip}</span>
            </div>
          `).join('')}
        </div>

        <button onclick="document.getElementById('featureModal').style.display='none'" class="form-submit">Got it!</button>
      </div>
    `;
    
    modal.style.display = 'flex';
  };

  // Initialize P2P on page load
  if (document.getElementById('p2pOffersList')) {
    initP2P();
  }

})();
