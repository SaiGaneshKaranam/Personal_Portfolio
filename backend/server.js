
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.UPSTOX_BASE_URL;

// ----------- ROUTES -------------

// ✅ 1. Health check
app.get("/", (req, res) => {
  res.send("✅ Upstox Portfolio Backend is running...");
});

// ✅ 2. Get access token (after login redirect)
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Missing code");

  try {
    const response = await axios.post(`${BASE_URL}/login/authorization/token`, qs.stringify({
      code, // not object, just string
      client_id: process.env.UPSTOX_API_KEY,
      client_secret: process.env.UPSTOX_API_SECRET,
      redirect_uri: process.env.UPSTOX_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
);

    const { access_token } = response.data;
    res.redirect(`http://localhost:3000?token=${access_token}`);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Token exchange failed");
  }
});

// ✅ 3. Fetch holdings
app.get("/api/holdings", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Missing access token");

  try {
    const response = await axios.get(`${BASE_URL}/portfolio/long-term-holdings`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error fetching holdings");
  }
});

// ✅ 4. Fetch live quote for a stock
app.get("/api/quote/:symbol", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { symbol } = req.params;
  if (!token) return res.status(401).send("Missing access token");

  try {
    const response = await axios.get(`${BASE_URL}/market-quote/${symbol}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error fetching quote");
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
