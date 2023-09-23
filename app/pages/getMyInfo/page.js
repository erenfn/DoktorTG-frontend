'use client'

import React, { useState, useEffect } from 'react';
import styles from '../addDoctor/addDoctorStyle.module.css'; // Use the same styles
import { getMyInfo } from '../../api/requests';

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getMyInfo(setUserInfo); // Fetch user information
  }, []);

  return (
    <div className={styles.container}>
      {userInfo && (
        <div className={styles.form}>
          <label className={styles.label}>
            Name: {userInfo.name}
          </label>
          <label className={styles.label}>
            Surname: {userInfo.surname}
          </label>
          <label className={styles.label}>
            Phone: {userInfo.phone}
          </label>
          <label className={styles.label}>
            Email: {userInfo.email}
          </label>
        </div>
      )}
    </div>
  );
};

export default MyInformation;