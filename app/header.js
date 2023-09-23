'use client'
import React, { useContext } from 'react';
import Link from 'next/link';
import styles from './headerStyle.module.css'; // Define your header styles
// import userContext from './userContext'; // Import the context


const Header = ({username}) => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Your Logo</Link>
      </div>
      <div className={styles.user}>
        {username && <span>Welcome, {username}</span>}
      </div>
      
    </header>

    
  );
};

export default Header;
