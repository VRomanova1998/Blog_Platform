import { Link } from 'react-router-dom';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className={styles.tittle}>Realworld Blog</span>
      </Link>
      <section className={styles.buttonContainer}>
        <button className={styles.button}>Sign In</button>
        <button className={[styles.button, styles.active].join(' ')}>Sign Up</button>
      </section>
    </div>
  );
};
