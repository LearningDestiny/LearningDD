// pages/event/[id].js
import Events from '../../../components/ui/Events';
import EventDetails from '../../../enrollpages/EventsDetails';
import {event} from '../../../Pages/api/events'
import React from 'react';

const Page = ({ params }) => {
  const { id } = params;

  if (!id) {
    return <div>Error: Event ID not found</div>;
  }

  return (
    <>
      <EventDetails id={id} />
     
    </>
  );
};

export default Page;
