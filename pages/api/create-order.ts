// pages/api/create-order.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Missing amount or currency" });
    }

    const order = await razorpay.orders.create({
      amount, // in paise
      currency,
      receipt: `receipt_order_${Date.now()}`,
    });

    return res.status(200).json(order);
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return res.status(500).json({ message: "Order creation failed", error: error.message });
  }
}
