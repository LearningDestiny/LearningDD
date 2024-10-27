"use client";

import { useState } from "react";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  Menu,
  X,
  Clock,
  User,
  DollarSign,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import PaymentHandlerButton from "./PaymentHandlerButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { courses } from "@/Data";

export function LmsDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-800 text-white transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Learning Destiny </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-1">
          <Link
            href="#"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-700"
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          {/* <Link
            href="#"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-700"
          >
            <Book className="mr-2 h-4 w-4" />
            Explore Courses
          </Link> */}
          <Link
            href="#"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-700"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            My Courses
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-10 top-4 hidden lg:flex"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </Button>
      </aside>
      <main
        className={cn(
          "flex-1 overflow-auto p-4 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <UserButton />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          { {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 bg-gray-800 border-gray-700"
            >
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={400}
                height={200}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle className="text-white">{course.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />₹{course.price}
                  </div>
                  <div className="flex items-center">
                    <BarChart className="mr-2 h-4 w-4" />
                    {course.rating} ({course.ratingCount})
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedCourse(course)}>
                      Enroll Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Enroll in {course.title}</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Please provide your details to enroll in this course.
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="bg-gray-700 text-white"
                        />
                      </div>
                    </form>
                    <DialogFooter>
                      <Button variant="outline">Close</Button>
                      <PaymentHandlerButton
                        finalAmt={parseFloat(course.price)}
                        fullName={formData.name}
                        email={formData.email}
                        contact={formData.phone}
                      />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">More Info</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-gray-700 text-white border-gray-600">
                    <h3 className="font-semibold mb-2">Course Highlights</h3>
                    <ul className="list-disc list-inside mb-4 text-sm">
                      {course.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                    <h3 className="font-semibold mb-2">Course Roadmap</h3>
                    {course.roadmap.map((month, monthIndex) => (
                      <div key={monthIndex} className="mb-2">
                        <h4 className="font-medium text-sm">{month.month}</h4>
                        {month.weeks.map((week, weekIndex) => (
                          <div key={weekIndex} className="ml-2 text-xs">
                            <p className="font-medium">{week.week}</p>
                            <ul className="list-disc list-inside ml-2">
                              {week.topics.map((topic, topicIndex) => (
                                <li key={topicIndex}>{topic}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              </CardFooter>
            </Card>
          ))} }
        </div>
      </main>
    </div>
  );
}
