"use client"
import React, { useState } from 'react';
import './globals.css'; // Import your global styles
import { Inter } from 'next/font/google';
import Header from './header'; // Import the Header component
// import userContext from './userContext'; // Import the context
import FormPage from './pages/signup/page';

const inter = Inter({ subsets: ['latin'] });


const Layout = ({ children }) => {
  const [username, setUsername] = useState('')
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <userContext.Provider value={{ setUsername }}> */}
          <div>
            <Header username={username} /> 
          </div>
        {/* </userContext.Provider> */}
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;