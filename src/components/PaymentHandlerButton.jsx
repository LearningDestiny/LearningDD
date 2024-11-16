"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "../../src/hooks/use-toast";

function PaymentHandlerButton({
  finalAmt,
  fullName,
  email,
  contact,
  stream, // Ensure you are passing stream and qualification
  qualification, // Ensure you are passing stream and qualification
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Load Razorpay Script
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded successfully.");
    script.onerror = () => console.error("Failed to load Razorpay script.");
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadScript();
  }, []);

  // Save data to Google Sheets
  const saveDataToGoogleSheets = async () => {
    try {
      const res = await fetch("/api/googleSheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          contact,
          stream, // Pass stream
          qualification, // Pass qualification
        }),
      });

      const result = await res.json();
      console.log("Google Sheets Response:", result);

      if (result.success) {
        toast({
          title: "Data Saved",
          description: "Your data has been successfully saved to Google Sheets.",
        });
        return true; // Data saved successfully
      } else {
        toast({
          title: "Data Save Failed",
          description: result.message || "An error occurred while saving data.",
          variant: "destructive",
        });
        return false; // Data saving failed
      }
    } catch (error) {
      console.error("Error saving data to Google Sheets:", error);
      toast({
        title: "Network Error",
        description: "A network error occurred while saving data.",
        variant: "destructive",
      });
      return false; // Network error
    }
  };

  // Process Payment
  const processPayment = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Save data to Google Sheets
      const dataSaved = await saveDataToGoogleSheets();
      if (!dataSaved) {
        setLoading(false);
        return;
      }

      // Create Razorpay Order
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmt, currency: "INR" }),
      });

      const data = await res.json();
      console.log("Razorpay Order Response:", data);

      // Open Razorpay Checkout
      if (!window.Razorpay) {
        console.error("Razorpay is not defined. Script might not be loaded.");
        toast({
          title: "Payment Error",
          description: "Failed to initialize Razorpay. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalAmt,
        currency: "INR",
        name: "Learning Destiny",
        description: "Final Amount",
        order_id: data.orderId,
        handler: async function (response) {
          // Verify Payment
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

      razorpay.open();
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

  // Verify Payment
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
