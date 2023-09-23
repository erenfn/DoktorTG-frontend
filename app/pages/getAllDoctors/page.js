// pages/DoctorsList.js
"use client"
import React, { useEffect, useState } from 'react';
import styles from './getAllDoctorsStyle.module.css';
import Link from 'next/link';
import { getAllDoctors } from '../../api/requests';
import MorePagination from '../../components/MorePagesPagination/MorePagesPagination';

const DoctorsList = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;

  useEffect(() => {
    getAllDoctors(setDoctorsData); // Fetch data and update state on component mount
  }, []);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorsData.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(doctorsData.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Hospital</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>{doctor.department}</td>
              <td>{doctor.phone_number}</td>
              <td>{doctor.email}</td>
              <td>{doctor.hospital}</td>
            </tr>
          ))}
        </tbody>
      </table>
{/* 
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? styles.active : ''}>
            {index + 1}
          </span>
        ))}
      </div> */}
      <div>
      <MorePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>

      <Link className={styles.button} href="/">
        Back To home
      </Link>
    </div>
  );
};

export default DoctorsList;