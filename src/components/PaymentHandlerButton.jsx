"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

function PaymentHandlerButton({
  finalAmt,
  fullName,
  email,
  contact,

}) {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { toast } = useToast();
  const router = useRouter();

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadScript();
  }, []);

  const processPayment = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    try {
      // Step 1: Create Order
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmt, currency: "INR" }),
      });
      const data = await res.json();
      setOrderId(data.orderId);

      // Step 2: Initiate Razorpay Payment
      window.Razorpay.open({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalAmt,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response) {
          // Step 3: Verify Payment
          const verificationData = await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
          if (verificationData.success) {
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully.",
            });
          } else {
            toast({
              title: "Payment Verification Failed",
              description: "There was an issue verifying your payment.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: fullName,
          email: email,
          contact: contact,
        },
        theme: {
          color: "#FBA758",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Payment Error",
        description: "An error occurred while processing your payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const verifyPayment = async (
    orderCreationId,
    razorpayPaymentId,
    razorpaySignature
  ) => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCreationId,
          razorpayPaymentId,
          razorpaySignature,
        }),
      });
      return await res.json(); // Return the verification result
    } catch (error) {
      console.error("Verification Error:", error);
      return { success: false }; // Return failure if there's an error
    }
  };

  return (
    <Button
      onClick={processPayment}
      size="lg"
      className="w-full"
      disabled={loading}
    >
      {loading ? "Processing..." : "Pay Now"}
      {loading && <span className="loader" />}{" "}
      {/* Add a loader icon or spinner here */}
    </Button>
  );
}

export default PaymentHandlerButton;
