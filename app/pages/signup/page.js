"use client"

import React, { useState } from 'react';
import styles from '../addDoctor/addDoctorStyle.module.css';
import Link from 'next/link';
import { signup } from '../../api/requests';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation'
// import  userContext  from '../../userContext'; // Update with the correct path
// import { useContext } from 'react';

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const FormPage = ({ }) => {
  const router = useRouter();
  // const { setUsername } = useContext(userContext); // Access setUsername from context
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: ''
  });

  const [res, setRes] = useState({
    status: 500,
    text: 'Not Updated'
  });

  const [notification, setNotification] = useState(null); // State for notification
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signup(formData, setRes, setCookie, setUsername); 
      console.log(res.status);
      console.log(res.text);
      setNotification({ type: res.status, message: res.text });
      setTimeout(() => {
        setNotification(null); // Clear the notification after 10 seconds
      }, 3000);
      router.push('/'); // Use Next.js navigation to redirect to the home page
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
          Surname:
          <input 
            className={styles.inputBox}
            type="text"
            name="surname"
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
            name="phone"
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
          Password:
          <input
            className={styles.inputBox}
            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {/* Toggle password visibility */}
        <label className={styles.showPasswordLabel}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />{' '}
          Show Password
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