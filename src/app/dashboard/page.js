'use client'
import { LmsDashboard } from '@/components/lms-dashboard';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <LmsDashboard />
  );
}
