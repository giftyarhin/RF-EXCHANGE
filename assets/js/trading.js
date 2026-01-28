// TradingView Chart with Real-time Binance Data Integration
// ============================================================

let tradingViewWidget = null;
let currentSymbol = 'BTCUSDT';
let binanceWs = null;
let priceUpdateInterval = null;
let isReconnecting = false;

// Initialize trading page
function initTrading() {
    initTradingViewChart();
    initBinanceWebSocket();
    initPairSelector();
    fetch24hStats();
}

// Initialize TradingView Advanced Chart
function initTradingViewChart() {
    if (typeof TradingView === 'undefined') {
        console.error('TradingView library not loaded');
        return;
    }

    tradingViewWidget = new TradingView.widget({
        autosize: true,
        symbol: 'BINANCE:' + currentSymbol,
        interval: '15',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#1E293B',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: 'tradingview_chart',
        
        // Studies/Indicators
        studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies'
        ],
        
        // Custom styling to match RFEX theme
        overrides: {
            'mainSeriesProperties.candleStyle.upColor': '#10b981',
            'mainSeriesProperties.candleStyle.downColor': '#ef4444',
            'mainSeriesProperties.candleStyle.borderUpColor': '#10b981',
            'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
            'mainSeriesProperties.candleStyle.wickUpColor': '#10b981',
            'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
            'paneProperties.background': '#1E293B',
            'paneProperties.backgroundType': 'solid',
            'scalesProperties.textColor': '#94A3B8',
            'scalesProperties.lineColor': '#334155',
        },
        
        loading_screen: {
            backgroundColor: '#1E293B',
            foregroundColor: '#FFB703'
        }
    });
}

// Update chart when pair changes
function updateTradingViewChart(symbol) {
    if (tradingViewWidget && tradingViewWidget.chart) {
        tradingViewWidget.chart().setSymbol('BINANCE:' + symbol);
    }
}

// Initialize Binance WebSocket for real-time price updates
function initBinanceWebSocket() {
    closeBinanceWebSocket();
    
    const wsUrl = `wss://stream.binance.com:9443/ws/${currentSymbol.toLowerCase()}@ticker`;
    
    binanceWs = new WebSocket(wsUrl);
    
    binanceWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updatePriceDisplay(data);
    };
    
    binanceWs.onerror = (error) => {
        console.error('Binance WebSocket error:', error);
    };
    
    binanceWs.onclose = () => {
        console.log('Binance WebSocket closed');
        // Attempt to reconnect after 5 seconds (prevent duplicates)
        if (!isReconnecting) {
            isReconnecting = true;
            setTimeout(() => {
                if (currentSymbol) {
                    initBinanceWebSocket();
                }
                isReconnecting = false;
            }, 5000);
        }
    };
}

// Close WebSocket connection
function closeBinanceWebSocket() {
    if (binanceWs && binanceWs.readyState === WebSocket.OPEN) {
        binanceWs.close();
    }
}

// Update price display with real-time data
function updatePriceDisplay(data) {
    const currentPrice = parseFloat(data.c);
    const priceChange = parseFloat(data.p);
    const priceChangePercent = parseFloat(data.P);
    const high24h = parseFloat(data.h);
    const low24h = parseFloat(data.l);
    const volume = parseFloat(data.v);
    const quoteVolume = parseFloat(data.q);
    
    // Update main price display
    const priceElement = document.getElementById('currentPrice');
    const changeElement = document.getElementById('priceChange');
    
    if (priceElement) {
        priceElement.textContent = `$${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        priceElement.style.color = priceChangePercent >= 0 ? '#10b981' : '#ef4444';
    }
    
    if (changeElement) {
        const sign = priceChangePercent >= 0 ? '+' : '';
        changeElement.textContent = `${sign}${priceChangePercent.toFixed(2)}% (${sign}$${priceChange.toFixed(2)})`;
        changeElement.style.color = priceChangePercent >= 0 ? '#10b981' : '#ef4444';
    }
    
    // Update 24h stats
    updateStatElement('high24h', `$${high24h.toLocaleString()}`);
    updateStatElement('low24h', `$${low24h.toLocaleString()}`);
    updateStatElement('volume24h', volume.toFixed(2));
    updateStatElement('quoteVolume24h', `$${(quoteVolume / 1000000).toFixed(1)}M`);
}

// Helper function to update stat elements
function updateStatElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Fetch 24h statistics from Binance REST API
async function fetch24hStats() {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${currentSymbol}`);
        const data = await response.json();
        
        updatePriceDisplay({
            c: data.lastPrice,
            p: data.priceChange,
            P: data.priceChangePercent,
            h: data.highPrice,
            l: data.lowPrice,
            v: data.volume,
            q: data.quoteVolume
        });
    } catch (error) {
        console.error('Error fetching 24h stats:', error);
    }
}

// Initialize pair selector functionality
function initPairSelector() {
    const pairButtons = document.querySelectorAll('.pair-btn');
    pairButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pair = btn.getAttribute('data-pair');
            if (pair) {
                selectPair(pair, btn);
            }
        });
    });
}

// Select a trading pair
function selectPair(pair, targetBtn) {
    // Remove slashes and convert to Binance format (e.g., BTC/USDT -> BTCUSDT)
    const symbol = pair.replace('/', '');
    currentSymbol = symbol;
    
    // Update UI
    const pairEl = document.getElementById('currentPair');
    const descEl = document.getElementById('pairDescription');
    if (pairEl) pairEl.textContent = pair;
    if (descEl) {
        const [base, quote] = pair.split('/');
        descEl.textContent = getPairName(base) + ' / ' + getPairName(quote);
    }
    
    // Update active state
    document.querySelectorAll('.pair-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Update TradingView chart
    updateTradingViewChart(symbol);
    
    // Reconnect WebSocket with new symbol
    initBinanceWebSocket();
    
    // Fetch new stats
    fetch24hStats();
}

// Get full name for cryptocurrency
function getPairName(symbol) {
    const names = {
        'BTC': 'Bitcoin',
        'ETH': 'Ethereum',
        'BNB': 'Binance Coin',
        'SOL': 'Solana',
        'XRP': 'Ripple',
        'ADA': 'Cardano',
        'AVAX': 'Avalanche',
        'DOT': 'Polkadot',
        'MATIC': 'Polygon',
        'USDT': 'Tether',
        'USDC': 'USD Coin',
        'BUSD': 'Binance USD'
    };
    return names[symbol] || symbol;
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrading);
} else {
    initTrading();
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    closeBinanceWebSocket();
});
