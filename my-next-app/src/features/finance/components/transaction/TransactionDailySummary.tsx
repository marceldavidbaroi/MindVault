"use client";

import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import { TrendingUp, TrendingDown, CalendarToday } from "@mui/icons-material";
import ScrollContainer from "@/components/ScrollContainer";
import { useTransactions } from "@/features/finance/hooks/transactionsAuth";
import { useTransactionsStore } from "../../store/transactionsStore";

export default function DailySummary() {
  const { dailySummary } = useTransactions();
  const [summary, setSummary] = useState<any>(null);
  const transactionStore = useTransactionsStore();

  useEffect(() => {
    const getSummary = async () => {
      const query = {
        startDate: new Date().toISOString().split("T")[0], // 'YYYY-MM-DD'
        detailLevel: "daily",
      };
      const response = await dailySummary(query);
      setSummary(response);
    };

    getSummary();
  }, [transactionStore.transactionList]);

  const dailyData = summary?.dailySummaries?.[0];
  const monthlyData = summary?.monthlySummaries?.[0];
  const yearlyData = summary?.yearlySummary;

  // ✅ Build cards dynamically
  const cardData = [
    {
      title: "Today",
      subtitle: dailyData?.date ?? "—",
      income: parseFloat(dailyData?.totalIncome ?? 0),
      expense: parseFloat(dailyData?.totalExpense ?? 0),
      icon: <CalendarToday fontSize="small" />,
    },
    {
      title: "This Month",
      subtitle: monthlyData ? `${monthlyData.month}/${monthlyData.year}` : "—",
      income: parseFloat(monthlyData?.totalIncome ?? 0),
      expense: parseFloat(monthlyData?.totalExpense ?? 0),
      icon: <TrendingUp fontSize="small" />,
    },
    {
      title: "This Year",
      subtitle: yearlyData?.year ?? "—",
      income: parseFloat(yearlyData?.totalIncome ?? 0),
      expense: parseFloat(yearlyData?.totalExpense ?? 0),
      icon: <TrendingDown fontSize="small" />,
    },
  ];

  return (
    <ScrollContainer
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 1.5,
        height: "100%",
        overflowX: { xs: "auto", md: "visible" },
        overflowY: "hidden",
        pb: { xs: 1, md: 0 },
      }}
    >
      {cardData.map((item, idx) => (
        <Card
          key={idx}
          sx={{
            flex: { xs: "0 0 160px", md: "none" },
            width: { xs: "160px", md: "100%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 1.5,
            borderRadius: 2,
            bgcolor: "background.paper",
            color: "primary.main",
            minHeight: { xs: 100, md: 90 },
            flexShrink: 0,
            boxSizing: "border-box",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          {/* Title + Icon */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
          >
            {item.icon}
            <Typography variant="subtitle2" fontWeight="bold">
              {item.title}
            </Typography>
          </Box>

          {/* Subtitle (date/month/year) */}
          <Typography variant="caption" sx={{ opacity: 0.7, mb: 0.5 }}>
            {item.subtitle}
          </Typography>

          {/* Income / Expense */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2" color="success.main" fontWeight="bold">
              +{item.income}
            </Typography>
            <Typography variant="body2" color="error.main" fontWeight="bold">
              -{item.expense}
            </Typography>
          </Box>
        </Card>
      ))}
    </ScrollContainer>
  );
}
