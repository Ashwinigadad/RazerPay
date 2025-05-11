"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, PieChart } from "recharts";
import { 
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Pie,
  Cell,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Sample transaction data
const transactions = [
  {
    id: "INV001",
    amount: "₹5,000",
    status: "success",
    email: "user1@example.com",
    date: new Date(2025, 0, 15)
  },
  {
    id: "INV002",
    amount: "₹2,500",
    status: "success",
    email: "user2@example.com",
    date: new Date(2025, 0, 16)
  },
  {
    id: "INV003",
    amount: "₹1,000",
    status: "failed",
    email: "user3@example.com",
    date: new Date(2025, 0, 17)
  },
  {
    id: "INV004",
    amount: "₹7,500",
    status: "processing",
    email: "user4@example.com",
    date: new Date(2025, 0, 18)
  },
  {
    id: "INV005",
    amount: "₹3,200",
    status: "success",
    email: "user5@example.com",
    date: new Date(2025, 0, 19)
  },
];

// Chart data
const barChartData = [
  { name: "Jan", amount: 12000 },
  { name: "Feb", amount: 19000 },
  { name: "Mar", amount: 15000 },
  { name: "Apr", amount: 28000 },
  { name: "May", amount: 24000 },
  { name: "Jun", amount: 32000 },
];

const pieChartData = [
  { name: "Credit Card", value: 65 },
  { name: "Debit Card", value: 15 },
  { name: "UPI", value: 15 },
  { name: "NetBanking", value: 5 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

export function TransactionsDashboard() {
  const [filter, setFilter] = useState("all");
  
  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.status === filter);
    
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Transaction Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Track and analyze your payment data with our intuitive dashboard.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹19,200</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500">↑ 12%</span> vs last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500">↑ 8%</span> vs last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.6%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500">↑ 2.1%</span> vs last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                        formatter={(value) => [`₹${value}`, "Amount"]}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest 5 transactions</CardDescription>
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={filter}
                  onValueChange={(value) => setFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="success">Successful</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize",
                            transaction.status === "success" && "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
                            transaction.status === "processing" && "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
                            transaction.status === "failed" && "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                          )}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.email}</TableCell>
                      <TableCell className="text-right">{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}