'use client'

import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './AdminDashboard.module.css'


export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/Login')
      } else {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/Login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div>
          <h2 className={styles.sidebarTitle}>
            Admin Dashboard
          </h2>
          <nav className={styles.sidebarNav}>
          <Link href="/admin/manage-events" className={styles.sidebarLink}>
  Manage Events
</Link>
            <Link href="/admin/manage-workshop" className={styles.sidebarLink}>
              Update Workshop
            </Link>
            <Link href="/admin/manageinternship" className={styles.sidebarLink}>
              Update Internship
            </Link>
            <Link href="/admin/managecourse" className={styles.sidebarLink}>
              Update course
            </Link>
          </nav>
        </div>
        <button 
          onClick={handleLogout} 
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Learning Destiny Admin Dashboard</h1>
        <p className={styles.mainDescription}>
          Choose an option from the sidebar to update content on the website.
        </p>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage Events</h2>
            <p className={styles.cardDescription}>Update and organize upcoming events.</p>
            <Link href="/admin/manage-events" className={styles.sidebarLink}>
             Manage Events
            </Link>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage Workshops</h2>
            <p className={styles.cardDescription}>Add or edit workshop details.</p>
            <Link href="/admin/manage-events/manage-workshop" className={styles.cardButton}>
              Go to Workshops
            </Link>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage Internships</h2>
            <p className={styles.cardDescription}>Control internship postings and information.</p>
            <Link href="/admin/manage-events/manage-workshop/manageintenship" className={styles.cardButton}>
              Go to Internships
            </Link>

          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage courses</h2>
            <p className={styles.cardDescription}>Add or edit courses details.</p>
            <Link href="/admin/manage-events/manage-workshop/manageintenship/managecourse" className={styles.cardButton}>
              Go to course
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}