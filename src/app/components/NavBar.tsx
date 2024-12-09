import React from 'react';
import styles from './styles/NavBar.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <Link href='/articles'>
      <nav className={styles.navbar}>
        <div className={styles.navText}>Articles</div>
      </nav>
    </Link>
  );
};

export default NavBar;
