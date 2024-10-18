'use client'
import React from 'react'
import Link from 'next/link'

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Terms and Conditions</h1>
        <p className="mb-4 text-gray-600">Effective Date: 04/10/2024</p>
        
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <p className="mb-4">
            Learning Destiny Private Limited ("Company", "we", "us", or "our") Terms and Conditions
            ("Terms") govern your access to and use of our website, courses, content, and any services
            ("Services") provided by Learning Destiny Private Limited, an ed-tech company incorporated
            under the laws of India.
          </p>
          <p className="mb-4">
            By accessing, browsing, or using our website and services, you ("User", "you", "your", "student")
            agree to comply with these Terms. If you do not agree with any part of these Terms, please
            refrain from using our services.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><a href="#acceptance" className="text-blue-600 hover:underline">Acceptance of Terms</a></li>
            <li><a href="#use" className="text-blue-600 hover:underline">Use of Services</a></li>
            <li><a href="#ip" className="text-blue-600 hover:underline">Intellectual Property Rights</a></li>
            <li><a href="#payment" className="text-blue-600 hover:underline">Payment and Refund Policy</a></li>
            <li><a href="#ugc" className="text-blue-600 hover:underline">User-Generated Content</a></li>
            <li><a href="#privacy" className="text-blue-600 hover:underline">Privacy and Data Security</a></li>
            <li><a href="#third-party" className="text-blue-600 hover:underline">Third-Party Services and Links</a></li>
            <li><a href="#disclaimers" className="text-blue-600 hover:underline">Disclaimers and Limitation of Liability</a></li>
            <li><a href="#governing-law" className="text-blue-600 hover:underline">Governing Law and Dispute Resolution</a></li>
            <li><a href="#amendments" className="text-blue-600 hover:underline">Amendments to the Terms</a></li>
            <li><a href="#contact" className="text-blue-600 hover:underline">Contact Information</a></li>
          </ol>
        </div>

        <div className="space-y-8">
          <section id="acceptance">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-2">By using our services, you acknowledge that:</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>You have read, understood, and accepted these Terms and our Privacy Policy.</li>
              <li>You are at least 18 years of age or have obtained the consent of a parent or legal guardian if you are a minor.</li>
              <li>You have the legal capacity to enter into a binding agreement as per the Indian Contract Act, 1872.</li>
              <li>You agree to comply with all applicable laws, including but not limited to the Information Technology Act, 2000, Consumer Protection Act, 2019, and RBI Guidelines for financial and digital payment transactions.</li>
            </ol>
          </section>

          <section id="use">
            <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
            <h3 className="text-xl font-semibold mb-2">2.1 Eligibility</h3>
            <p className="mb-4">You must register for an account to access certain features of our platform. By creating an account, you represent that all information provided is accurate and current.</p>
            
            <h3 className="text-xl font-semibold mb-2">2.2 Account Security</h3>
            <p className="mb-4">You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. Notify us immediately if you suspect any unauthorized use of your account.</p>
            
            <h3 className="text-xl font-semibold mb-2">2.3 Prohibited Activities</h3>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Use our platform for any unlawful purpose.</li>
              <li>Misrepresent your identity or provide false information.</li>
              <li>Engage in any activity that disrupts the functioning of our services.</li>
              <li>Access, collect, or store personal data of others without their consent.</li>
              <li>Distribute malware or engage in activities harmful to the platform.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">2.4 Termination</h3>
            <p>We reserve the right to suspend or terminate your access to our services if you violate these Terms, engage in fraudulent activities, or for any other reason at our discretion.</p>
          </section>

          {/* Add remaining sections here, following the same structure */}

          <section id="contact">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="mb-2">For any questions or concerns about these Terms, please contact us at:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Email: <a href="mailto:learningdestiny.info@gmail.com" className="text-blue-600 hover:underline">learningdestiny.info@gmail.com</a></li>
              <li>Phone: <a href="tel:+919059898900" className="text-blue-600 hover:underline">+91 9059898900</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}