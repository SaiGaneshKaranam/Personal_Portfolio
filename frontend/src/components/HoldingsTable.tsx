import React, { useEffect, useState } from "react";
import { getHoldings } from "../api/upstoxService";
import { Holding } from "../types/Holding";


const HoldingsTable: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [token, setToken] = useState<string>("");

  // Temporary: enter token manually (later we’ll automate this)
  useEffect(() => {
    const savedToken = localStorage.getItem("upstox_token");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchHoldings = async () => {
      try {
        const data = await getHoldings(token);
        setHoldings(data.data); // adjust based on API response structure
      } catch (err) {
        console.error("Error fetching holdings:", err);
      }
    };

    fetchHoldings();

    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchHoldings, 15000);
    return () => clearInterval(interval);
  }, [token]);

  if (!token)
    return <p style={{ textAlign: "center" }}>Please log in to fetch holdings.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>📊 My Upstox Holdings</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
  <tr style={{ background: "#f0f0f0" }}>
    <th>Company</th>
    <th>Symbol</th>
    <th>Exchange</th>
    <th>Qty</th>
    <th>Avg Price</th>
    <th>Last Price</th>
    <th>PnL</th>
    <th>Day %</th>
    <th>Collateral</th>
    <th>Product</th>
  </tr>
</thead>
        <tbody>
  {holdings.map((h) => (
    <tr key={h.isin} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
      <td>{h.company_name}</td>
      <td>{h.tradingsymbol || h.trading_symbol}</td>
      <td>{h.exchange}</td>
      <td>{h.quantity}</td>
      <td>₹{h.average_price?.toFixed(2) ?? "0.00"}</td>
      <td>₹{h.last_price?.toFixed(2) ?? "0.00"}</td>
      <td
        style={{
          color: h.pnl >= 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        ₹{h.pnl?.toFixed(2) ?? "0.00"}
      </td>
      <td
        style={{
          color: h.day_change_percentage >= 0 ? "green" : "red",
        }}
      >
        {h.day_change_percentage?.toFixed(2) ?? "0.00"}%
      </td>
      <td>{h.collateral_type}</td>
      <td>{h.product}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default HoldingsTable;
