// pages/HospitalsList.js
"use client"
import React, { useEffect, useState } from 'react';
import styles from '../getAllDoctors/getAllDoctorsStyle.module.css';
import Link from 'next/link';
import { getAllHospitals } from '../../api/requests';
import MorePagination from '../../components/MorePagesPagination/MorePagesPagination';

const HospitalsList = () => {
  const [hospitalsData, setHospitalsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 10;

  useEffect(() => {
    getAllHospitals(setHospitalsData); // Fetch data and update state on component mount
  }, []);

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = hospitalsData.slice(indexOfFirstHospital, indexOfLastHospital);

  const totalPages = Math.ceil(hospitalsData.length / hospitalsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentHospitals.map((hospital, index) => (
            <tr key={index}>
              <td>{hospital.name}</td>
              <td>{hospital.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
      <MorePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>

      <Link className={styles.button} href="/">
        Back To home
      </Link>
    </div>
  );
};

export default HospitalsList;