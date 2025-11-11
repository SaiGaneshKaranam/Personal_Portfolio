import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  TrendingUp,
  TrendingDown,
  CurrencyRupee,
} from "@mui/icons-material";
import { Holding } from "../types/Holding";

interface HoldingCardProps {
  data: Holding;
}

const HoldingCard: React.FC<HoldingCardProps> = ({ data }) => {
  const positive = data.day_change_percentage >= 0;

  return (
    <Card
      sx={{
        width: 320,
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 4,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* 🔹 Accent Color Bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          backgroundColor: positive ? "#22c55e" : "#ef4444",
        }}
      />

      <CardContent
        sx={{
          padding: "18px 20px 16px 26px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Company Title */}
        <Tooltip title={data.company_name} arrow>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#111827",
            }}
          >
            {data.company_name}
          </Typography>
        </Tooltip>

        {/* Symbol + Exchange */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: 0.2,
          }}
        >
          {data.tradingsymbol} • {data.exchange}
        </Typography>

        {/* Quantity + Average */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.8,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Qty: <b>{data.quantity}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avg: ₹{data.average_price?.toFixed(2)}
          </Typography>
        </Box>

        {/* Last Price + Day % */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Last: ₹{data.last_price?.toFixed(2)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: positive ? "#16a34a" : "#dc2626",
              fontWeight: 600,
            }}
          >
            {positive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
            {data.day_change_percentage?.toFixed(2)}%
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: data.pnl > 0 ? "#16a34a" : "#dc2626",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CurrencyRupee sx={{ fontSize: "16px" }} />
            {data.pnl?.toFixed(2) ?? "0.00"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.85rem",
              textAlign: "right",
            }}
          >
            {data.product} • {data.collateral_type || "No Collateral"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HoldingCard;
