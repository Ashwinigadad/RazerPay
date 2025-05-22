"use client";

import { useState } from "react";
import { loadRazorpay } from "@/lib/razorpay";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    
    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error("Failed to load Razorpay");
      }
      
      // Create order
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000, // ₹10.00 (amount is in paise)
          currency: "INR",
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create order");
      }

      const orderData = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My Awesome Store",
        description: "Payment for Order #123",
        order_id: orderData.id,
        handler: function (response: any) {
          setPaymentSuccess(true);
          toast.success("Payment Successful", {
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "+919876543210",
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment Failed", {
        description: error instanceof Error ? error.message : "An error occurred",
      });
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Complete Your Purchase</h2>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order #123</span>
            <span className="font-medium">₹10.00</span>
          </div>
        </div>

        {paymentSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-green-50 text-green-700 rounded-md flex items-center gap-2"
          >
            <Check className="h-5 w-5" />
            <span>Payment successful! Thank you for your purchase.</span>
          </motion.div>
        ) : (
          <Button
            onClick={initiatePayment}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay with Razorpay"
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}