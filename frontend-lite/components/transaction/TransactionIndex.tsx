"use client";
import FinancialSummaryCard from "@/components/transaction/FinancialSummaryCard";
import TransactionTableMini from "@/components/transaction/TransactionTableMini";
import WeeklySpendingCard from "@/components/transaction/WeeklySpendingCard";
import { fetcher } from "@/lib/fetcher";
import { useSummaryStore } from "@/store/summaryStore";
import { cookies } from "next/headers";

import React, { useEffect } from "react";
import FinancialSummaryCardSkeleton from "./skeleton/FinancialSummaryCardSkeleton";
import WeeklySpendingCardSkeleton from "./skeleton/WeeklySpendingCardSkeleton";

export const summaryDummyData: FinancialSummaryCardProps["data"][] = [
  {
    title: "Today",
    type: "today",
    income: 1200,
    expense: 800,
    prevIncome: 1000,
    prevExpense: 700,
  },

  {
    title: "This Month",
    type: "month",
    income: 15000,
    expense: 12000,
    prevIncome: 13000,
    prevExpense: 11000,
  },
  {
    title: "This Year",
    type: "year",
    income: 120000,
    expense: 95000,
    prevIncome: 100000,
    prevExpense: 90000,
  },
];

const sampleData = [
  {
    id: "1",
    date: "2025-10-13",
    category: "Food",
    description: "Lunch at Cafe Rio",
    amount: "$12.50",
  },
  {
    id: "2",
    date: "2025-10-12",
    category: "Transport",
    description: "Bus ticket",
    amount: "$2.00",
  },
];

const TransactionIndex = ({ data }) => {
  const { transactionsDashboard, setTransactionDashboard } = useSummaryStore();

  useEffect(() => {
    // ✅ Set new data into Zustand store when component mounts or when `data` changes
    setTransactionDashboard(data);
  }, [data, setTransactionDashboard]);

  useEffect(() => {
    console.log("Updated store:", transactionsDashboard);
  }, [transactionsDashboard]);
  return (
    <div className="min-h-[70vh] p-4">
      {/* <pre>{JSON.stringify(transactionsDashboard, null, 2)}</pre> */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* LEFT SIDE */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
          {/* Top row: summary cards */}
          <div
            className="
     flex overflow-x-auto px-2 py-2 gap-4 snap-x snap-mandatory
    scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-white/10
    scrollbar-thumb-rounded-full
    hover:scrollbar-thumb-gray-600
    transition-colors duration-200
    [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar-track]:bg-white/10
    [&::-webkit-scrollbar-thumb]:bg-gray-700
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb:hover]:bg-gray-600
  "
          >
            {transactionsDashboard.summary.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 snap-start min-w-[250px]"
                  >
                    <FinancialSummaryCardSkeleton />
                  </div>
                ))
              : transactionsDashboard.summary.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 snap-start min-w-[250px]"
                  >
                    <FinancialSummaryCard data={item} />
                  </div>
                ))}
          </div>

          {/* Bottom: transaction table */}
          <div className="flex-1 overflow-auto">
            <TransactionTableMini
              data={transactionsDashboard.recentTransactions}
              loading={transactionsDashboard.recentTransactions.length === 0} // show skeleton if empty
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          {transactionsDashboard.weekly ? (
            <WeeklySpendingCard
              totalRemainingIncomeAllTime={
                transactionsDashboard.totalRemainingIncomeAllTime
              }
              totalRemainingIncomeThisMonth={
                transactionsDashboard.totalRemainingIncomeThisMonth
              }
              weekly={transactionsDashboard.weekly}
            />
          ) : (
            <WeeklySpendingCardSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionIndex;
