import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

// Fetch portfolio holdings
export const getHoldings = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/holdings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching holdings:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch live quote for a symbol
export const getQuote = async (symbol: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/quote/${symbol}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching quote:", error.response?.data || error.message);
    throw error;
  }
};
