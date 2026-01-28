// P2P Page Interactivity

// Sample data for different tabs
const buyOffers = [
  {
    trader: 'AdejokeTrader',
    initials: 'AJ',
    trades: 245,
    completion: 98.5,
    price: '₦1,480.50',
    available: '450 USDT',
    limit: '₦50K - ₦500K',
    payments: ['Bank Transfer', 'Mobile Money'],
    crypto: 'USDT',
    fiat: 'NGN'
  },
  {
    trader: 'KofiMerchant',
    initials: 'KM',
    trades: 892,
    completion: 99.2,
    price: 'GH₵15.80',
    available: '1,200 USDT',
    limit: 'GH₵500 - GH₵15K',
    payments: ['Vodafone Cash', 'MTN MoMo', 'Bank Transfer'],
    crypto: 'USDT',
    fiat: 'GHS'
  },
  {
    trader: 'CryptoMaster_NG',
    initials: 'CM',
    trades: 1523,
    completion: 99.8,
    price: '₦1,475.00',
    available: '2,500 USDT',
    limit: '₦100K - ₦2M',
    payments: ['GTBank', 'First Bank', 'Opay'],
    crypto: 'USDT',
    fiat: 'NGN'
  }
];

const sellOffers = [
  {
    trader: 'ChikaExchange',
    initials: 'CE',
    trades: 567,
    completion: 97.8,
    price: '₦1,470.00',
    available: '800 USDT',
    limit: '₦75K - ₦1M',
    payments: ['Bank Transfer', 'Opay'],
    crypto: 'USDT',
    fiat: 'NGN'
  },
  {
    trader: 'AccraCrypto',
    initials: 'AC',
    trades: 423,
    completion: 98.9,
    price: 'GH₵15.70',
    available: '1,500 USDT',
    limit: 'GH₵1K - GH₵20K',
    payments: ['MTN MoMo', 'AirtelTigo Money'],
    crypto: 'USDT',
    fiat: 'GHS'
  }
];

// Current state
let currentTab = 'buy';
let filters = {
  crypto: 'USDT',
  payment: 'all',
  fiat: 'all'
};

// Tab switching function
function switchP2PTab(tab) {
  currentTab = tab;
  
  // Update tab buttons
  const tabs = document.querySelectorAll('.p2p-tab');
  tabs.forEach((btn, index) => {
    if (index === 0 && tab === 'buy') {
      btn.style.background = 'rgba(255, 183, 3, 0.1)';
      btn.style.borderColor = 'rgba(255, 183, 3, 0.3)';
      btn.style.color = '#FFB703';
    } else if (index === 1 && tab === 'sell') {
      btn.style.background = 'rgba(255, 183, 3, 0.1)';
      btn.style.borderColor = 'rgba(255, 183, 3, 0.3)';
      btn.style.color = '#FFB703';
    } else if (index === 2 && tab === 'orders') {
      btn.style.background = 'rgba(255, 183, 3, 0.1)';
      btn.style.borderColor = 'rgba(255, 183, 3, 0.3)';
      btn.style.color = '#FFB703';
    } else if (index < 3) {
      btn.style.background = 'rgba(255, 255, 255, 0.05)';
      btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      btn.style.color = '#F1F5F9';
    }
  });
  
  // Update offers display based on tab
  const container = document.getElementById('offersContainer');
  if (!container) return;
  
  if (tab === 'buy' || tab === 'sell') {
    renderOffers();
  } else if (tab === 'orders') {
    showMyOrders();
  } else if (tab === 'create') {
    showCreateAd();
  }
}

// Filter offers function
function filterOffers() {
  const cryptoSelect = document.getElementById('cryptoFilter');
  const paymentSelect = document.getElementById('paymentFilter');
  const fiatSelect = document.getElementById('fiatFilter');
  
  if (cryptoSelect) filters.crypto = cryptoSelect.value;
  if (paymentSelect) filters.payment = paymentSelect.value;
  if (fiatSelect) filters.fiat = fiatSelect.value;
  
  renderOffers();
}

// Render offers based on current tab and filters
function renderOffers() {
  const container = document.getElementById('offersContainer');
  if (!container) return;
  
  const offers = currentTab === 'buy' ? buyOffers : sellOffers;
  
  // Apply filters
  let filteredOffers = offers.filter(offer => {
    if (filters.crypto !== 'all' && offer.crypto !== filters.crypto) return false;
    if (filters.fiat !== 'all' && offer.fiat !== filters.fiat) return false;
    if (filters.payment !== 'all') {
      const hasPayment = offer.payments.some(p => 
        p.toLowerCase().includes(filters.payment.toLowerCase()) ||
        filters.payment === 'mobile' && (p.includes('MoMo') || p.includes('Cash') || p.includes('Money'))
      );
      if (!hasPayment) return false;
    }
    return true;
  });
  
  if (filteredOffers.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #94A3B8;">
        <svg style="width: 64px; height: 64px; margin: 0 auto 16px; opacity: 0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 style="margin-bottom: 8px; color: #F1F5F9;">No Offers Found</h3>
        <p>Try adjusting your filters or check back later</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredOffers.map(offer => `
    <div style="background: rgba(30, 41, 59, 0.6); padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 1px solid rgba(255, 255, 255, 0.1);">
      <div style="display: grid; grid-template-columns: auto 1fr auto auto auto; gap: 24px; align-items: center;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FFB703, #F59E0B); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #0F172A;">${offer.initials}</div>
            <div>
              <div style="font-weight: 600; color: #F1F5F9;">${offer.trader}</div>
              <div style="font-size: 0.85rem; color: #10b981;">✓ ${offer.trades} trades | ${offer.completion}% completion</div>
            </div>
          </div>
        </div>
        
        <div>
          <div style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 4px;">Price</div>
          <div style="font-size: 1.2rem; font-weight: 700; color: #F1F5F9;">${offer.price}</div>
        </div>
        
        <div>
          <div style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 4px;">Available</div>
          <div style="font-weight: 600; color: #F1F5F9;">${offer.available}</div>
          <div style="font-size: 0.85rem; color: #94A3B8;">Limit: ${offer.limit}</div>
        </div>
        
        <div>
          <div style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 8px;">Payment</div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${offer.payments.map(payment => `
              <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">${payment}</span>
            `).join('')}
          </div>
        </div>
        
        <div>
          <button onclick="startTrade('${offer.trader}', '${currentTab}')" style="padding: 12px 32px; background: linear-gradient(135deg, #FFB703, #F59E0B); border: none; border-radius: 8px; color: #0F172A; font-weight: 700; cursor: pointer; white-space: nowrap;">
            ${currentTab === 'buy' ? 'Buy' : 'Sell'} ${offer.crypto}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Start trade function
function startTrade(trader, type) {
  alert(`Opening ${type} trade with ${trader}...\nFull P2P trading functionality coming soon!\n\nFeatures:\n✓ Secure escrow system\n✓ Real-time chat with trader\n✓ Dispute resolution\n✓ Payment confirmation`);
}

// Show My Orders
function showMyOrders() {
  const container = document.getElementById('offersContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background: rgba(30, 41, 59, 0.6); padding: 40px; border-radius: 12px; text-align: center;">
      <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: rgba(255, 183, 3, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <svg style="width: 40px; height: 40px; color: #FFB703;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 style="margin-bottom: 12px; color: #F1F5F9;">No Active Orders</h3>
      <p style="color: #94A3B8; margin-bottom: 24px;">You don't have any ongoing P2P trades at the moment</p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button onclick="switchP2PTab('buy')" style="padding: 12px 24px; background: linear-gradient(135deg, #FFB703, #F59E0B); border: none; border-radius: 8px; color: #0F172A; font-weight: 700; cursor: pointer;">
          Browse Buy Offers
        </button>
        <button onclick="switchP2PTab('sell')" style="padding: 12px 24px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #F1F5F9; font-weight: 600; cursor: pointer;">
          Browse Sell Offers
        </button>
      </div>
      
      <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <h4 style="color: #FFB703; margin-bottom: 16px;">Recent Activity</h4>
        <div style="text-align: left; max-width: 600px; margin: 0 auto;">
          <div style="background: rgba(255, 255, 255, 0.03); padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #10b981;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: 600;">Bought 500 USDT</span>
              <span style="color: #10b981;">✓ Completed</span>
            </div>
            <div style="font-size: 0.85rem; color: #94A3B8;">From: AdejokeTrader • ₦740,250 • 2 days ago</div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.03); padding: 16px; border-radius: 8px; border-left: 3px solid #10b981;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: 600;">Sold 300 USDT</span>
              <span style="color: #10b981;">✓ Completed</span>
            </div>
            <div style="font-size: 0.85rem; color: #94A3B8;">To: CryptoMaster_NG • ₦442,500 • 5 days ago</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Show Create Ad form
function showCreateAd() {
  const container = document.getElementById('offersContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div style="background: rgba(30, 41, 59, 0.6); padding: 32px; border-radius: 12px; max-width: 800px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h3 style="color: #FFB703; margin-bottom: 8px;">Create P2P Advertisement</h3>
        <p style="color: #94A3B8; font-size: 0.9rem;">Set your own price and payment methods</p>
      </div>
      
      <form onsubmit="handleCreateAd(event)" style="display: grid; gap: 20px;">
        <!-- Trade Type -->
        <div>
          <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">I want to</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button type="button" onclick="selectTradeType(this, 'buy')" class="trade-type-btn active" data-type="buy" style="padding: 16px; background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 8px; color: #10b981; font-weight: 700; cursor: pointer;">
              Buy Crypto (Sell Fiat)
            </button>
            <button type="button" onclick="selectTradeType(this, 'sell')" class="trade-type-btn" data-type="sell" style="padding: 16px; background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9; font-weight: 700; cursor: pointer;">
              Sell Crypto (Buy Fiat)
            </button>
          </div>
        </div>
        
        <!-- Asset & Fiat -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Cryptocurrency</label>
            <select required style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
              <option value="USDT">USDT (Tether)</option>
              <option value="BTC">BTC (Bitcoin)</option>
              <option value="ETH">ETH (Ethereum)</option>
              <option value="BNB">BNB (Binance Coin)</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Fiat Currency</label>
            <select required style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
              <option value="NGN">🇳🇬 NGN - Nigerian Naira</option>
              <option value="GHS">🇬🇭 GHS - Ghanaian Cedis</option>
              <option value="KES">🇰🇪 KES - Kenyan Shilling</option>
              <option value="ZAR">🇿🇦 ZAR - South African Rand</option>
              <option value="USD">🇺🇸 USD - US Dollar</option>
            </select>
          </div>
        </div>
        
        <!-- Price & Amount -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Your Price</label>
            <input type="number" step="0.01" required placeholder="e.g., 1480.50" style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
            <div style="font-size: 0.85rem; color: #94A3B8; margin-top: 4px;">Market price: ₦1,475.00</div>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Total Amount</label>
            <input type="number" step="0.01" required placeholder="e.g., 1000" style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
          </div>
        </div>
        
        <!-- Order Limits -->
        <div>
          <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Order Limits</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <input type="number" required placeholder="Minimum (e.g., 50000)" style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
            <input type="number" required placeholder="Maximum (e.g., 500000)" style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
          </div>
        </div>
        
        <!-- Payment Methods -->
        <div>
          <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Payment Methods (Select all that apply)</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; cursor: pointer;">
              <input type="checkbox" value="bank" style="width: 18px; height: 18px;">
              <span>Bank Transfer</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; cursor: pointer;">
              <input type="checkbox" value="mtn" style="width: 18px; height: 18px;">
              <span>MTN Mobile Money</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; cursor: pointer;">
              <input type="checkbox" value="vodafone" style="width: 18px; height: 18px;">
              <span>Vodafone Cash</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; cursor: pointer;">
              <input type="checkbox" value="airtel" style="width: 18px; height: 18px;">
              <span>Airtel Money</span>
            </label>
          </div>
        </div>
        
        <!-- Payment Time -->
        <div>
          <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Payment Time Limit</label>
          <select required style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9;">
            <option value="15">15 minutes</option>
            <option value="30" selected>30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
        
        <!-- Terms -->
        <div>
          <label style="display: block; margin-bottom: 8px; color: #F1F5F9; font-weight: 600;">Terms & Conditions (Optional)</label>
          <textarea placeholder="Add any specific requirements or instructions..." rows="3" style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #F1F5F9; resize: vertical;"></textarea>
        </div>
        
        <!-- Submit -->
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <button type="submit" style="flex: 1; padding: 16px; background: linear-gradient(135deg, #FFB703, #F59E0B); border: none; border-radius: 8px; color: #0F172A; font-weight: 700; font-size: 1rem; cursor: pointer;">
            Create Advertisement
          </button>
          <button type="button" onclick="switchP2PTab('buy')" style="padding: 16px 24px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; color: #F1F5F9; font-weight: 600; cursor: pointer;">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `;
}

// Handle trade type selection
function selectTradeType(btn, type) {
  const buttons = document.querySelectorAll('.trade-type-btn');
  buttons.forEach(b => {
    if (b.getAttribute('data-type') === type) {
      b.style.background = type === 'buy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
      b.style.borderColor = type === 'buy' ? '#10b981' : '#ef4444';
      b.style.color = type === 'buy' ? '#10b981' : '#ef4444';
      b.classList.add('active');
    } else {
      b.style.background = 'rgba(255, 255, 255, 0.05)';
      b.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      b.style.color = '#F1F5F9';
      b.classList.remove('active');
    }
  });
}

// Handle create ad form submission
function handleCreateAd(event) {
  event.preventDefault();
  alert('Advertisement created successfully!\n\nYour ad is now live in the P2P marketplace.\n\nFull ad management features coming soon:\n✓ Edit/pause/delete ads\n✓ Respond to trade requests\n✓ Real-time notifications\n✓ Trading history & analytics');
  switchP2PTab('buy');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial tab
  switchP2PTab('buy');
  
  // Add event listeners to filters if they exist
  const cryptoFilter = document.getElementById('cryptoFilter');
  const paymentFilter = document.getElementById('paymentFilter');
  const fiatFilter = document.getElementById('fiatFilter');
  
  if (cryptoFilter) cryptoFilter.addEventListener('change', filterOffers);
  if (paymentFilter) paymentFilter.addEventListener('change', filterOffers);
  if (fiatFilter) fiatFilter.addEventListener('change', filterOffers);
  
  // Initial render
  renderOffers();
});
