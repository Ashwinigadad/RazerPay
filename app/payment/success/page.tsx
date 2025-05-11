"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "500.00";
  const orderId = searchParams.get("order_id") || "RZPORD123456";
  
  useEffect(() => {
    // In a real app, you would verify the payment status with your backend
    console.log("Payment successful");
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full bg-card border rounded-lg shadow-lg p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Payment Successful!
        </motion.h1>
        
        <motion.p
          className="text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Thank you for your payment. Your transaction has been completed successfully.
        </motion.p>
        
        <motion.div
          className="bg-muted p-4 rounded-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="font-medium">{orderId}</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}