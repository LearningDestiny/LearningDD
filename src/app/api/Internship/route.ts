import { NextResponse } from 'next/server'

const internships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Tech Co",
    imageUrl: "/placeholder.svg?height=300&width=400",
    stipend: "$1000/month",
    duration: "3 months",
    description: "Join our team to work on cutting-edge projects.",
    highlights: ["Learn modern tech stack", "Mentorship program", "Flexible hours"]
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Data Corp",
    imageUrl: "/placeholder.svg?height=300&width=400",
    stipend: "$1200/month",
    duration: "4 months",
    description: "Apply machine learning to solve real-world problems.",
    highlights: ["Work with big data", "Develop ML models", "Collaborate with data engineers"]
  },
  // Add more internships as needed
]

export async function GET() {
  return NextResponse.json(internships, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600',
    },
  })
}