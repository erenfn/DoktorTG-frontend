'use client'

// pages/AddHospital.js
import React, { useState } from 'react';
import styles from '../addDoctor/addDoctorStyle.module.css';
import Link from 'next/link';
import { addHospital } from '../../api/requests';

const AddHospital = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const [notification, setNotification] = useState(null); // State for notification
  const [res, setRes] = useState({
    status: 500,
    text: 'Not Updated'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    try {
      addHospital(formData, setRes); // Pass the res object to addDoctor
      console.log(res.status);
      console.log(res.text);
      setNotification({ type: res.status, message: res.text });
      setTimeout(() => {
        setNotification(null); // Clear the notification after 10 seconds
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      // Handle error or show an error message
    }
  };

  return (
    <div className={styles.container}>

          {/* Notification */}
          {notification && (
        <div className={`${styles.notification} ${res.status === 200 ? styles.success : styles.error}`}>
          {notification.message}
        </div>
      )}


      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Hospital Name:
          <input
            className={styles.inputBox}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          Location:
          <input
            className={styles.inputBox}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton} onSubmit={handleSubmit} >Submit</button>
          <Link href="/" className={styles.backButton}>
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddHospital;
