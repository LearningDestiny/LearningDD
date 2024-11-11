// PaymentHandlerButton.js
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
  stream,         // Ensure you are passing stream and qualification
  qualification,  // Ensure you are passing stream and qualification
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
    console.log("Sending data to API:", { fullName, email, contact, stream, qualification }); // Log data here

    try {
      const res = await fetch("/api/googleSheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          contact,
          stream,         // Ensure stream is passed
          qualification,  // Ensure qualification is passed
        }),
      });
      const result = await res.json();

      if (result.success) {
        toast({
          title: "Data Saved",
          description: "Your data has been successfully saved to Google Sheets.",
        });
        return true; // Return true if data is saved successfully
      } else {
        toast({
          title: "Data Save Failed",
          description: result.message || "An error occurred while saving data.",
          variant: "destructive",
        });
        return false; // Return false if data saving failed
      }
    } catch (error) {
      console.error("Error saving data to Google Sheets:", error);
      toast({
        title: "Network Error",
        description: "A network error occurred while trying to save data.",
        variant: "destructive",
      });
      return false; // Return false in case of network error
    }
  };

  const processPayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const dataSaved = await saveDataToGoogleSheets();
      if (!dataSaved) {
        setLoading(false);
        return;
      }

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
