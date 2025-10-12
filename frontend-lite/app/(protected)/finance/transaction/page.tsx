import FinancialSummaryCard from "@/components/transaction/FinancialSummaryCard";
import WeeklySpendingCard from "@/components/transaction/WeeklySpendingCard";

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

const TransactionIndex = () => {
  return (
    <div className="h-[70vh] p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
        {/* LEFT SIDE */}
        <div className="col-span-1 md:col-span-3 grid grid-rows-[auto_1fr] gap-4 h-full">
          {/* Top row: 3 columns (stack on mobile) */}
          <div className="flex overflow-x-auto px-2 py-2 gap-4 scrollbar-hide snap-x snap-mandatory">
            {summaryDummyData.map((item, index) => (
              <div key={index} className="flex-shrink-0 snap-start">
                <FinancialSummaryCard data={item} />
              </div>
            ))}
          </div>

          {/* Bottom: merged full-width section */}
          <div className="bg-green-300 p-4 flex items-center justify-center text-center h-full">
            Bottom (full width & fills remaining height)
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-1 md:col-span-2 flex items-center justify-center text-center h-full">
          <WeeklySpendingCard />
        </div>
      </div>
    </div>
  );
};

export default TransactionIndex;
