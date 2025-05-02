import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => (
  <div className={styles.overlay}>
    <div className={styles.loader} />
  </div>
);

export default Loader;
