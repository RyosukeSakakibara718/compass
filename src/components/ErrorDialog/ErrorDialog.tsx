import React from 'react';
import styles from './ErrorDialog.module.scss';

type ErrorDialogProps = {
  message: string;
  onRetry: () => void;
};

const ErrorDialog: React.FC<ErrorDialogProps> = ({ message, onRetry }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <button className={styles.retryButton} onClick={onRetry}>
          リトライ
        </button>
      </div>
    </div>
  );
};

export default ErrorDialog;
