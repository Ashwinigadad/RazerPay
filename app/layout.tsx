import { Toaster } from "@/components/ui/sonner"; // Add this import
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Razorpay Integration",
  description: "Payment integration with Razorpay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" /> {/* Add this line */}
      </body>
    </html>
  );
}