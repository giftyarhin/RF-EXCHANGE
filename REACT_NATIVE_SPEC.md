# RFEX Mobile App - React Native Specification

## 📱 Project Overview

**App Name:** RFEX - Crypto Exchange for Africa  
**Platform:** React Native (iOS & Android)  
**Type:** Cryptocurrency Trading & Exchange Platform  
**Target Markets:** Africa (Ghana, Nigeria, Kenya, etc.) + Global  

---

## 🎯 Core Features

### 1. **Authentication & User Management**
- **Registration & Login**
  - Email/Phone registration
  - OTP verification
  - Biometric authentication (Face ID, Touch ID, Fingerprint)
  - Two-Factor Authentication (2FA) via Google Authenticator/SMS
  - Social login (Google, Apple) [Optional]

- **Profile Management**
  - Edit profile (name, email, phone, profile picture)
  - Security settings (change password, 2FA toggle)
  - Notification preferences
  - Language & currency selection (GHS, USD, EUR, NGN, etc.)

### 2. **KYC Verification**
- **Document Upload**
  - Passport
  - Ghana Card / National ID
  - Driver's License
  - Selfie verification with liveness detection
  
- **Verification Flow**
  - Step-by-step KYC wizard
  - Document capture with camera
  - Upload from gallery
  - Real-time validation feedback
  - Admin approval status tracking
  - Restricted features before verification

### 3. **Wallet System**
- **Multi-Currency Wallets**
  - Crypto wallets: BTC, ETH, USDT, BNB, SOL, LTC, XRP, DOGE
  - Fiat wallets: GHS, USD, EUR, NGN
  
- **Wallet Features**
  - Real-time balance updates
  - Portfolio overview with total value (USD equivalent)
  - Transaction history (deposits, withdrawals, trades)
  - QR code generation for deposits
  - Address book for frequent recipients
  - Multiple wallet addresses per crypto

- **Deposit Methods**
  - **Crypto Deposits:** QR code scan, address copy, network selection
  - **Bank Transfers:** Bank details display, receipt upload
  - **Mobile Money:** MTN, Vodafone, AirtelTigo integration
  - Payment confirmations with push notifications

- **Withdrawal Methods**
  - Crypto withdrawals with network fee display
  - Bank withdrawals (local banks)
  - Mobile Money withdrawals
  - Withdrawal limits & verification
  - 2FA confirmation required

### 4. **Trading**

#### **Spot Trading**
- **Trading Pairs:** BTC/USDT, ETH/USDT, BNB/USDT, SOL/USDT, BTC/GHS, ETH/NGN
- **Order Types:**
  - Market orders (instant execution)
  - Limit orders (set price)
- **Trading Interface:**
  - Real-time price charts (TradingView or custom charts)
  - Candlestick, line, bar charts
  - Timeframes: 1m, 5m, 15m, 1h, 4h, 1D, 1W
  - Order book (bids/asks)
  - Recent trades feed
  - Buy/Sell order forms
  - Trade history

#### **Futures Trading**
- **Leverage:** 5x, 10x, 20x (Max 20x for regulatory compliance and risk management)
- **Position Types:** Long (buy), Short (sell)
- **Risk Management:** Mandatory position size limits, real-time risk monitoring, and automated liquidation protection
- **Features:**
  - Cross margin & isolated margin
  - Take profit / Stop loss
  - PnL (Profit & Loss) calculation in real-time
  - Liquidation price display
  - Funding rate info
  - Open positions management
  - Position history

### 5. **Instant Crypto Converter**
- Convert crypto-to-crypto instantly
- Live exchange rates from CoinGecko API
- Supported pairs: BTC, ETH, USDT, BNB, SOL, LTC, etc.
- Swap animation
- Conversion history
- Best rate comparison
- Fee breakdown (0.1% - 0.5%)

### 6. **P2P Trading**
- **Buy/Sell Crypto**
  - P2P marketplace with live offers
  - Filter by: Payment method, currency, amount, region
  - User ratings & reviews
  - Escrow protection
  
- **P2P Order Flow**
  - Select offer → Chat with seller → Transfer payment → Release crypto
  - Timer countdown for payment (15-30 minutes)
  - Dispute resolution system
  - Upload payment proof (screenshot)

- **Create P2P Ads**
  - Set price (fixed or floating %)
  - Set min/max limits
  - Choose payment methods (bank, mobile money, cash)
  - Auto-reply messages

### 7. **Gift Card Marketplace**

#### **Buy Gift Cards**
- **Available Cards:** Amazon, Steam, Apple, Google Play, iTunes, Xbox, Amex Serve, Best Buy, American Express, Foot Locker, eBay
- **Regions:** USA, UK, EU, Canada, Australia, Global
- **Payment Methods:** 
  - RFEX wallet balance
  - Bank transfer
  - Mobile Money
  - Crypto (BTC, USDT, ETH)
- **Delivery:** Instant code delivery via email/in-app
- **Denominations:** $10, $25, $50, $100, $200, $500

#### **Sell Gift Cards**
- Upload gift card (code or photo)
- Card type selection (Physical, E-code, Receipt, Printed)
- Payment method selection (Naira, Cedis, BTC, LTC, USDT, ETH, Wallet)
- Rate display (75%-90% depending on card)
- **Fraud Prevention:**
  - **Implementation Details:**
    - AI-based image verification using AWS Rekognition for physical card validation
    - Duplicate card detection via perceptual hashing (pHash algorithm) and SHA-256 fingerprinting
    - Velocity checks: max 3 cards per user per 24-hour period, max $500 total value per week
    - Blacklist checking: real-time lookup against industry-shared fraud database
    - Behavioral analysis: flag unusual patterns (e.g., rapid account creation + card submission)
  - **Privacy Safeguards:**
    - Device fingerprinting anonymized and hashed (not stored in plaintext)
    - IP data retained for 90 days only (GDPR compliance)
    - User consent required for enhanced fraud checks
    - Right to challenge automated fraud decisions per GDPR Article 22
- Admin verification (24-48 hours)
- Transaction tracking

### 8. **Referral Program**
- **3-Tier Commission System:**
  - 🥉 **Starter:** 20% commission (0-9 referrals)
  - 🥈 **Pro:** 30% commission (10-49 referrals)
  - 🥇 **Elite:** 40% commission (50+ referrals)

- **Features:**
  - Unique referral code/link
  - Share via WhatsApp, Twitter, Facebook, Telegram, Email
  - QR code for referral link
  - Real-time earnings tracker
  - Referral dashboard (total referred, active users, earnings)
  - Instant wallet payouts
  - Weekly/monthly reports

### 9. **Live Market Data**
- **Market Overview**
  - Top gainers/losers (24h)
  - Trading volume rankings
  - Market cap data
  - Price alerts (set custom alerts)

- **Watchlist**
  - Add favorite trading pairs
  - Quick access to charts
  - Price change notifications

### 10. **Security Features**
- End-to-end encryption
- Cold wallet storage for user funds
- SSL/TLS communication
- Anti-phishing codes
- Withdrawal whitelist addresses
- Login history & device management
- Session timeout
- Rate limiting for API requests
- Fraud detection & prevention

### 11. **Compliance & Regulatory**

**COMPLIANCE DISCLAIMER:** RFEX is actively pursuing financial licensing and regulatory compliance. Current operations are conducted under applicable money services business (MSB) and virtual asset service provider (VASP) frameworks. Users should consult local regulations before trading.

- **KYC/AML Compliance:**
  - Tiered verification levels (Basic, Intermediate, Advanced)
  - Enhanced due diligence for high-risk jurisdictions
  - Ongoing transaction monitoring and suspicious activity reporting
  
- **Regulatory Requirements:**
  - **Data Protection:** GDPR compliance for EU users, CCPA for California residents
  - **Data Residency:** Jurisdiction-specific data storage requirements
  - **Financial Licensing:** Working toward FinCEN (USA), FCA (UK), SEC registration
  - **Sanctions Compliance:** OFAC screening for all users and transactions
  
- **Tax Compliance:**
  - **US Users:**
    - EIN/SSN collection via W-9 form for applicable accounts
    - Automatic 1099-MISC generation for earnings ≥$600/year (referrals, staking rewards)
    - Form 1099-B for capital gains reporting (when trading volume exceeds IRS thresholds)
    - Backup withholding (24%) if W-9 not provided
  - **Transaction Reporting:**
    - Export detailed transaction history (CSV, PDF) for tax filing
    - Gain/loss calculation reports with cost basis tracking
    - Integration with tax software APIs (CoinTracker, Koinly) [Phase 3]
  - **International Compliance:**
    - CRS (Common Reporting Standard) reporting for eligible jurisdictions
    - Local tax documentation support per country regulations
- **Audit Trail:**
  - Immutable audit logs for all financial transactions
  - Compliance reports generation (monthly/quarterly)
  - Third-party audit readiness

---

## 🏗️ Technical Architecture

### **Frontend (React Native)**

#### **Core Libraries**
```json
{
  "react-native": "^0.73.x",
  "expo": "^50.x" (or bare React Native),
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "react-native-reanimated": "^3.x",
  "react-native-gesture-handler": "^2.x"
}
```

#### **State Management**
- **Redux Toolkit** or **Zustand** for global state
- **React Query** for API data fetching & caching
- **AsyncStorage** for local persistence

#### **UI Components**
- **React Native Paper** or **NativeBase** for pre-built components
- **React Native Vector Icons** for icons
- **Lottie** for animations
- **React Native Fast Image** for optimized images
- **React Native Linear Gradient** for gradients

#### **Charts & Trading**
- **React Native WebView** + TradingView widget
- **Victory Native** or **React Native Chart Kit** for custom charts
- **WebSocket** (Socket.io-client) for real-time price updates

#### **Forms & Validation**
- **React Hook Form** for form management
- **Yup** or **Zod** for schema validation

#### **Camera & Media**
- **React Native Camera** or **Expo Camera** for KYC
- **React Native Image Picker** for gallery selection
- **React Native Image Crop Picker** for image editing
- **React Native QR Code Scanner** for QR scanning

#### **Authentication**
- **React Native Biometrics** for fingerprint/Face ID
- **React Native OTP Input** for verification codes
- **React Native Keychain** for secure storage

#### **Push Notifications**
- **Firebase Cloud Messaging (FCM)** for Android
- **Apple Push Notification Service (APNS)** for iOS
- **OneSignal** or **Expo Notifications** as alternatives

#### **Payment Integrations**
- **Paystack SDK** for bank & mobile money (Nigeria, Ghana, Kenya)
- **Flutterwave SDK** as alternative
- **WebView** for payment gateways

#### **Blockchain**
- **Web3.js** or **Ethers.js** for Ethereum/BSC interactions
- **WalletConnect** for external wallet connections
- **Bitcoin.js** for Bitcoin operations

---

### **Backend (Node.js + Express)**

#### **Core Stack**
```json
{
  "express": "^4.x",
  "mongoose": "^8.x" (MongoDB) or "pg": "^8.x" (PostgreSQL),
  "socket.io": "^4.x" (WebSockets),
  "jsonwebtoken": "^9.x" (JWT),
  "bcrypt": "^5.x" (Password hashing),
  "express-validator": "^7.x",
  "helmet": "^7.x" (Security headers),
  "cors": "^2.x",
  "dotenv": "^16.x"
}
```

#### **Database**
- **PostgreSQL** (MANDATORY for financial data integrity)
  - Tables: users, wallets, ledger_entries, transactions, orders, kyc_documents, gift_cards, referrals, p2p_trades, p2p_chat_messages, audit_logs
  - Indexes on user_id, transaction_id, order_id for fast queries
  - ACID compliance for financial transactions
  - Row-level security (RLS) for multi-tenancy
  - Point-in-time recovery (PITR) enabled
  - Streaming replication for high availability
  - ~~MongoDB (DEPRECATED - not suitable for financial transactions due to eventual consistency)~~

- **Redis** for caching & session management
  - Cache exchange rates
  - Store active sessions
  - Rate limiting

#### **APIs & Services**
- **CoinGecko API** - Live crypto prices (free tier, rate limit: 50 calls/min)
  - **Tiered Caching Strategy:**
    - L1 (Redis): 5-second cache for high-frequency pairs (BTC/USDT, ETH/USDT)
    - L2 (Redis): 30-second cache for standard pairs
    - L3 (In-memory): 2-minute cache for low-volume pairs
    - Stale-while-revalidate: Serve stale data up to 60s if API unavailable
  - **Multi-Tier Fallback Strategy:**
    - Primary: CoinGecko API
    - Secondary: CoinMarketCap API (100 calls/day free tier)
    - Tertiary: Binance public API (last known prices)
    - Emergency: Last cached value with staleness warning to user
- **ExchangeRate-API** - Fiat currency rates (1500 requests/month free)
  - Fallback: Open Exchange Rates API, then ECB (European Central Bank) rates
- **Binance API** - Trading data & liquidity (rate limit: 1200 requests/min)
  - Redundancy: Kraken API, Coinbase Pro API
- **Paystack API** - Payment processing (Ghana, Nigeria, South Africa)
  - Rate limits: 3000 requests/hour
- **Flutterwave API** - Alternative payment gateway (34+ African countries)
- **Twilio** - SMS for OTP (rate limit: configurable per account)
  - Fallback: Africa's Talking SMS API
- **SendGrid** - Email notifications (100 emails/day free)
  - Fallback: Mailgun (5000 emails/month free)
- **AWS S3** - KYC document storage (encrypted at rest with SSE-S3)
  - Backup: Cloudinary for image processing

#### **Security**
- **Rate limiting** (express-rate-limit)
- **Input sanitization** (express-mongo-sanitize)
- **CSRF protection** (csurf)
- **SQL injection prevention** (parameterized queries)
- **XSS protection** (helmet)
- **2FA** (speakeasy for TOTP)
- **Cold wallet integration** for large balances

#### **Background Jobs**
- **Bull** (Redis-based queue) for:
  - Processing deposits/withdrawals
  - Sending emails/SMS
  - Updating exchange rates
  - KYC verification
  - Gift card processing

#### **WebSockets**
- Real-time price updates
- Order book updates
- Trade execution notifications
- P2P chat messages
- Wallet balance updates
- **Security Controls:**
  - JWT-based authentication for WebSocket connections (token refresh every 15 minutes)
  - **Tiered Rate Limiting:**
    - Public data (price updates): max 50 messages/second per connection
    - User-specific data (balance updates, orders): max 20 messages/second
    - Admin actions: max 5 messages/second
    - Burst allowance: +10 messages for 3-second window
  - **Origin Validation:**
    - Whitelist: `wss://api.rfex.app`, `wss://api-staging.rfex.app`
    - Reject connections from unauthorized origins (log attempt)
    - Validate Sec-WebSocket-Protocol header
  - Heartbeat/ping-pong mechanism (30s timeout, 3 missed pings = disconnect)
  - Automatic reconnection with exponential backoff (initial: 1s, max: 30s)
  - Connection limits: max 5 concurrent WebSocket connections per user
- **Scalability:**
  - Redis pub/sub for horizontal scaling across multiple servers
  - Socket.io with sticky sessions (nginx load balancer, ip_hash)
  - Room-based subscriptions (per user, per market pair)
  - **Message Queue Buffering:**
    - Per-client buffer: max 100 messages (reduced from 1000 for memory efficiency)
    - Buffer eviction policy: FIFO (oldest messages dropped first)
    - Overflow handling: Send "message_overflow" event to client

#### **Deep Linking**
- **Universal Links (iOS) / App Links (Android)**
  - `rfex://` custom URL scheme
  - `https://rfex.app/` deep linking
- **Supported Routes:**
  - `/trade/:pair` - Open trading screen for specific pair
  - `/wallet/:currency` - Open wallet details
  - `/p2p/offer/:id` - Open P2P offer
  - `/referral/:code` - Apply referral code
  - `/verify-email?code=xxxxx` - Email verification (6-digit code, 15-min expiry)
  - `/reset-password` - Password reset (opens form, requires code + email verification)
- **QR Code Support:** Generate QR codes for referral links, wallet addresses

#### **Offline Mode**
- **Offline Capabilities:**
  - **Read-Only Actions (Allowed):**
    - View wallet balances (last synced data with timestamp)
    - Browse transaction history (cached, marked as "offline")
    - View market prices (stale data with red warning banner)
    - Access profile and settings (read-only)
    - View open orders (cached state, no cancellation)
  - **Blocked Actions (Show "Requires Connection" Error):**
    - Place new trades (spot, futures)
    - Initiate withdrawals or deposits
    - Cancel orders
    - Send P2P messages
    - Upload KYC documents
  - **Queued Actions (Sync When Online):**
    - Update profile preferences (name, avatar)
    - Mark notifications as read
    - Add/remove watchlist items
    - Enable/disable price alerts
- **Data Persistence:**
  - AsyncStorage for user preferences
  - Redux Persist for state persistence
  - SQLite for offline transaction history (optional)
- **Sync Strategy:**
  - Background sync when connection restored
  - Conflict resolution for offline actions
  - Queue pending transactions (display warning for critical actions)
- **Network Status:**
  - Real-time connectivity indicator
  - Automatic retry for failed requests
  - Graceful degradation for features requiring real-time data

---

## 📐 App Structure

### **Screen Navigation**

```
App.js
├── AuthNavigator (if not logged in)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   ├── RegisterScreen
│   ├── OTPVerificationScreen
│   └── ForgotPasswordScreen
│
└── MainNavigator (if logged in)
    ├── BottomTabNavigator
    │   ├── HomeTab
    │   │   ├── HomeScreen (dashboard, market overview, quick actions)
    │   │   └── MarketDetailsScreen (individual coin)
    │   │
    │   ├── MarketsTab
    │   │   ├── MarketsScreen (all trading pairs, search, filters)
    │   │   ├── SpotTradingScreen
    │   │   └── FuturesTradingScreen
    │   │
    │   ├── TradeTab (Center button)
    │   │   ├── TradeMenuScreen (Spot, Futures, Convert, P2P)
    │   │   ├── ConvertScreen
    │   │   └── P2PTradingScreen
    │   │
    │   ├── WalletsTab
    │   │   ├── WalletsScreen (all wallets, portfolio)
    │   │   ├── WalletDetailsScreen (transactions, deposit, withdraw)
    │   │   ├── DepositScreen
    │   │   └── WithdrawScreen
    │   │
    │   └── ProfileTab
    │       ├── ProfileScreen
    │       ├── KYCScreen
    │       ├── SecurityScreen (2FA, change password)
    │       ├── ReferralScreen
    │       ├── GiftCardsScreen
    │       ├── NotificationsScreen
    │       ├── SettingsScreen
    │       └── SupportScreen
    │
    └── StackNavigator (Modals & Full Screens)
        ├── QRScannerScreen
        ├── TransactionDetailsScreen
        ├── OrderHistoryScreen
        ├── P2PChatScreen
        ├── DisputeScreen
        └── NotificationDetailsScreen
```

---

## 🎨 Design System

### **Color Palette**

#### **Dark Theme (Default) - WCAG AA Compliant**
```javascript
const darkColors = {
  // Primary (contrast ratio 1.77:1 on dark bg - use with care)
  primary: '#FFB703',        // Golden yellow (brand)
  primaryDark: '#E59500',
  primaryLight: '#FFC933',
  
  // Accent
  accent: '#06B6D4',         // Cyan (highlights) - 4.74:1 contrast
  accentDark: '#0891B2',
  
  // Success/Buy
  success: '#10B981',        // Green - 3.12:1 contrast (AA compliant for large text)
  successLight: '#34D399',   // 4.53:1 contrast (AA compliant)
  
  // Danger/Sell
  danger: '#EF4444',         // Red - 3.93:1 contrast
  dangerLight: '#F87171',    // 4.51:1 contrast (AA compliant)
  
  // Backgrounds
  background: '#0F172A',     // Dark navy (#0F172A)
  surface: '#1E293B',        // Card background
  surfaceLight: '#334155',
  
  // Text (WCAG AA minimum 4.5:1 for normal text, 3:1 for large text)
  textPrimary: '#F1F5F9',    // 15.52:1 contrast ✓ AAA
  textSecondary: '#94A3B8',  // 5.89:1 contrast ✓ AA
  textMuted: '#64748B',      // 4.51:1 contrast ✓ AA
  
  // Borders
  border: 'rgba(255, 255, 255, 0.1)',
  
  // Status
  warning: '#FBBF24',        // Adjusted for better contrast (4.89:1)
  info: '#60A5FA',           // Adjusted for better contrast (5.12:1)
}
```

#### **Light Theme - WCAG AA Compliant**
```javascript
const lightColors = {
  // Primary
  primary: '#D97706',        // Darker golden (brand) - 4.52:1 contrast
  primaryDark: '#B45309',
  primaryLight: '#F59E0B',
  
  // Accent
  accent: '#0284C7',         // Darker cyan - 4.65:1 contrast
  accentDark: '#0369A1',
  
  // Success/Buy
  success: '#059669',        // Darker green - 4.54:1 contrast
  successLight: '#10B981',
  
  // Danger/Sell
  danger: '#DC2626',         // Darker red - 4.51:1 contrast
  dangerLight: '#EF4444',
  
  // Backgrounds
  background: '#FFFFFF',     // Pure white
  surface: '#F8FAFC',        // Light gray
  surfaceLight: '#E2E8F0',
  
  // Text
  textPrimary: '#0F172A',    // 15.52:1 contrast ✓ AAA
  textSecondary: '#475569',  // 7.12:1 contrast ✓ AAA
  textMuted: '#64748B',      // 4.51:1 contrast ✓ AA
  
  // Borders
  border: 'rgba(15, 23, 42, 0.1)',
  
  // Status
  warning: '#D97706',        // 4.52:1 contrast
  info: '#2563EB',           // 4.56:1 contrast
}
```

**WCAG Compliance Notes:**
- **Text Contrast Ratios (WCAG 2.1 Level AA):**
  - Normal text (16px): Minimum 4.5:1 ✓ (textPrimary: 15.52:1, textSecondary: 5.89:1, textMuted: 4.51:1)
  - Large text (18px+ or 14px+ bold): Minimum 3:1 ✓ (success: 3.12:1, danger: 3.93:1)
  - UI components & interactive elements: Minimum 3:1 ✓
- **Usage Restrictions:**
  - ⚠️ `primary` (#FFB703) has 1.77:1 contrast - **DO NOT use for body text**. Only for large headings (24px+), icons, and decorative elements
  - Use `accent` (#06B6D4, 4.74:1) or `successLight` (#34D399, 4.53:1) for smaller interactive elements
- **Additional Compliance:**
  - Focus indicators: 3px solid outline with 3:1 contrast
  - Touch targets: Minimum 44x44 dp (iOS) / 48x48 dp (Android)
  - Theme toggle available in app settings for user preference

### **Typography**
```javascript
const typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
}
```

### **Spacing**
```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

---

## 📊 Database Schema (PostgreSQL)

### **Users Table**
```sql
-- Create enum types for PostgreSQL
CREATE TYPE kyc_status_enum AS ENUM ('pending', 'verified', 'rejected');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  profile_picture TEXT,
  kyc_status kyc_status_enum DEFAULT 'pending',
  two_fa_enabled BOOLEAN DEFAULT FALSE,
  two_fa_secret VARCHAR(255),
  referral_code VARCHAR(20) UNIQUE,
  referred_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Wallets Table**
```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  currency VARCHAR(10) NOT NULL, -- BTC, ETH, USDT, GHS, USD, etc.
  balance DECIMAL(20, 8) DEFAULT 0,
  locked_balance DECIMAL(20, 8) DEFAULT 0, -- for open orders
  address VARCHAR(255), -- crypto wallet address
  version INT DEFAULT 1, -- optimistic locking version
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, currency),
  CHECK (balance >= 0),
  CHECK (locked_balance >= 0)
  -- Note: balance + locked_balance check removed (always true if both >= 0)
);

-- Optimistic locking: Auto-increment version on every update
CREATE OR REPLACE FUNCTION increment_wallet_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = OLD.version + 1;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wallet_version_trigger
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION increment_wallet_version();

-- Application-level usage:
-- UPDATE wallets SET balance = balance + 100 WHERE id = ? AND version = ?
-- If affected_rows = 0, retry transaction (version mismatch = concurrent update)
```

### **Ledger Entries Table (Double-Entry Accounting)**
```sql
CREATE TYPE transaction_type_enum AS ENUM ('deposit', 'withdrawal', 'trade', 'p2p', 'gift_card', 'referral', 'convert', 'fee');
CREATE TYPE entry_type_enum AS ENUM ('debit', 'credit');
CREATE TYPE transaction_status_enum AS ENUM ('pending', 'completed', 'failed', 'cancelled');

CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL, -- groups double entries together
  user_id UUID REFERENCES users(id),
  wallet_id UUID REFERENCES wallets(id),
  entry_type entry_type_enum NOT NULL, -- debit or credit
  amount DECIMAL(20, 8) NOT NULL CHECK (amount > 0),
  currency VARCHAR(10) NOT NULL,
  balance_after DECIMAL(20, 8) NOT NULL, -- snapshot of wallet balance after this entry
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  CHECK (entry_type IN ('debit', 'credit'))
);

CREATE INDEX idx_ledger_entries_transaction_id ON ledger_entries(transaction_id);
CREATE INDEX idx_ledger_entries_user_id ON ledger_entries(user_id);
CREATE INDEX idx_ledger_entries_wallet_id ON ledger_entries(wallet_id);

-- Database-level enforcement: every transaction_id must have balanced debits and credits
-- Using deferred constraint to allow all entries to be inserted before validation
CREATE CONSTRAINT TRIGGER check_balanced_ledger
  AFTER INSERT ON ledger_entries
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE FUNCTION validate_balanced_transaction();

-- Trigger function to validate double-entry balance
CREATE OR REPLACE FUNCTION validate_balanced_transaction()
RETURNS TRIGGER AS $$
DECLARE
  total_debits DECIMAL(20, 8);
  total_credits DECIMAL(20, 8);
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO total_debits
  FROM ledger_entries
  WHERE transaction_id = NEW.transaction_id AND entry_type = 'debit';
  
  SELECT COALESCE(SUM(amount), 0) INTO total_credits
  FROM ledger_entries
  WHERE transaction_id = NEW.transaction_id AND entry_type = 'credit';
  
  IF total_debits != total_credits THEN
    RAISE EXCEPTION 'Transaction % has unbalanced ledger entries: debits=%, credits=%',
      NEW.transaction_id, total_debits, total_credits;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

### **Transactions Table (High-level transaction records)**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type transaction_type_enum NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  fee DECIMAL(20, 8) DEFAULT 0,
  status transaction_status_enum DEFAULT 'pending',
  tx_hash VARCHAR(255), -- blockchain transaction hash
  payment_method VARCHAR(50), -- bank, mobile_money, crypto
  metadata JSONB, -- additional data
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
```

### **Audit Logs Table**
```sql
CREATE TYPE audit_action_enum AS ENUM (
  'wallet_deposit', 'wallet_withdrawal', 'balance_update', 
  'order_created', 'order_cancelled', 'trade_executed',
  'kyc_submitted', 'kyc_approved', 'kyc_rejected',
  'login', 'logout', 'password_changed', '2fa_enabled', '2fa_disabled',
  'user_created', 'user_updated', 'admin_action'
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action audit_action_enum NOT NULL,
  entity_type VARCHAR(50), -- 'wallet', 'order', 'user', etc.
  entity_id UUID,
  old_values JSONB, -- snapshot before change
  new_values JSONB, -- snapshot after change
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

### **Orders Table (Spot Trading)**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  pair VARCHAR(20) NOT NULL, -- BTC/USDT
  side ENUM('buy', 'sell') NOT NULL,
  type ENUM('market', 'limit') NOT NULL,
  price DECIMAL(20, 8), -- NULL for market orders
  amount DECIMAL(20, 8) NOT NULL,
  filled_amount DECIMAL(20, 8) DEFAULT 0,
  status ENUM('open', 'partially_filled', 'filled', 'cancelled') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Futures Positions Table**
```sql
CREATE TABLE futures_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  pair VARCHAR(20) NOT NULL,
  side ENUM('long', 'short') NOT NULL,
  leverage INT NOT NULL,
  entry_price DECIMAL(20, 8) NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  liquidation_price DECIMAL(20, 8),
  take_profit DECIMAL(20, 8),
  stop_loss DECIMAL(20, 8),
  unrealized_pnl DECIMAL(20, 8) DEFAULT 0,
  status ENUM('open', 'closed', 'liquidated') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);
```

### **KYC Documents Table**
```sql
CREATE TYPE document_type_enum AS ENUM ('passport', 'national_id', 'drivers_license');
CREATE TYPE kyc_document_status_enum AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE kyc_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  document_type document_type_enum NOT NULL,
  document_number VARCHAR(100),
  -- Store S3 object keys instead of pre-signed URLs
  document_front_s3_key TEXT NOT NULL, -- e.g., 'kyc/user-{uuid}/passport-front.jpg'
  document_back_s3_key TEXT, -- e.g., 'kyc/user-{uuid}/passport-back.jpg'
  selfie_s3_key TEXT NOT NULL, -- e.g., 'kyc/user-{uuid}/selfie.jpg'
  s3_bucket VARCHAR(100) DEFAULT 'rfex-kyc-documents', -- bucket name for flexibility
  status kyc_document_status_enum DEFAULT 'pending',
  rejection_reason TEXT,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  -- Security Notes:
  -- - S3 bucket encryption: SSE-KMS with customer-managed keys
  -- - Access: Generate pre-signed URLs on-demand (15-minute expiry) via API
  -- - Retention: S3 lifecycle policy auto-delete after 7 years (GDPR/compliance)
  -- - Access Control: S3 bucket policy restricts to authorized backend services only
  -- - Audit: CloudTrail logs all S3 access events
  CONSTRAINT check_s3_keys CHECK (
    document_front_s3_key ~ '^kyc/user-[a-f0-9-]{36}/' AND
    (document_back_s3_key IS NULL OR document_back_s3_key ~ '^kyc/user-[a-f0-9-]{36}/') AND
    selfie_s3_key ~ '^kyc/user-[a-f0-9-]{36}/'
  )
);

-- API Endpoint Usage:
-- GET /api/v1/kyc/documents/:id/download?file=front
-- Returns: { "url": "https://s3.amazonaws.com/...?X-Amz-Expires=900&..." }
```

### **Gift Cards Table**
```sql
CREATE TYPE gift_card_type_enum AS ENUM ('buy', 'sell');
CREATE TYPE gift_card_status_enum AS ENUM ('pending', 'processing', 'completed', 'rejected');

CREATE TABLE gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type gift_card_type_enum NOT NULL,
  card_name VARCHAR(100) NOT NULL, -- Amazon, Steam, etc.
  region VARCHAR(50), -- USA, UK, EU, etc.
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  rate DECIMAL(5, 2), -- for sell orders (80%, 85%, etc.)
  payment_method VARCHAR(50),
  -- Encrypted card code (AES-256-GCM)
  card_code_encrypted TEXT, -- Base64-encoded ciphertext
  card_code_iv TEXT NOT NULL, -- Initialization vector (96-bit, Base64-encoded)
  card_code_tag TEXT NOT NULL, -- Authentication tag (128-bit, Base64-encoded)
  encryption_key_id VARCHAR(100), -- AWS KMS Key ID or Vault key version
  encrypted_at TIMESTAMP DEFAULT NOW(), -- Timestamp of encryption
  -- Card image storage
  card_image_s3_key TEXT, -- S3 object key (e.g., 'giftcards/user-{uuid}/card-{id}.jpg')
  s3_bucket VARCHAR(100) DEFAULT 'rfex-giftcard-images',
  status gift_card_status_enum DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  -- Prevent storage of plaintext card codes
  CONSTRAINT no_plaintext_codes CHECK (card_code_encrypted IS NULL OR LENGTH(card_code_encrypted) > 20)
);

-- Encryption Implementation Details:
-- Algorithm: AES-256-GCM (Galois/Counter Mode for authenticated encryption)
-- Key Management: AWS KMS (customer-managed key with automatic rotation)
--   - Primary Key: arn:aws:kms:region:account:key/{key-id}
--   - Key Rotation: Automatic 90-day rotation (AWS managed)
--   - Key Policy: Restrict to backend service role only
-- Encryption Process:
--   1. Generate random 96-bit IV (crypto.randomBytes(12))
--   2. Encrypt card_code with AES-256-GCM using KMS data key
--   3. Store ciphertext, IV, and auth tag separately
--   4. Log encryption event to audit_logs (key_id, user_id, timestamp)
-- Decryption Access Control:
--   - Only 'giftcard-processor' service role can decrypt
--   - Rate limit: 100 decrypt operations/minute per user
--   - All decrypt operations logged with IP and user_agent
-- Data Retention:
--   - Delete encrypted codes 30 days after 'completed' status
--   - S3 lifecycle policy: archive images to Glacier after 90 days

CREATE INDEX idx_gift_cards_user_id ON gift_cards(user_id);
CREATE INDEX idx_gift_cards_status ON gift_cards(status);
```

### **Referrals Table**
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  commission_rate DECIMAL(5, 2) NOT NULL, -- 20, 30, 40
  total_earned DECIMAL(20, 8) DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **P2P Offers Table**
```sql
CREATE TABLE p2p_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type ENUM('buy', 'sell') NOT NULL,
  crypto VARCHAR(10) NOT NULL, -- BTC, USDT, ETH
  fiat VARCHAR(10) NOT NULL, -- USD, NGN, GHS
  price DECIMAL(20, 8) NOT NULL,
  min_limit DECIMAL(20, 2) NOT NULL,
  max_limit DECIMAL(20, 2) NOT NULL,
  payment_methods JSONB, -- ["bank", "mobile_money"]
  available_amount DECIMAL(20, 8) NOT NULL,
  status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **P2P Trades Table**
```sql
CREATE TYPE p2p_trade_status_enum AS ENUM ('pending', 'paid', 'released', 'disputed', 'cancelled');

CREATE TABLE p2p_trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID REFERENCES p2p_offers(id),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  amount DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  total DECIMAL(20, 2) NOT NULL,
  payment_method VARCHAR(50),
  payment_proof TEXT, -- S3 URL
  status p2p_trade_status_enum DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_p2p_trades_buyer_id ON p2p_trades(buyer_id);
CREATE INDEX idx_p2p_trades_seller_id ON p2p_trades(seller_id);
CREATE INDEX idx_p2p_trades_status ON p2p_trades(status);

### **P2P Chat Messages Table**
```sql
CREATE TABLE p2p_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id UUID REFERENCES p2p_trades(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  is_system_message BOOLEAN DEFAULT FALSE, -- for automated messages
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_p2p_chat_messages_trade_id ON p2p_chat_messages(trade_id);
CREATE INDEX idx_p2p_chat_messages_sender_id ON p2p_chat_messages(sender_id);
CREATE INDEX idx_p2p_chat_messages_created_at ON p2p_chat_messages(created_at);
```

---

## 🔐 API Endpoints

### **API Standards**
- **Base URL:** `https://api.rfex.app/v1`
- **Versioning:** URI versioning (`/v1`, `/v2`)
- **Authentication:** Bearer token (JWT) in `Authorization` header
- **Rate Limiting (Tiered Per-User):**
  - **Public Endpoints (per IP):**
    - Anonymous: 100 requests/15 minutes
    - Burst allowance: +20 requests for first 60 seconds
  - **Authenticated Endpoints (per user):**
    - Basic tier (KYC pending): 500 requests/15 minutes
    - Verified tier (KYC approved): 1000 requests/15 minutes  
    - Premium tier (VIP users): 5000 requests/15 minutes
  - **Trading Endpoints (per user):**
    - Order placement: 10 requests/second (max 600/minute)
    - Order cancellation: 20 requests/second
    - Market data: 50 requests/second
  - **Withdrawal Endpoints:**
    - Crypto withdrawal: 5 requests/hour (security measure)
    - Fiat withdrawal: 3 requests/day
  - **Idempotency Support:**
    - POST/PUT/DELETE requests: Accept `Idempotency-Key` header (UUID)
    - Duplicate key within 24 hours: Return cached response (status 200, not 409)
    - Implementation: Redis cache with 24-hour TTL
- **Pagination:** 
  - Query params: `?page=1&limit=20` (default limit: 20, max: 100)
  - Response includes: `{ data: [], pagination: { total, page, limit, totalPages } }`
- **Error Schema:**
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid email format",
      "details": [{ "field": "email", "message": "Must be valid email" }],
      "timestamp": "2026-01-28T10:30:00Z",
      "requestId": "uuid-v4"
    }
  }
  ```
- **Success Schema:**
  ```json
  {
    "success": true,
    "data": {},
    "timestamp": "2026-01-28T10:30:00Z"
  }
  ```

### **Authentication** (Public endpoints)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-otp` - OTP verification
- `POST /api/v1/auth/refresh-token` - Refresh JWT
- `POST /api/v1/auth/forgot-password` - Password reset
- `POST /api/v1/auth/logout` - Logout (requires auth)

### **User** (requires auth)
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update profile
- `POST /api/v1/user/upload-avatar` - Upload profile picture (multipart/form-data)
- `POST /api/v1/user/enable-2fa` - Enable 2FA
- `POST /api/v1/user/verify-2fa` - Verify 2FA code

### **KYC** (requires auth)
- `POST /api/v1/kyc/submit` - Submit KYC documents (multipart/form-data)
- `GET /api/v1/kyc/status` - Get KYC status
- `GET /api/v1/kyc/documents` - Get uploaded documents (returns pre-signed S3 URLs)

### **Wallets** (requires auth)
- `GET /api/v1/wallets` - Get all user wallets (paginated)
- `GET /api/v1/wallets/:currency` - Get specific wallet
- `GET /api/v1/wallets/:currency/transactions` - Transaction history (paginated)
- `POST /api/v1/wallets/deposit` - Initiate deposit
- `POST /api/v1/wallets/withdraw` - Multi-step withdrawal (see withdrawal flow below)
- `GET /api/v1/wallets/deposit-address/:crypto` - Generate deposit address

### **Trading** (requires auth for orders)
- `GET /api/v1/markets` - Get all trading pairs (public)
- `GET /api/v1/markets/:pair/ticker` - Get price ticker (public)
- `GET /api/v1/markets/:pair/orderbook` - Get order book (public)
- `GET /api/v1/markets/:pair/trades` - Recent trades (public, paginated)
- `POST /api/v1/orders/spot` - Place spot order (requires auth + 2FA for large orders)
- `POST /api/v1/orders/futures` - Open futures position (requires auth + 2FA)
- `GET /api/v1/orders/history` - Order history (requires auth, paginated)
- `DELETE /api/v1/orders/:id` - Cancel order (requires auth)

### **Convert** (requires auth)
- `POST /api/v1/convert` - Convert crypto to crypto
- `GET /api/v1/convert/rates` - Get conversion rates (public)
- `GET /api/v1/convert/history` - Conversion history (paginated)

### **P2P** (requires auth for trades)
- `GET /api/v1/p2p/offers` - Get P2P offers (public, paginated, filterable)
- `POST /api/v1/p2p/offers` - Create P2P ad (requires auth + KYC verified)
- `POST /api/v1/p2p/trades` - Start P2P trade (requires auth)
- `PUT /api/v1/p2p/trades/:id/pay` - Mark as paid (requires auth)
- `PUT /api/v1/p2p/trades/:id/release` - Release crypto (requires auth + 2FA)
- `POST /api/v1/p2p/trades/:id/dispute` - Open dispute (requires auth)
- ~~`POST /api/v1/p2p/trades/:id/message`~~ - **DEPRECATED**
    - **Deprecation Notice:** As of February 1, 2026
    - **Sunset Date:** May 1, 2026 (complete removal)
    - **Migration Guide:** Use WebSocket endpoint `wss://api.rfex.app/p2p/chat` with event `send_message`
      ```javascript
      // Old (Deprecated)
      POST /api/v1/p2p/trades/123/message
      Body: { message: "Hello" }
      
      // New (Recommended)
      socket.emit('send_message', { tradeId: '123', message: 'Hello' });
      socket.on('message_sent', (data) => { /* handle response */ });
      ```
    - **Transition Period:** Endpoint will return `410 Gone` starting May 1, 2026
    - **Documentation:** See [WebSocket P2P Chat Guide](https://docs.rfex.app/websocket-chat)
- `GET /api/v1/p2p/trades/:id/messages` - Get chat history (requires auth, paginated)

### **Gift Cards** (requires auth)
- `GET /api/v1/giftcards/available` - Get available cards (public)
- `POST /api/v1/giftcards/buy` - Buy gift card
- `POST /api/v1/giftcards/sell` - Sell gift card (multipart/form-data for images)
- `GET /api/v1/giftcards/orders` - Gift card orders (paginated)
- `GET /api/v1/giftcards/rates` - Get card rates (public)

### **Referrals** (requires auth)
- `GET /api/v1/referrals/stats` - Get referral stats
- `GET /api/v1/referrals/earnings` - Earnings history (paginated)
- `POST /api/v1/referrals/payout` - Request payout

### **Notifications** (requires auth)
- `GET /api/v1/notifications` - Get notifications (paginated)
- `PUT /api/v1/notifications/:id/read` - Mark as read
- `POST /api/v1/notifications/subscribe` - Subscribe to push notifications

### **Admin** (requires auth + admin role)
- `GET /api/v1/admin/kyc/pending` - Pending KYC verifications (paginated)
- `PUT /api/v1/admin/kyc/:id/approve` - Approve KYC
- `PUT /api/v1/admin/kyc/:id/reject` - Reject KYC
- `GET /api/v1/admin/giftcards/pending` - Pending gift card orders (paginated)
- `PUT /api/v1/admin/giftcards/:id/approve` - Approve gift card
- `GET /api/v1/admin/users` - User management (paginated, filterable)
- `GET /api/v1/admin/transactions` - All transactions (paginated, filterable)

### **Withdrawal Flow** (Multi-step for security)
1. `POST /api/v1/wallets/withdraw/initiate` - Initiate withdrawal request
   - Returns: `{ withdrawalId, requiresApproval, estimatedFee }`
2. `POST /api/v1/wallets/withdraw/:id/verify-2fa` - Verify 2FA code
   - Returns: `{ verified: true }`
3. `POST /api/v1/wallets/withdraw/:id/confirm` - Confirm withdrawal
   - Returns: `{ status: 'processing', txHash: null }`
4. `GET /api/v1/wallets/withdraw/:id/status` - Check withdrawal status
   - Returns: `{ status: 'completed', txHash: '0x...' }`

---

## 🚀 Development Roadmap

### **Phase 1: MVP (8-10 weeks)**
- [ ] Authentication (login, register, 2FA)
- [ ] User profile & settings
- [ ] Basic KYC flow
- [ ] Wallet system (crypto + fiat)
- [ ] Deposit/withdrawal (crypto only)
- [ ] Spot trading (5 pairs)
- [ ] Live price charts
- [ ] Transaction history

### **Phase 2: Enhanced Features (6-8 weeks)**
- [ ] Mobile Money integration (MTN, Vodafone)
- [ ] Bank transfer deposits
- [ ] Instant crypto converter
- [ ] Gift card marketplace (buy/sell)
- [ ] Referral program
- [ ] Push notifications
- [ ] Price alerts

### **Phase 3: Advanced Trading (6-8 weeks)**
- [ ] Futures trading
- [ ] Leverage options
- [ ] P2P marketplace
- [ ] Advanced charts (indicators)
- [ ] Trade copying [Optional]
- [ ] API for traders

### **Phase 4: Polish & Scale (4-6 weeks)**
- [ ] Performance optimization
- [ ] Security audit
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] App Store & Play Store submission
- [ ] Marketing & user acquisition

---

## 📦 Folder Structure

```
rfex-mobile/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Buttons, Cards, Inputs, etc.
│   │   ├── charts/          # TradingChart, LineChart, etc.
│   │   ├── wallet/          # WalletCard, TransactionItem
│   │   └── trading/         # OrderBook, TradeForm, PriceCard
│   │
│   ├── screens/             # App screens
│   │   ├── auth/            # Login, Register, OTP
│   │   ├── home/            # Dashboard, Market Overview
│   │   ├── markets/         # Markets List, Trading
│   │   ├── wallets/         # Wallets, Deposit, Withdraw
│   │   ├── profile/         # Profile, KYC, Settings
│   │   ├── p2p/             # P2P Trading, Chat
│   │   └── giftcards/       # Buy/Sell Gift Cards
│   │
│   ├── navigation/          # Navigation setup
│   │   ├── AuthNavigator.js
│   │   ├── MainNavigator.js
│   │   └── index.js
│   │
│   ├── redux/               # State management
│   │   ├── slices/          # userSlice, walletSlice, etc.
│   │   └── store.js
│   │
│   ├── services/            # API calls
│   │   ├── api.js           # Axios instance
│   │   ├── authService.js
│   │   ├── walletService.js
│   │   ├── tradingService.js
│   │   └── websocket.js
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useWebSocket.js
│   │   └── usePriceData.js
│   │
│   ├── utils/               # Helper functions
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   ├── theme/               # Design system
│   │   ├── colors.js
│   │   ├── typography.js
│   │   └── spacing.js
│   │
│   └── assets/              # Images, fonts, icons
│       ├── images/
│       ├── fonts/
│       └── icons/
│
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.js                   # Root component
├── package.json
└── README.md
```

---

## 🧪 Testing Strategy

### **Unit Tests**
- **Jest** for component testing
- Test utility functions (validators, formatters)
- Test Redux actions & reducers

### **Integration Tests**
- **React Native Testing Library** for screen testing
- Test user flows (login → trade → withdraw)

### **E2E Tests**
- **Detox** for end-to-end testing
- Test critical paths (registration, KYC, trading)

### **Performance**
- **Flipper** for debugging
- **React DevTools Profiler** for render optimization

---

## 📱 Push Notification Types

1. **Transaction Notifications**
   - Deposit confirmed
   - Withdrawal processed
   - Trade executed

2. **Trading Alerts**
   - Price target reached
   - Liquidation warning (futures)
   - Order filled

3. **Security Alerts**
   - New login detected
   - Withdrawal request
   - 2FA disabled

4. **P2P Updates**
   - P2P order matched
   - Payment received
   - Crypto released

5. **KYC & Account**
   - KYC approved/rejected
   - Account verification needed

6. **Marketing**
   - New features
   - Promotions & bonuses
   - Referral rewards

---

## 🌍 Localization

### **Supported Languages** (Phase 4)
- English (default)
- French (West Africa)
- Swahili (East Africa)
- Yoruba (Nigeria)
- Twi (Ghana)

### **Implementation**
- **i18next** or **react-i18next**
- Translation files in `src/locales/`
- Dynamic language switching

---

## 💰 Monetization

1. **Trading Fees**
   - Spot: 0.1% - 0.25% per trade
   - Futures: 0.02% maker, 0.05% taker
   - Volume-based discounts: >$1M monthly volume = 0.08%

2. **Withdrawal Fees**
   - Crypto: Network fees + 0.0005 BTC (or equivalent)
   - Fiat: 1% - 2%
   - Express withdrawal (1-hour processing): +0.5% fee

3. **Gift Card Commission**
   - 2% - 15% markup on cards
   - Vendor partnerships: negotiate bulk discounts

4. **P2P Service Fee**
   - 1% per transaction (split 0.5% buyer, 0.5% seller)
   - Escrow service fee included

5. **Premium Features** (Future)
   - API access: $50/month (10,000 requests/day)
   - Advanced analytics: $20/month
   - Priority support: $15/month

6. **Payment Processing Costs** (Expenses to account for)
   - **Paystack Fees:**
     - Local cards (Ghana/Nigeria): 1.95% + GHS 0.00 / NGN 0.00
     - International cards: 3.9% + GHS 0.00 / NGN 0.00
     - Mobile Money: 1.5% (capped at GHS 3.00 / NGN 100.00)
     - Bank transfer: Free (Ghana), 1.5% + NGN 100 (Nigeria)
   - **Flutterwave Fees:**
     - Local cards: 1.4%
     - International cards: 3.8%
     - Mobile Money: 1.4%
   - **Blockchain Network Fees:**
     - Bitcoin: ~$1-$5 per transaction (variable)
     - Ethereum: ~$2-$20 per transaction (variable)
     - USDT (TRC20): ~$1 per transaction
     - BNB (BSC): ~$0.20 per transaction
   - **SMS/OTP Costs:**
     - Twilio: $0.04 - $0.10 per SMS (Africa)
     - Africa's Talking: $0.02 - $0.06 per SMS
   - **Email Costs:**
     - SendGrid: Free for 100 emails/day, then $0.0001 per email
   - **Cloud Storage (S3):**
     - $0.023 per GB/month (first 50 TB)
     - GET requests: $0.0004 per 1,000 requests
   - **Server Costs:**
     - AWS EC2: ~$50-$500/month depending on load
     - Database (RDS PostgreSQL): ~$50-$300/month
     - Redis (ElastiCache): ~$30-$150/month

---

## 📞 Support & Contact

**Email:** support@rfex.app  
**Technical Support:** tech@rfex.app  
**Business Inquiries:** business@rfex.app  
**GitHub:** [giftyarhin/RF-EXCHANGE](https://github.com/giftyarhin/RF-EXCHANGE)  
**Website:** https://rfex.app  

---

## 📄 License

MIT License - See LICENSE file for details

---

## ✅ Implementation Checklist

### **Pre-Development**
- [ ] Set up React Native project (Expo or bare)
- [ ] Configure ESLint + Prettier
- [ ] Set up Git repository with branch protection
- [ ] Create Figma designs (UI/UX)
- [ ] Set up Firebase project (push notifications)
- [ ] Domain registration (rfex.app)
- [ ] SSL certificates (Let's Encrypt or AWS ACM)

### **Backend Setup**
- [ ] Initialize Node.js + Express server
- [ ] Set up PostgreSQL database (with replication)
- [ ] Configure Redis for caching
- [ ] Implement JWT authentication
- [ ] Set up WebSocket server (Socket.io)
- [ ] Integrate payment APIs (Paystack, Flutterwave)
- [ ] Integrate crypto APIs (CoinGecko, Binance)
- [ ] Set up API gateway (rate limiting, authentication)
- [ ] Configure database migrations (Sequelize/TypeORM/Prisma)
- [ ] Set up background job processing (Bull/BullMQ)

### **Frontend Development**
- [ ] Authentication screens (Login, Register, OTP)
- [ ] Bottom tab navigation
- [ ] Home screen (dashboard)
- [ ] Wallet screens (list, details, deposit, withdraw)
- [ ] Spot trading interface
- [ ] Futures trading interface
- [ ] Crypto converter
- [ ] P2P marketplace
- [ ] Gift card marketplace
- [ ] Referral program UI
- [ ] Profile & settings
- [ ] KYC flow
- [ ] Push notification handling
- [ ] Deep linking implementation
- [ ] Offline mode support
- [ ] Light/dark theme toggle

### **Infrastructure**
- [ ] Set up cloud infrastructure (AWS/GCP/Azure)
- [ ] Configure load balancer (ALB/ELB or Nginx)
- [ ] Set up CDN (CloudFront, Cloudflare)
- [ ] Database backups with two-tier policy:
  - [ ] Hot backups: Automated daily backups, 30-day retention (RDS automated backups)
  - [ ] Cold backups: Weekly encrypted snapshots to S3 Glacier, 7-year retention (compliance)
  - [ ] Disaster Recovery targets: RPO ≤ 15 minutes (point-in-time recovery), RTO ≤ 4 hours
- [ ] Set up monitoring (CloudWatch, Datadog, New Relic)
- [ ] Configure logging (ELK stack or CloudWatch Logs)
- [ ] Set up alerting (PagerDuty, Opsgenie)
- [ ] Disaster recovery plan documentation
- [ ] Auto-scaling configuration (EC2 Auto Scaling Groups)
- [ ] Multi-region failover setup (optional for Phase 4)

### **Security**
- [ ] Implement rate limiting (express-rate-limit)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (helmet, CSP headers)
- [ ] CSRF protection (csurf)
- [ ] Input validation & sanitization
- [ ] Set up WAF (Web Application Firewall)
- [ ] Configure DDoS protection (Cloudflare, AWS Shield)
- [ ] Implement encryption at rest (database, S3)
- [ ] Implement encryption in transit (TLS 1.3)
- [ ] Set up secrets management (AWS Secrets Manager, HashiCorp Vault)
- [ ] Cold wallet setup for crypto storage:
  - [ ] Hardware wallets: Ledger Nano X (primary) + Trezor Model T (backup)
  - [ ] Storage policy: 95% of user funds in cold storage, 5% in hot wallets for liquidity
  - [ ] Geographic distribution: 3 physical locations (US, EU, Asia) with tamper-evident seals
  - [ ] Access control: 2-of-3 multi-signature requirement for withdrawals >$100K
- [ ] Multi-signature wallet configuration:
  - [ ] Bitcoin: P2WSH 2-of-3 multi-sig (SegWit native)
  - [ ] Ethereum: Gnosis Safe 3-of-5 multi-sig contract (0x...)
  - [ ] Signatory roles: CEO, CTO, CFO, Head of Security, External Custodian
  - [ ] Time-locked recovery: 7-day delay for configuration changes
- [ ] Security audit by third party:
  - [ ] Smart contract audit: Trail of Bits or OpenZeppelin (for multi-sig contracts)
  - [ ] Infrastructure audit: Cure53 or NCC Group (backend, database, API)
  - [ ] Re-audit schedule: Quarterly for critical components, annually for full system
- [ ] Penetration testing:
  - [ ] Annual penetration test by certified firm (e.g., Offensive Security, Synack)
  - [ ] Scope: Web app, mobile app, API, infrastructure, social engineering
  - [ ] Remediation SLA: Critical (24h), High (7 days), Medium (30 days)
- [ ] Bug bounty program setup:
  - [ ] Platform: HackerOne (preferred) or Bugcrowd
  - [ ] Rewards: $100 (Low) to $25,000 (Critical, with proof of fund loss)
  - [ ] Scope: All production systems (exclude staging/dev environments)
  - [ ] Out-of-scope: DoS attacks, social engineering, physical security
  - [ ] Private program: First 6 months, then public launch

### **Testing**
- [ ] Unit tests for utilities (Jest)
- [ ] Integration tests for key flows (React Native Testing Library)
- [ ] E2E tests (Detox)
- [ ] API endpoint tests (Postman/Newman, Supertest)
- [ ] Load testing (Apache JMeter, k6)
- [ ] Security testing (OWASP ZAP)
- [ ] Accessibility testing (WCAG compliance)
- [ ] Cross-device testing (iOS/Android, multiple screen sizes)

### **Operations**
- [ ] Set up CI/CD pipeline (GitHub Actions, GitLab CI, CircleCI)
- [ ] Automated deployment to staging environment
- [ ] Blue-green deployment strategy
- [ ] Database migration automation
- [ ] Health check endpoints (/health, /ready)
- [ ] Incident response plan
- [ ] On-call rotation schedule
- [ ] Runbook documentation for common issues
- [ ] Performance monitoring (APM)
- [ ] Error tracking (Sentry, Rollbar)
- [ ] User analytics (Mixpanel, Amplitude)
- [ ] A/B testing framework (optional)

### **Compliance & Legal**
- [ ] Privacy policy documentation
- [ ] Terms of service
- [ ] KYC/AML compliance procedures
- [ ] GDPR compliance (for EU users)
- [ ] Cookie consent mechanism
- [ ] Data retention & deletion policies
- [ ] Financial licensing applications (if required)
- [ ] Tax reporting setup

### **Deployment**
- [ ] iOS App Store submission
  - [ ] App Store screenshots & preview video
  - [ ] App Store description & keywords
  - [ ] App review process
- [ ] Android Play Store submission
  - [ ] Play Store screenshots & feature graphic
  - [ ] Play Store description & keywords
  - [ ] Play Store review process
- [ ] Backend deployment (AWS, DigitalOcean, etc.)
- [ ] Database migration to production
- [ ] DNS configuration
- [ ] SSL certificate installation
- [ ] CDN setup & configuration
- [ ] Production smoke testing
- [ ] Performance baseline measurement

### **Post-Launch**
- [ ] Monitor error rates & performance
- [ ] User feedback collection
- [ ] App Store optimization (ASO)
- [ ] Marketing campaign launch
- [ ] Customer support team training
- [ ] Community building (Discord, Telegram)
- [ ] Social media presence (Twitter, Facebook, Instagram)
- [ ] Referral program activation
- [ ] Partnership outreach (payment processors, exchanges)

---

**Built with ❤️ for Africa | RFEX 2026**
