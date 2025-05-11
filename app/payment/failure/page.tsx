"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error_code") || "PAYMENT_FAILED";
  const errorDescription = searchParams.get("error_description") || "Your payment could not be processed. Please try again.";
  
  useEffect(() => {
    // In a real app, you would log this error
    console.log("Payment failed:", errorCode);
  }, [errorCode]);
  
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
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        </motion.div>
        
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Payment Failed
        </motion.h1>
        
        <motion.p
          className="text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {errorDescription}
        </motion.p>
        
        <motion.div
          className="bg-destructive/10 p-4 rounded-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between">
            <span className="text-muted-foreground">Error Code:</span>
            <span className="font-medium">{errorCode}</span>
          </div>
        </motion.div>
        
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <Button variant="default" className="w-full">Try Again</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">Return to Home</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}