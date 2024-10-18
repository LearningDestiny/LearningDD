"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Linkedin, Instagram, Mail, Phone } from "lucide-react";
 // Import your Footer component
import PrivacyPolicy from './ui/policy';
import TermsAndConditions from './ui/Terms';

// ------------------------------------
// Header Component (with indigo-900 background and logo with text)
// ------------------------------------
export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white text-indigo-900">
      {/* Left section with logo and company name */}
      <a className="flex items-center justify-center" href="/landing-page">
        <img src="/TransparentLogo.png" alt="Learning Destiny Logo" className="h-8 w-8 mr-2" />
        <span className="text-lg font-semibold">Learning Destiny Pvt. Ltd.</span>
      </a>

      {/* Navigation Links */}
      <nav className="ml-auto flex gap-4 sm:gap-6 justify-center items-center">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/Courses">
          Courses
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/AboutUs">
          About Us
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/Events">
          Events
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/workshop">
          Workshops
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/inten">
          Internship
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
          Dashboard
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}

// ------------------------------------
// Hero Section Component
// ------------------------------------
function HeroSection() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/HomeBG.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      </div>

      {/* Content Section */}
      <section className="relative w-full h-full py-12 mx-auto flex items-center justify-center md:py-24 lg:py-32 xl:py-48 z-10">
        <div className="container px-4 md:px-6 m-auto">
          <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TransparentLogo-oYhKQxpFbcatt7U6MK0GLl3qx7XCtG.png"
                alt="Learning Destiny Logo"
                width={300}
                height={400}
                className="animate-fade-in"
              />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in tracking-tight text-white">
                Transforming Education, Shaping Careers.
              </h1>
              <p className="text-xl md:text-2xl font-light mb-4 max-w-3xl text-white">
                We provide more than courses—we build communities, nurture talents, and create opportunities.
              </p>
              <div className="space-x-4">
                <Link href="/sign-in" className="inline-block bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300">
                  Get Started
                </Link>
                <Link href="/AboutUs" className="inline-block bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-primary transition duration-300">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>  
    </div>
  );
}

// ------------------------------------
// Key Features Component
// ------------------------------------
function KeyFeatures() {
  return (
    <section className="w-full mx-auto py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Centered heading */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Key-Feature of Learning destiny
        </h2>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <Feature
            icon={BookOpen}
            title="Comprehensive Courses"
            description="Access a wide range of courses tailored to your learning needs."
          />
          <Feature
            icon={Users}
            title="Collaborative Learning"
            description="Engage with peers and instructors in interactive learning environments."
          />
          <Feature
            icon={Award}
            title="Certifications"
            description="Earn recognized certifications to boost your career prospects."
          />
        </div>
      </div>
    </section>
  );
}

// Feature Component
function Feature({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center">
      <Icon className="text-blue-500 mb-4" size={40} />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
// ------------------------------------
// Call to Action Component (text on left, image on right, centered social media icons)
// ------------------------------------
function CallToAction() {
  return (
    <footer className="bg-blue-200 text-black py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        {/* Logo and Company Name Section */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 md:w-2/3 text-center md:text-left">
          <Image 
            src="/TransparentLogo.png"
            alt="Learning Destiny Logo"
            width={132}
            height={132}
            className="w-32 h-auto mb-3"
          />
          <h2 className="text-2xl font-bold mb-2">Turning Dreams into Destinies.</h2>
          <p className="max-w-[600px] text-black text-base">
            learners who are transforming their lives through education. 
           <span>Start your journey today!</span> 
          </p>
        </div>

        {/* Footer Links Section */}
        <div className="flex flex-col md:flex-row md:w-1/3 space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Learn</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/Courses" className="text-black hover:text-blue-700 transition-colors duration-300">
                  Courses
                </Link>
              </li>
              
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <ul className="space-y-1">
              <li>
                <a href="tel:+919059898900" className="text-black hover:text-blue-700 transition-colors duration-300">
                  +91 90598 98900
                </a>
              </li>
              <li>
                <Link href="/ContactUs" className="text-black hover:text-blue-700 transition-colors duration-300">
                <h1 >Address</h1>
                2-4-149, 2nd Floor, JR Edifice, Snehapuri x Road, Nagole, Medchal Dist., Hyderabad - 500035, TG.
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 my-6">
        <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-700 transition-colors duration-300">
          <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
        </a>
        <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-700 transition-colors duration-300">
          <FontAwesomeIcon icon={faInstagram} className="text-xl" />
        </a>
        <a href="mailto:learningdestiny.info@gmail.com" aria-label="Gmail" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-700 transition-colors duration-300">
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
        </a>
        <a href="tel:+919059898900" aria-label="Phone" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-700 transition-colors duration-300">
          <FontAwesomeIcon icon={faPhone} className="text-xl" />
        </a>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-black text-xs">
        <p className="mb-1">&copy; {new Date().getFullYear()} Learning Destiny Pvt. Ltd. All rights reserved.</p>
        <span>
          By signing up, you agree to our{" "}
          <Link href="/Terms" className="underline underline-offset-2 hover:text-blue-700 transition-colors duration-300">
            Terms & Conditions 
          </Link>
          <Link href="/policy" className="underline underline-offset-2 hover:text-blue-700 transition-colors duration-300">
            Privacy policies
          </Link>   
          <Link href="/shipping" className="underline underline-offset-2 hover:text-blue-700 transition-colors duration-300">
            Shipping and delivery
          </Link>
          <Link href="/cancallation" className="underline underline-offset-2 hover:text-blue-700 transition-colors duration-300">
            cancallation and refund
          </Link>
        </span>
      </div>
    </div>
  </footer>
)
}
// ------------------------------------
// Landing Page (Final Page Structure)
// ------------------------------------
export default function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <KeyFeatures />
      <CallToAction />
      
    </div>
  );
}
