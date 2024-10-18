import { NextResponse } from "next/server";

// app/api/order/route.js
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const { amount, currency } = await request.json();

  const options = {
    amount: parseInt(amount) * 100, // Convert to smallest currency unit
    currency: currency,
    receipt: "rcp1",
  };
  const order = await razorpay.orders.create(options);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
