import { Link } from 'react-router-dom';
import styles from './ModalPage.module.css';

export default function ModalPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>This is a modal</h1>
      <Link to="/" className={styles.link}>
        Go to home screen
      </Link>
    </div>
  );
}
