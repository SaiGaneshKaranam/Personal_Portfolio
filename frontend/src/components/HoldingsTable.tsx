import React, { useEffect, useState, useMemo } from "react";
import { getHoldings } from "../api/upstoxService";
import { Holding } from "../types/Holding";
import HoldingCard from "./HoldingCard";
import { ToggleButton, ToggleButtonGroup, Box, Typography, Tooltip, IconButton } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowUpward, ArrowDownward, Sort } from "@mui/icons-material";



const HoldingsTable: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof Holding>("pnl");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [view, setView] = useState<"list" | "grid">("grid");

  useEffect(() => {
    const savedToken = localStorage.getItem("upstox_token");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchHoldings = async () => {
      try {
        const data = await getHoldings(token);
        setHoldings(data.data ?? data);
      } catch (err) {
        console.error("Error fetching holdings:", err);
      }
    };
    fetchHoldings();
    const interval = setInterval(fetchHoldings, 15000);
    return () => clearInterval(interval);
  }, [token]);

  const filteredAndSorted = useMemo(() => {
    const filtered = holdings.filter(
      (h) =>
        h.company_name.toLowerCase().includes(search.toLowerCase()) ||
        h.tradingsymbol?.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return sorted;
  }, [holdings, search, sortKey, sortOrder]);

  const handleSort = (key: keyof Holding) => {
    setSortKey(key);
  };

  if (!token)
    return <p style={{ textAlign: "center" }}>Please log in to fetch holdings.</p>;

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "95%",
        margin: "0 auto",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* ==== HEADER SECTION ==== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          py: 2,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#1e293b",
          }}
        >
          📊 My Upstox Holdings
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
          Stay updated with your live portfolio performance
        </Typography>
      </Box>

      {/* ==== CONTROL BAR ==== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 3,
          px: 1,
        }}
      >
        {/* 🔍 Search Field (MUI Icon) */}
        <Box
          sx={{
            flex: "1 1 250px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            maxWidth: 280,
          }}
        >
          <SearchIcon
            sx={{
              position: "absolute",
              left: 10,
              color: "#9ca3af",
              fontSize: 20,
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 34px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
              backgroundColor: "#fff",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.border = "1px solid #6366f1")}
            onBlur={(e) => (e.currentTarget.style.border = "1px solid #e5e7eb")}
          />
        </Box>



        {/* 🔽 Sort Filter Box */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "#fff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            padding: "6px 10px",
            transition: "all 0.2s ease",
            "&:hover": { boxShadow: "0 0 0 2px #eef2ff" },
          }}
        >
          {/* Sort Dropdown */}
          <select
            value={sortKey}
            onChange={(e) => handleSort(e.target.value as keyof Holding)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "14px",
              color: "#374151",
              outline: "none",
              cursor: "pointer",
              flexGrow: 1,
            }}
          >
            <option value="pnl">Sort by P&L</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="average_price">Sort by Avg Price</option>
            <option value="day_change_percentage">Sort by Day %</option>
          </select>

          {/* Asc/Desc Toggle */}
          <Tooltip title={sortOrder === "asc" ? "Ascending" : "Descending"} arrow>
            <IconButton
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              size="small"
              sx={{
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* 🧭 View Toggle */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => val && setView(val)}
          sx={{
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            height: 36,
          }}
        >
          <ToggleButton
            value="list"
            sx={{
              border: "none",
              px: 2.2,
              py: 0.6,
              color: view === "list" ? "#2563eb" : "#6b7280",
              fontWeight: 500,
              transition: "all 0.2s ease",
              "&.Mui-selected": {
                backgroundColor: "#e0e7ff",
                color: "#1e3a8a",
              },
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            <ViewListIcon
              sx={{
                fontSize: 20,
                mr: 0.5,
                verticalAlign: "middle",
              }}
            />
            List
          </ToggleButton>

          <ToggleButton
            value="grid"
            sx={{
              border: "none",
              px: 2.2,
              py: 0.6,
              color: view === "grid" ? "#2563eb" : "#6b7280",
              fontWeight: 500,
              transition: "all 0.2s ease",
              "&.Mui-selected": {
                backgroundColor: "#e0e7ff",
                color: "#1e3a8a",
              },
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            <GridViewIcon
              sx={{
                fontSize: 20,
                mr: 0.5,
                verticalAlign: "middle",
              }}
            />
            Grid
          </ToggleButton>
        </ToggleButtonGroup>

      </Box>


      {/* View Switcher */}
      {view === "list" ? (
        // ---------- LIST VIEW (Table) ----------

        <div
          style={{
            overflowX: "auto",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            background: "#ffffff",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
              minWidth: "900px",
            }}
          >
            {/* Sticky Header */}
            <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#f9fafb" }}>
              <tr style={{ textAlign: "center", borderBottom: "2px solid #e5e7eb" }}>
                {[
                  { key: "company_name", label: "Company" },
                  { key: "tradingsymbol", label: "Symbol" },
                  { key: "exchange", label: "Exchange" },
                  { key: "quantity", label: "Qty" },
                  { key: "average_price", label: "Avg Price" },
                  { key: "last_price", label: "Last Price" },
                  { key: "pnl", label: "P&L" },
                  { key: "day_change_percentage", label: "Day %" },
                  { key: "collateral_type", label: "Collateral" },
                  { key: "product", label: "Product" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key as keyof Holding)}
                    style={{
                      padding: "12px 8px",
                      cursor: "pointer",
                      color: sortKey === key ? "#1e40af" : "#374151",
                      background: sortKey === key ? "#f1f5ff" : "inherit",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #e5e7eb",
                      userSelect: "none",
                    }}
                  >
                    {label}
                    {sortKey === key && (
                      <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredAndSorted.map((h, idx) => (
                <tr
                  key={h.isin}
                  style={{
                    textAlign: "center",
                    background: idx % 2 === 0 ? "#ffffff" : "#f9fafb",
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.2s ease, transform 0.1s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#eef2ff";
                    e.currentTarget.style.transform = "scale(1.002)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      idx % 2 === 0 ? "#ffffff" : "#f9fafb";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <td
                    style={{
                      padding: "10px 6px",
                      fontWeight: 600,
                      color: "#111827",
                      textAlign: "left",
                    }}
                  >
                    {h.company_name}
                  </td>
                  <td>{h.tradingsymbol}</td>
                  <td>{h.exchange}</td>
                  <td>{h.quantity}</td>
                  <td>₹{h.average_price?.toFixed(2) ?? "0.00"}</td>
                  <td>₹{h.last_price?.toFixed(2) ?? "0.00"}</td>
                  <td
                    style={{
                      color: h.pnl >= 0 ? "#16a34a" : "#dc2626",
                      fontWeight: 600,
                    }}
                  >
                    ₹{h.pnl?.toFixed(2) ?? "0.00"}
                  </td>
                  <td
                    style={{
                      color: h.day_change_percentage >= 0 ? "#16a34a" : "#dc2626",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {h.day_change_percentage?.toFixed(2) ?? "0.00"}%
                    {h.day_change_percentage >= 0 ? "▲" : "▼"}
                  </td>
                  <td>{h.collateral_type}</td>
                  <td>{h.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      ) : (
        // ---------- GRID VIEW (Cards) ----------
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          {filteredAndSorted.map((holding) => (
            <div
              key={holding.isin}
              style={{
                flex: "1 1 300px",
                maxWidth: "320px",
              }}
            >
              <HoldingCard data={holding} />
            </div>
          ))}
        </div>
      )}

      {filteredAndSorted.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#6b7280",
          }}
        >
          No holdings match your search.
        </p>
      )}
    </div>
  );
};

export default HoldingsTable;
