// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Loading.module.css';
import loading from '../../assets/img/loading.gif';

const Loading = () => {
  return (
    <div className={styles.container}>
      <img src={loading} alt="loading gif" />
    </div>
  );
};

export default Loading;
