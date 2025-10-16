"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DailySpending {
  day: string;
  amount: number;
}

interface WeeklyData {
  totalSpending: number;
  breakdown: DailySpending[];
}

interface WeeklySpendingProps {
  totalRemainingIncomeAllTime?: number;
  totalRemainingIncomeThisMonth?: number;
  weekly?: WeeklyData;
}

const WeeklySpendingCard: React.FC<WeeklySpendingProps> = ({
  totalRemainingIncomeAllTime = 0,
  totalRemainingIncomeThisMonth = 0,
  weekly = {
    totalSpending: 0,
    breakdown: [
      { day: "Mon", amount: 0 },
      { day: "Tue", amount: 0 },
      { day: "Wed", amount: 0 },
      { day: "Thu", amount: 0 },
      { day: "Fri", amount: 0 },
      { day: "Sat", amount: 0 },
      { day: "Sun", amount: 0 },
    ],
  },
}) => {
  const { totalSpending, breakdown } = weekly;

  return (
    <Card className="h-full w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl flex flex-col">
      {/* Top: Title + Total Spent */}
      <CardHeader className="text-left">
        <CardTitle className="text-xl md:text-xl text-white">
          Spend This Week
        </CardTitle>
        <CardDescription className="text-white/70 text-5xl font-bold mt-2">
          {totalSpending.toLocaleString()} ৳
        </CardDescription>
      </CardHeader>

      {/* Area Chart */}
      <CardContent className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={breakdown}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#fff"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />
            <Area
              type="natural"
              dataKey="amount"
              stroke="#3b82f6"
              fill="rgba(59,130,246,0.2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>

      {/* Remaining Balances */}
      <div className="mt-4 w-full flex flex-col gap-3 px-3">
        <div className="h-12 bg-white/20 rounded-lg flex items-center justify-between px-4">
          <span className="text-2xl font-bold text-white">
            {totalRemainingIncomeAllTime.toLocaleString()} ৳
          </span>
          <span className="text-white/70">All Time Remaining</span>
        </div>
        <div className="h-12 bg-white/20 rounded-lg flex items-center justify-between px-4">
          <span className="text-2xl font-bold text-white">
            {totalRemainingIncomeThisMonth.toLocaleString()} ৳
          </span>
          <span className="text-white/70">This Month Remaining</span>
        </div>
      </div>
    </Card>
  );
};

export default WeeklySpendingCard;
