"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
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

interface WeeklySpendingProps {
  weekTotal?: number;
  remainingBalance?: number;
  dailySpending?: DailySpending[];
}

const WeeklySpendingCard: React.FC<WeeklySpendingProps> = ({
  weekTotal = 3600,
  remainingBalance = 1400,
  dailySpending = [
    { day: "Mon", amount: 500 },
    { day: "Tue", amount: 700 },
    { day: "Wed", amount: 400 },
    { day: "Thu", amount: 600 },
    { day: "Fri", amount: 300 },
    { day: "Sat", amount: 800 },
    { day: "Sun", amount: 300 },
  ],
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <Card className="h-full w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl flex flex-col ">
        {/* Top: Title + Total Spent */}
        <CardHeader className="text-left">
          <CardTitle className="text-xl md:text-xl text-white">
            Spend This Week
          </CardTitle>
          <CardDescription className="text-white/70 text-5xl font-bold mt-2">
            {weekTotal.toLocaleString()} ৳
          </CardDescription>
        </CardHeader>

        {/* Area Chart */}
        <CardContent className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dailySpending}
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

        {/* Remaining Balance */}
        <div className="mt-4 w-full">
          <p className="text-white/70 mb-2 ml-3 text-left">Remaining Balance</p>
          <div className="h-12 m-3 bg-white/20 rounded-lg flex items-center justify-between px-4">
            <span className="text-2xl font-bold text-white">
              {remainingBalance.toLocaleString()} ৳
            </span>
            <span className="text-white/70">Location</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeeklySpendingCard;
