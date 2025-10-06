"use client";
import React, { useEffect } from "react";
import { useTransactions } from "../../hooks/transactionsAuth";
import { DetailLevel } from "../../types/Transaction.type";

const DailySummary = () => {
  const { dailySummary } = useTransactions();

  useEffect(() => {
    const getSummary = async () => {
      const query = {
        date: new Date(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        detailLevel: "daily" as DetailLevel,
      };
      const response = await dailySummary(query);
      console.log(response);
    };

    getSummary();
  }, []);
  return <div>Summary</div>;
};

export default DailySummary;
