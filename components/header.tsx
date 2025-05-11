"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreditCard, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 10);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">PayEase</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <ModeToggle />
          <Button>Get Started</Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-background border-b"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container py-4 px-4 flex flex-col space-y-4">
            <Link 
              href="#features"
              className="text-sm font-medium py-2 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#pricing"
              className="text-sm font-medium py-2 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#dashboard"
              className="text-sm font-medium py-2 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Button onClick={() => setIsOpen(false)}>
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}