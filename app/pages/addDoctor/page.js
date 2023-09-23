"use client"
import React, { useState } from 'react';
import styles from './addDoctorStyle.module.css';
import Link from 'next/link';
import { addDoctor } from '../../api/requests';

const FormPage = ({ }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    phone_number: '',
    email: '',
    hospital: ''
  });

  const [res, setRes] = useState({
    status: 500,
    text: 'Not Updated'
  });

  const [notification, setNotification] = useState(null); // State for notification

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addDoctor(formData, setRes); // Pass the res object to addDoctor
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


      <form onSubmit={handleSubmit} className={styles.form} method='post'>
        <label className={styles.label}>
          Name:
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
          Department:
          <input 
            className={styles.inputBox}
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          Phone Number:
          <input 
            className={styles.inputBox}
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          Email:
          <input
            className={styles.inputBox}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          Hospital:
          <input
            className={styles.inputBox}
            type="text"
            name="hospital"
            value={formData.hospital}
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

export default FormPage;