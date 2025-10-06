"use client";
import React, { useEffect } from "react";
import { useTransactions } from "../../hooks/transactionsAuth";

const DailySummary = () => {
  const { dailySummary } = useTransactions();

  useEffect(() => {
    const getSummary = async () => {
      const query = {
        startDate: new Date().toISOString().split("T")[0], // 'YYYY-MM-DD'
        detailLevel: "daily",
      };
      const response = await dailySummary(query);
      console.log(response);
    };

    getSummary();
  }, []);
  return <div>Summary</div>;
};

export default DailySummary;
