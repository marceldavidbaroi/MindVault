"use client";

import { useEffect } from "react";
import { Card, Typography, Box } from "@mui/material";
import { AttachMoney, TrendingUp, TrendingDown } from "@mui/icons-material";
import { useCategory } from "@/features/finance/hooks/categoryAuth";
import { useCategoryStore } from "@/features/finance/store/categoryStore";
import ScrollContainer from "@/components/ScrollContainer"; // ✅ reuse custom scroll

export default function CategoryStatsCards() {
  const categoryStore = useCategoryStore();
  const { getStats } = useCategory();

  const fetchCategoryStats = async () => {
    const response = await getStats();
  };

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  const stats = categoryStore.categoryStatus;

  const cardData = [
    {
      title: "Total",
      value: stats?.total ?? 0,
      icon: <AttachMoney fontSize="small" />,
    },
    {
      title: "Income",
      value: stats?.income.total ?? 0,
      details: stats?.income
        ? [
            { label: "S", val: stats.income.system },
            { label: "U", val: stats.income.user },
          ]
        : [],
      icon: <TrendingUp fontSize="small" />,
    },
    {
      title: "Expense",
      value: stats?.expense.total ?? 0,
      details: stats?.expense
        ? [
            { label: "S", val: stats.expense.system },
            { label: "U", val: stats.expense.user },
          ]
        : [],
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
        overflowX: { xs: "auto", md: "visible" }, // ✅ horizontal scroll on small screens
        overflowY: "hidden",
        pb: { xs: 1, md: 0 },
      }}
    >
      {cardData.map((item, idx) => (
        <Card
          key={idx}
          sx={{
            flex: { xs: "0 0 150px", md: "none" }, // ✅ equal width for horizontal scroll
            width: { xs: "150px", md: "100%" },
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
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
          >
            {item.icon}
            <Typography variant="subtitle2" fontWeight="bold">
              {item.title}
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold">
            {item.value}
          </Typography>

          {item.details && (
            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
              {item.details.map((d, i) => (
                <Typography key={i} variant="caption" sx={{ opacity: 1 }}>
                  {d.label}:{d.val}
                </Typography>
              ))}
            </Box>
          )}
        </Card>
      ))}
    </ScrollContainer>
  );
}
