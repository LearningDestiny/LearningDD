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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadScript();
  }, []);

  const saveDataToGoogleSheets = async () => {
    try {
      const res = await fetch("/api/googleSheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, contact }),
      });
      const result = await res.json();

      if (result.success) {
        toast({
          title: "Data Saved",
          description: "Your data has been successfully saved to Google Sheets.",
        });
      } else {
        toast({
          title: "Data Save Failed",
          description: result.message || "An error occurred while saving data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving data to Google Sheets:", error);
      toast({
        title: "Network Error",
        description: "A network error occurred while trying to save data.",
        variant: "destructive",
      });
    }
  };

  const processPayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmt, currency: "INR" }),
      });
      const data = await res.json();

      window.Razorpay.open({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalAmt,
        currency: "INR",
        name: "Learning Destiny",
        description: "Final Amount",
        order_id: data.orderId,
        handler: async function (response) {
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
            await saveDataToGoogleSheets(); // Call to save data after successful payment
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
      setLoading(false);
    }
  };

  const verifyPayment = async (orderCreationId, razorpayPaymentId, razorpaySignature) => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderCreationId, razorpayPaymentId, razorpaySignature }),
      });
      return await res.json();
    } catch (error) {
      console.error("Verification Error:", error);
      return { success: false };
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
      {loading && <span className="loader" />}
    </Button>
  );
}

export default PaymentHandlerButton;
