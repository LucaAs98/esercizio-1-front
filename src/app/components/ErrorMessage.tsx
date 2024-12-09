import React from 'react';
import styles from './styles/ErrorMessage.module.css';

const ErrorMessage: React.FC<{ error: { title: string; description: string } }> = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBox}>
        <h2>{error.title}</h2>
        <p>{error.description}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
