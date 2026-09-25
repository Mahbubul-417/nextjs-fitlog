import Navbar from '@/components/shared/Navbar';
import Banner from '@/components/shared/Banner';
import Library from '@/components/shared/Library';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Library></Library>
    </div>
  );
};

export default page;