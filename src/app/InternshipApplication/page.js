'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaPhone, FaFileAlt, FaPaperPlane } from 'react-icons/fa'

const steps = [
  { title: "Personal Info", icon: <FaUser className="w-5 h-5" /> },
  { title: "Contact", icon: <FaEnvelope className="w-5 h-5" /> },
  { title: "Cover Letter", icon: <FaFileAlt className="w-5 h-5" /> },
  { title: "Resume", icon: <FaPaperPlane className="w-5 h-5" /> },
]

export default function InternshipApplication() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
    resume: null,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const validateStep = () => {
    const newErrors = {}
    switch (currentStep) {
      case 0:
        if (formData.fullName.length < 2) {
          newErrors.fullName = "Full name must be at least 2 characters."
        }
        break
      case 1:
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address."
        }
        if (formData.phoneNumber.length < 10) {
          newErrors.phoneNumber = "Please enter a valid phone number."
        }
        break
      case 2:
        if (formData.coverLetter.length < 50) {
          newErrors.coverLetter = "Cover letter must be at least 50 characters long."
        }
        break
      case 3:
        if (!formData.resume) {
          newErrors.resume = "Please upload a resume file."
        } else if (formData.resume.size > 5000000) {
          newErrors.resume = "Resume file size must be less than 5MB."
        }
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep()) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      console.log(formData)
      alert("Application submitted successfully!")
      router.push('/') // Redirect to home page or confirmation page
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Internship Application</h2>
          <p className="text-center text-gray-600 mb-8">Please fill out the form below to apply for our internship program.</p>
          
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full p-2 ${index <= currentStep ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {step.icon}
                </div>
                <span className="mt-2 text-xs">{step.title}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 0 && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
              </div>
            )}

            {currentStep === 1 && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="johndoe@example.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="(123) 456-7890"
                  />
                  {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Tell us why you're interested in this internship and what you hope to learn..."
                />
                {errors.coverLetter && <p className="mt-2 text-sm text-red-600">{errors.coverLetter}</p>}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {errors.resume && <p className="mt-2 text-sm text-red-600">{errors.resume}</p>}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <p className="text-xs text-gray-500">
            By submitting this application, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  )
}