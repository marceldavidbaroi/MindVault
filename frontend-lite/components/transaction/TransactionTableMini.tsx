"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info, Layers, Plus } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { Skeleton } from "@/components/ui/skeleton"; // import shadcn Skeleton

interface Transaction {
  id: number;
  date: string;
  category: {
    id: number;
    name: string;
    displayName: string;
    type: string;
    createdAt: string;
  };
  description: string;
  amount: string;
}

interface TransactionTableProps {
  data: Transaction[];
  loading?: boolean; // new prop
}

const TransactionTableMini: React.FC<TransactionTableProps> = ({
  data,
  loading = false,
}) => {
  const handleRowClick = (tx: Transaction) => {
    console.log("Clicked transaction:", tx);
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/30">
      <div className="flex justify-between items-center p-3">
        <div className="text-left text-2xl font-bold ">Recent Transactions</div>
        <ButtonGroup>
          <Button variant="default">
            <Plus className="w-5 h-5" />
          </Button>
          <Button variant="default">
            <Layers className="w-5 h-5" />
          </Button>
          <Button variant="default">
            <Info className="w-5 h-5" />
          </Button>
        </ButtonGroup>
      </div>

      <Table>
        <TableCaption className="text-white/70 dark:text-white/50"></TableCaption>
        <TableHeader>
          <TableRow className="border-white/20">
            <TableHead className="w-[120px] text-white/90">Date</TableHead>
            <TableHead className="hidden sm:table-cell text-white/90">
              Category
            </TableHead>
            <TableHead className="hidden sm:table-cell text-white/90">
              Description
            </TableHead>
            <TableHead className="text-right text-white/90">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            : data.map((tx) => (
                <TableRow
                  key={tx.id}
                  onClick={() => handleRowClick(tx)}
                  className="cursor-pointer transition-colors hover:bg-white/20 dark:hover:bg-white/10"
                >
                  <TableCell className="font-medium text-white">
                    {tx.date}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-white/90">
                    {tx.category.displayName}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell truncate max-w-[200px] text-white/80">
                    {tx.description || "-"}
                  </TableCell>
                  <TableCell className="text-right text-white font-semibold">
                    {tx.amount}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTableMini;
