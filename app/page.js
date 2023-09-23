import Link from 'next/link';
import styles from './home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>DoktorumGelsin</h1>
      <Link className={styles.button} href="/pages/getAllDoctors">
        View Doctors List
      </Link>
      <Link className={styles.button} href="/pages/addDoctor">
        Add Doctors
      </Link>
      <Link className={styles.button} href="/pages/addHospital">
        Add Hospital
      </Link>
      <Link className={styles.button} href="/pages/getAllHospitals">
        View Hospitals List
      </Link>
      <Link className={styles.button} href="/pages/signup">
        Signup
      </Link>
      <Link className={styles.button} href="/pages/getMyInfo">
        GetMyInfo
      </Link>
    </div>
  );
};

export default HomePage;