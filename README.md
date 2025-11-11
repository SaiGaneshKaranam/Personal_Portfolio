# Personal_Portfolio# 📈 Upstox Portfolio Tracker

A full-stack React + Node.js application that connects to your Upstox trading account and displays your live stock holdings with automatic updates, authentication, and clean UI.

---

## 🚀 Features

- 🔐 Secure OAuth Login with Upstox Developer API  
- 📊 Real-time Holdings Dashboard — quantity, PnL, prices  
- 🧮 Automatic P&L Calculation for each stock  
- 🧱 Full TypeScript Support (frontend + backend)  
- ⚡ Express + Axios backend proxy (no CORS issues)  
- 🧰 Environment-based config for secrets and keys  
- 💻 Modular Structure for future enhancements (taxes, Excel export, US stocks, etc.)

---

## 🏗️ Project Structure

Personal_Portfolio/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── upstoxService.ts
│   │   ├── components/
│   │   │   ├── LoginButton.tsx
│   │   │   └── HoldingsTable.tsx
│   │   ├── types/
│   │   │   └── Holding.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│
└── README.md

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (TypeScript), Axios |
| Backend | Node.js, Express, Dotenv, CORS |
| Auth | Upstox OAuth 2.0 |
| Styling | Basic CSS / Inline Styles |
| API Data | Upstox /v2/portfolio/long-term-holdings |
| Future | Excel Export, Tax Calculation, Live Price WebSocket |

---

## 🔑 Environment Variables (Backend)

Create a `.env` file inside the `backend` folder:

UPSTOX_API_KEY=your_upstox_api_key
UPSTOX_API_SECRET=your_upstox_api_secret
UPSTOX_REDIRECT_URI=http://localhost:5000/auth/callback
UPSTOX_BASE_URL=https://api.upstox.com
PORT=5000

---

## 🧩 Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/<your-username>/Personal_Portfolio.git
cd Personal_Portfolio

### 2️⃣ Backend Setup
cd backend
npm install
npm start
✅ Runs on http://localhost:5000

---

### 3️⃣ Frontend Setup
cd ../frontend
npm install
npm start
✅ Runs on http://localhost:3000

---

## 🔐 Authentication Flow

1. Click "Login with Upstox" on the homepage  
2. You’ll be redirected to Upstox login page  
3. After granting access, Upstox redirects to your backend /auth/callback  
4. Backend exchanges code → access token → redirects to frontend  
5. Frontend stores token in localStorage and loads holdings

---

## 🧾 API Endpoints

| Endpoint | Description |
|-----------|--------------|
| /auth/callback | Handles Upstox OAuth token exchange |
| /api/holdings | Fetches holdings from Upstox Portfolio API |
| /api/quote/:symbol | Fetches live quote for a specific symbol (future scope) |

---

## 📊 Example Response (Holdings)

{
  "isin": "INF109KC1NT3",
  "company_name": "ICICI PRUDENTIAL GOLD ETF",
  "tradingsymbol": "GOLDIETF",
  "exchange": "NSE",
  "quantity": 39,
  "average_price": 95.54,
  "last_price": 105.17,
  "pnl": 375.38,
  "day_change_percentage": 1.88
}

---

## 🧠 Future Enhancements

- 💸 Tax & Fee breakdown for each transaction  
- 📤 Export to Excel (via xlsx library)  
- 📈 Live quote updates using Upstox WebSocket  
- 🌙 Material-UI / Tailwind UI redesign  
- 🌍 US Stocks (INDmoney API) integration  
- 🔁 Token refresh & session expiry handling  

---

## 🧑‍💻 Author

Karanam Ganesh  
GitHub: https://github.com/SaiGaneshKaranam

---

## 🪪 License

This project is licensed under the MIT License.

---

⭐ If you found this useful, consider starring the repo on GitHub!
