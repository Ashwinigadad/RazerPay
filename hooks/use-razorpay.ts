"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Order {
  amount: number;
  currency: string;
  receipt: string;
  orderId: string;
  notes?: Record<string, string>;
}

interface RazorpayInstance {
  on: (event: string, callback: (response: any) => void) => void;
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const initializeRazorpay = useCallback(
    async (order: Order) => {
      setIsLoading(true);
      try {
        // In a real application, you would get the order_id from your backend
        // For this demo, we'll use the one passed in

        // Test API key - this should come from an environment variable in a real app
        const key = "rzp_test_YourTestKey"; // Replace with your test key

        // Configure options
        const options = {
          key,
          amount: order.amount,
          currency: order.currency,
          name: "PayEase",
          description: order.notes?.productName || "Purchase",
          order_id: order.orderId,
          handler: function (response: any) {
            // Handle successful payment
            const searchParams = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              amount: (order.amount / 100).toFixed(2),
            });
            
            // In a real app, verify the payment with your backend here
            
            toast.success("Payment successful!");
            router.push(`/payment/success?${searchParams.toString()}`);
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9876543210",
          },
          notes: order.notes,
          theme: {
            color: "#3B82F6",
          },
          modal: {
            ondismiss: function () {
              setIsLoading(false);
              toast.error("Payment cancelled");
            },
          },
        };

        const razorpay = new window.Razorpay(options) as RazorpayInstance;

        razorpay.on("payment.failed", function (response: any) {
          const searchParams = new URLSearchParams({
            error_code: response.error.code,
            error_description: response.error.description,
          });
          
          toast.error("Payment failed");
          router.push(`/payment/failure?${searchParams.toString()}`);
          setIsLoading(false);
        });

        razorpay.open();
      } catch (error) {
        console.error("Razorpay Error:", error);
        toast.error("Failed to initialize payment");
        setIsLoading(false);
        throw error;
      }
    },
    [router]
  );

  return {
    initializeRazorpay,
    isLoading,
  };
}