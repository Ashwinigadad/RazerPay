"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/use-razorpay";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";

export function HeroSection() {
  const { initializeRazorpay } = useRazorpay();

  const handlePayment = async () => {
    try {
      const order = {
        amount: 50000, // in paisa (₹500)
        currency: "INR",
        receipt: "rcpt_" + Date.now(),
        orderId: "order_" + Date.now(), // normally you would get this from your server
        notes: {
          productName: "Premium Plan",
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
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 max-w-7xl mx-auto px-4">
      <motion.div
        className="flex flex-col items-center text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" 
          variants={itemVariants}
        >
          Simplify Payments <span className="text-primary">with PayEase</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8" 
          variants={itemVariants}
        >
          Secure, fast, and reliable payment solutions for your business. Accept payments from anywhere with our seamless integration.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-16" 
          variants={itemVariants}
        >
          <Button size="lg" onClick={handlePayment} className="group">
            Try Payment Demo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </motion.div>
        
        <motion.div 
          className="w-full aspect-video max-w-4xl rounded-lg overflow-hidden shadow-2xl"
          variants={itemVariants}
        >
          <img 
            src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Payment Dashboard" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 bg-primary/10 p-1 rounded-full">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Secure Transactions</p>
          </div>
          
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 bg-primary/10 p-1 rounded-full">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">24/7 Support</p>
          </div>
          
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 bg-primary/10 p-1 rounded-full">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Multiple Payment Methods</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}