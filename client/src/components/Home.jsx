import React from 'react';
import Header from './Header';
import Button from './Button';
import Footer from './Footer';
import UploadedData from './uploadedData';
 
function Home() {
  // Retrieve the user id from localStorage
  const userId = localStorage.getItem('userId'); // Get `id` saved during signup/login
 
  return (
    <>
      <Header />
      <UploadedData/>
      <Button />
      <Footer />
    </>
  );
}

export default Home;
