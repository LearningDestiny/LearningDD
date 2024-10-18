'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will ensure the code runs only after the component is mounted on the client side
    setIsClient(true);
  }, []);{
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <p className="mb-4">
            Learning Destiny Private Limited ("Company", "we", "us", or "our") values your trust and is
            committed to safeguarding your privacy and protecting your personal and sensitive information.
            This Privacy Policy outlines the types of information we collect from users ("you", "your",
            "student", "visitor"), how it is used, and the measures we take to keep it secure.
          </p>
          <p className="mb-4">
            This Privacy Policy complies with the Information Technology Act, 2000, the Indian Contract
            Act, 1872, and RBI Guidelines applicable to financial transactions, digital payments, and
            ed-tech operations. By accessing or using our website, services, or platforms, you agree to the
            terms of this policy.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><a href="#collection" className="text-blue-600 hover:underline">Collection of Information</a></li>
            <li><a href="#purpose" className="text-blue-600 hover:underline">Purpose of Data Collection</a></li>
            <li><a href="#consent" className="text-blue-600 hover:underline">Consent and Usage</a></li>
            <li><a href="#disclosure" className="text-blue-600 hover:underline">Disclosure of Information</a></li>
            <li><a href="#security" className="text-blue-600 hover:underline">Data Security</a></li>
            <li><a href="#retention" className="text-blue-600 hover:underline">Data Retention</a></li>
            <li><a href="#rights" className="text-blue-600 hover:underline">Your Rights</a></li>
            <li><a href="#cookies" className="text-blue-600 hover:underline">Cookies and Tracking Technologies</a></li>
            <li><a href="#transfer" className="text-blue-600 hover:underline">Cross-Border Data Transfer</a></li>
            <li><a href="#grievance" className="text-blue-600 hover:underline">Grievance Redressal Mechanism</a></li>
            <li><a href="#amendments" className="text-blue-600 hover:underline">Amendments to this Policy</a></li>
            <li><a href="#governing-law" className="text-blue-600 hover:underline">Governing Law and Jurisdiction</a></li>
            <li><a href="#contact" className="text-blue-600 hover:underline">Contact Information</a></li>
          </ol>
        </div>

        <div className="space-y-8">
          <section id="collection">
            <h2 className="text-2xl font-semibold mb-4">1. Collection of Information</h2>
            <p className="mb-2">We collect the following categories of information:</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li><strong>Personal Information:</strong> Includes but is not limited to your name, email address, contact number, date of birth, address, gender, educational qualifications, etc.</li>
              <li><strong>Sensitive Personal Information:</strong> Includes financial data (such as bank account details, credit/debit card details, UPI IDs), payment history, and identification documents such as Aadhaar number, PAN, or any other government-issued ID.</li>
              <li><strong>Usage Data:</strong> Data about your activity on our website, such as the pages visited, time spent, courses or services browsed, IP address, browser type, and device information.</li>
              <li><strong>Transaction Information:</strong> Information about the payments you make, the products or services purchased, and transaction-related communications.</li>
            </ol>
          </section>

          <section id="purpose">
            <h2 className="text-2xl font-semibold mb-4">2. Purpose of Data Collection</h2>
            <p className="mb-2">We collect and process your information for the following purposes:</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li><strong>Provision of Services:</strong> To provide educational content, manage enrollments, and deliver interactive learning experiences.</li>
              <li><strong>Verification and Compliance:</strong> For identity verification, KYC (Know Your Customer) checks, as mandated by RBI guidelines, and compliance with legal and regulatory requirements.</li>
              <li><strong>Payment Processing:</strong> To facilitate secure payments and manage transaction records in compliance with financial regulations.</li>
              <li><strong>Communication:</strong> To communicate with you regarding courses, promotions, customer support, and any service-related queries.</li>
              <li><strong>Marketing and Analytics:</strong> For internal analysis, marketing research, and to improve the quality of our services.</li>
              <li><strong>Legal Obligations:</strong> To meet legal and regulatory obligations as required under Indian laws and RBI guidelines.</li>
            </ol>
          </section>

          {/* Add remaining sections here, following the same structure */}

          <section id="contact">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="mb-2">For questions, concerns, or clarification regarding this Privacy Policy, please contact us at:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Email: <a href="mailto:learningdestiny.info@gmail.com" className="text-blue-600 hover:underline">learningdestiny.info@gmail.com</a></li>
              <li>Phone: <a href="tel:+919059898900" className="text-blue-600 hover:underline">+91 9059898900</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}}