RF Exchange 🚀

THE NAME OF THE WEBSITE IS RFEX

A Binance/Bybit-inspired crypto trading platform with African payment support (banks & mobile money), KYC verification, spot & futures trading, crypto conversion, fiat selection, and gift card marketplace.

PROJECT OVERVIEW
NexaX Exchange is a full-stack cryptocurrency exchange platform designed to support:
- Spot & Futures trading
- Instant crypto conversion
- Fiat currency switching (GHS, USD, EUR, NGN, etc.)
- KYC verification
- Crypto + Bank + Mobile Money deposits
- Gift card buy & sell system

FEATURES
User Accounts:
- Register & Login
- Two-Factor Authentication (2FA)
- Profile management
- Fiat currency selector

KYC:
- Upload ID (Passport / Ghana Card / Driver’s License)
- Selfie verification
- Admin approval
- Restricted access before verification

Wallet System:
- Crypto wallets (BTC, ETH, USDT, etc.)
- Fiat wallet (GHS, USD, EUR)
- Deposit & Withdraw
- Transaction history

Trading:
Spot Trading:
- Market & Limit orders
- Trading pairs (BTC/USDT, ETH/USDT, etc.)

Futures Trading:
- Long & Short positions
- Leverage (5x, 10x, 20x)
- Liquidation engine
- PnL calculation

Convert:
- Crypto-to-crypto instant conversion

Payments:
- Bank transfers
- Mobile Money (MTN, Vodafone, AirtelTigo)
- Crypto deposits

Gift Cards:
- Buy gift cards (Amazon, Steam, Apple, Google Play)
- Sell gift cards for crypto or fiat
- Upload code or image
- Admin verification

Security:
- Encrypted passwords
- Cold wallet storage
- 2FA
- Withdrawal confirmation
- Anti-fraud checks

System Architecture:
Frontend → Backend API → Database → Blockchain Nodes & Payment Gateways

Tech Stack:
Frontend: React.js, Tailwind CSS
Backend: Node.js (Express.js)
Database: PostgreSQL
Blockchain: Web3.js, Ethereum, BSC
Payments: Paystack, Flutterwave

License: MIT License

---

Website / Preview
------------------

I created a small, unique static site based on this README to showcase RFEX. Files added:

- `index.html` — the homepage (hero, features, trading, payments, gift cards, tech stack, contact)
- `assets/css/styles.css` — handcrafted responsive stylesheet with an African-accent palette
- `assets/js/main.js` — tiny interactions (mobile nav, simple input feedback)

To preview locally (from the project root) run a simple static server and open http://localhost:8000:

```bash
# using Python 3 built-in server
python3 -m http.server 8000

# then open http://localhost:8000 in your browser
```

Or open `index.html` directly in your browser for a static preview.

Notes
-----

- This is a static prototype to visualize RFEX's core flows and messaging. It is intentionally simple and framework-free so you can iterate fast.
- Next steps: convert to a React + Tailwind app, add real authentication/KYC flows, wire the backend, and integrate payment gateways (Paystack/Flutterwave).

Enjoy exploring RFEX!
