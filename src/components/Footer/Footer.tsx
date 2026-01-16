import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <span className={styles.logoAccent}>DRONE</span> technology
          </div>
          
          <div className={styles.info}>
            <p>© 2026 Drone Technology: Торговый сайт</p>
            <a href="#privacy" className={styles.privacyLink}>
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;