import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'company', label: 'Компания' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'news', label: 'Новости' },
    { id: 'articles', label: 'Статьи' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>
            <span className={styles.logoAccent}>DRONE</span> technology
          </h1>
          <div className={styles.logoLine}></div>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={styles.navButton}
              aria-label={item.label}
            >
              <span className={styles.navText}>{item.label}</span>
              <span className={styles.navLine}></span>
            </button>
          ))}
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <div className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;