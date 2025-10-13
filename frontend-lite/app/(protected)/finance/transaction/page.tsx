import FinancialSummaryCard from "@/components/transaction/FinancialSummaryCard";
import TransactionTableMini from "@/components/transaction/TransactionTableMini";
import WeeklySpendingCard from "@/components/transaction/WeeklySpendingCard";
import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

import React from "react";

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

const TransactionIndex = async () => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const data = await fetcher("/summary/transaction-dashboard", {
    method: "GET",
    headers: {
      cookie: cookieHeader, // forward cookies to backend
    },
    cache: "no-store",
  });

  console.log(data);
  return (
    <div className="min-h-[70vh] p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* LEFT SIDE */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
          {/* Top row: summary cards */}
          <div className="flex overflow-x-auto px-2 py-2 gap-4 scrollbar-hide snap-x snap-mandatory">
            {summaryDummyData.map((item, index) => (
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
            <TransactionTableMini data={sampleData} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <WeeklySpendingCard />
        </div>
      </div>
    </div>
  );
};

export default TransactionIndex;
