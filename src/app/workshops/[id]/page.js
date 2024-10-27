import WorkshopDetails from '@/enrollpages/WorkshopDetails'; // Ensure the path is correct
import React from 'react';

const Page = ({ params }) => {
  console.log(params, "params"); // Debugging log

  // Extract the id from params
  const { id } = params;

  if (!id) {
    return <div>Error: Workshop ID not found</div>;
  }

  return (
    <>
      <WorkshopDetails id={id} />
    </>
  );
};

export default Page;