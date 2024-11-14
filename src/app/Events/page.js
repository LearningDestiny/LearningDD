'use client'
import Events from '../../components/ui/Events'
import React from 'react'
import { Header } from '../../components/landing-page'
import EventDetail from '../../enrollpages/EventsDetails'
import Events from '../../Pages/api/events'
const page = () => {
  return (
    <>
    <Header/>
    <Events/>
    <Events/>
    <EventDetail/>
 

   
    
    </>
  )
}

export default page