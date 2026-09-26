import Navbar from '@/components/shared/Navbar';
import Banner from '@/components/shared/Banner';
import Library from '@/components/shared/Library';
import React from 'react';
import Footer from '@/components/shared/footer';

const page = () => {
  return (
    <div>
      
      <Banner></Banner>
      <Library></Library>
      
    </div>
  );
};

export default page;