"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  Shield, 
  Zap, 
  BarChart4, 
  Globe, 
  Wallet
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Multiple Payment Methods",
      description: "Accept payments via credit cards, debit cards, UPI, and other popular methods."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Transactions",
      description: "Enterprise-grade security with PCI DSS compliance and encrypted transactions."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Instant Processing",
      description: "Real-time payment processing with instant confirmation and notifications."
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-primary" />,
      title: "Detailed Analytics",
      description: "Comprehensive dashboard with transaction insights and business analytics."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Payments",
      description: "Accept payments in multiple currencies from customers around the world."
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: "Smart Refunds",
      description: "Easy and automated refund processing with customer notifications."
    }
  ];

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
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature-Rich Payment Platform</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to run your business and accept payments online.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}