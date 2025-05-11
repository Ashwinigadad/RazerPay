"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRazorpay } from "@/hooks/use-razorpay";
import { toast } from "sonner";

export function PricingSection() {
  const { initializeRazorpay } = useRazorpay();

  const plans = [
    {
      name: "Starter",
      price: "₹499",
      description: "Perfect for small businesses just getting started.",
      features: [
        "Process up to ₹50,000/month",
        "Standard payment methods",
        "Email support",
        "Basic analytics dashboard",
        "1.5% transaction fee"
      ],
      highlight: false,
      amount: 49900 // in paisa
    },
    {
      name: "Business",
      price: "₹999",
      description: "Best for growing businesses with regular transactions.",
      features: [
        "Process up to ₹5,00,000/month",
        "All payment methods",
        "24/7 email and chat support",
        "Advanced analytics",
        "1.0% transaction fee",
        "Subscription billing"
      ],
      highlight: true,
      amount: 99900 // in paisa
    },
    {
      name: "Enterprise",
      price: "₹2499",
      description: "For large companies with high-volume processing needs.",
      features: [
        "Unlimited processing",
        "Dedicated account manager",
        "Priority support",
        "Custom reporting",
        "0.75% transaction fee",
        "Subscription billing",
        "Multi-currency support"
      ],
      highlight: false,
      amount: 249900 // in paisa
    }
  ];

  const handlePayment = async (plan: string, amount: number) => {
    try {
      const order = {
        amount: amount,
        currency: "INR",
        receipt: "rcpt_" + Date.now(),
        orderId: "order_" + Date.now(), // normally you would get this from your server
        notes: {
          productName: `${plan} Plan`,
        },
      };
      
      await initializeRazorpay(order);
    } catch (error) {
      console.error(error);
      toast.error("Payment initialization failed. Please try again later.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that works best for your business.
            No hidden fees, no contracts.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={cn(
                "rounded-lg border p-8 relative h-full flex flex-col",
                plan.highlight && "border-primary shadow-lg"
              )}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
              </div>
              
              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={cn("w-full", !plan.highlight && "bg-primary/90 hover:bg-primary")}
                onClick={() => handlePayment(plan.name, plan.amount)}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}