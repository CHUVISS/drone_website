import React, { useState, useEffect, useRef } from 'react';
import { ContactFormData, NewsItem, FeatureItem, FAQItem } from '../../types';
import styles from './HomePage.module.css';

// Импорт локальных изображений DJI
import djiNeoImage from '../../assets/images/products/Neo.jpg';
import djiControllerImage from '../../assets/images/products/Remote.jpg';
import djiGogglesImage from '../../assets/images/products/goggles.jpg';

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    agree: false
  });

  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', agree: false });
  };

  const features: FeatureItem[] = [
    {
      title: '1000+ товаров',
      description: 'Поставляем продукты ведущих мировых брендов'
    },
    {
      title: 'Сотрудничаем с юр. и физ. лицами',
      description: 'Осуществляем официальные международные поставки по договору с юридическими лицами'
    },
    {
      title: '100% надежность',
      description: 'Проверенное качество всех продуктов'
    },
    {
      title: 'Доступность',
      description: 'Удобный поиск и оформление заказов'
    }
  ];

  const newsItems: NewsItem[] = [
    {
      date: '3 июня 2025',
      title: 'В России испытана спутниковая связь 5G для управления БПЛА'
    }
  ];

  const faqItems: FAQItem[] = [
    { question: 'Какие типы дронов бывают и чем они отличаются?' },
    { question: 'Как правильно подключить полётный контроллер и ESC к дрону?' }
  ];

  const companyFeatures = [
    'Широкий ассортимент комплектующих для дронов',
    'Надёжность и проверенное качество всех продуктов',
    'Поддержка профессионалов и энтузиастов',
    'Удобный поиск и оформление заказов'
  ];

  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section 
        className={`${styles.heroSection} ${visibleSections.has('hero') ? styles.visible : ''}`} 
        id="catalog"
        ref={setSectionRef('hero')}
        data-section-id="hero"
      >
        <div className={styles.heroBackground}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h2 className={styles.sectionTitle}>Товары</h2>
            <div className={styles.productCard}>
              <div className={styles.productBadge}>New</div>
              <h3 className={styles.productTitle}>FPV комплект DJI Neo</h3>
              <p className={styles.productDescription}>
                Готовый комплект от DJI — всё, что нужно для уверенного и комфортного управления квадрокоптером: 
                дрон DJI Neo, очки Goggles N3, пульт DJI Remote Controller 3 и интеллектуальная батарея. 
                Максимальная интеграция и надёжность для современных задач.
              </p>
              <div className={styles.productButtons}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  <span>Подробнее</span>
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  <span>Задать вопрос</span>
                </button>
              </div>
              
              <div className={styles.productImages}>
                <div className={styles.productImage}>
                  <img 
                    src={djiNeoImage} 
                    alt="DJI Neo Drone" 
                    className={styles.productImg}
                    loading="lazy"
                  />
                  <div className={styles.imageLabel}>DJI NEO</div>
                </div>
                <div className={styles.productImage}>
                  <img 
                    src={djiControllerImage} 
                    alt="DJI Remote Controller 3" 
                    className={styles.productImg}
                    loading="lazy"
                  />
                  <div className={styles.imageLabel}>DJI REMOTE CONTROLLER 3</div>
                </div>
                <div className={styles.productImage}>
                  <img 
                    src={djiGogglesImage} 
                    alt="DJI Goggles N3" 
                    className={styles.productImg}
                    loading="lazy"
                  />
                  <div className={styles.imageLabel}>DJI GOGGLES N3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Остальной код остается без изменений */}
      {/* Features Section */}
      <section 
        className={`${styles.featuresSection} ${visibleSections.has('features') ? styles.visible : ''}`}
        ref={setSectionRef('features')}
        data-section-id="features"
      >
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={styles.feature}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.featureIcon}>
                  <div className={styles.iconCircle}></div>
                  <div className={styles.iconNumber}>{index + 1}</div>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <div className={styles.featureLine}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section 
        className={`${styles.newsSection} ${visibleSections.has('news') ? styles.visible : ''}`} 
        id="news"
        ref={setSectionRef('news')}
        data-section-id="news"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Новости</h2>
            <div className={styles.sectionLine}></div>
          </div>
          <div className={styles.newsContent}>
            <div className={styles.newsHeader}>
              <h3 className={styles.newsSubtitle}>События компании</h3>
              <p className={styles.newsDescription}>
                Мы публикуем проверенные данные о продуктах, обзоры новинок, анонсы мероприятий и полезные советы 
                для профессионалов и энтузиастов.
              </p>
            </div>
            
            <div className={styles.newsGrid}>
              {newsItems.map((item, index) => (
                <div key={index} className={styles.newsItem}>
                  <div className={styles.newsDate}>{item.date}</div>
                  <h4 className={styles.newsTitle}>{item.title}</h4>
                  <div className={styles.newsLine}></div>
                  <button className={styles.newsButton}>
                    Читать далее
                    <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section 
        className={`${styles.articlesSection} ${visibleSections.has('articles') ? styles.visible : ''}`} 
        id="articles"
        ref={setSectionRef('articles')}
        data-section-id="articles"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Всё самое интересное</h2>
            <div className={styles.sectionLine}></div>
          </div>
          
          <p className={styles.articlesIntro}>
            Здесь вы найдёте подробные обзоры, инструкции, советы по выбору оборудования и рекомендации по настройке дронов.
          </p>
          
          <div className={styles.articleGrid}>
            <div className={styles.articleCard}>
              <div className={styles.articleImage}>
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.articleContent}>
                <div className={styles.articleCategory}>Технологии</div>
                <h3 className={styles.articleTitle}>
                  Газодроны: как дроны помогают контролировать утечки и загрязнение воздуха
                </h3>
                <p className={styles.articleExcerpt}>
                  Инновационные решения для экологического мониторинга с использованием современных технологий.
                </p>
                <button className={styles.articleButton}>
                  Читать статью
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.faqSection}>
              <div className={styles.faqHeader}>
                <h3 className={styles.faqTitle}>Ответы на популярные вопросы</h3>
                <h4 className={styles.faqSubtitle}>Вопрос-ответ</h4>
                <div className={styles.faqLine}></div>
              </div>
              
              <div className={styles.faqList}>
                {faqItems.map((item, index) => (
                  <div key={index} className={styles.faqItem}>
                    <div className={styles.faqQuestion}>
                      <div className={styles.questionIcon}>?</div>
                      <h5>{item.question}</h5>
                      <button className={styles.faqToggle}>
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <div className={styles.faqAnswer}>
                      <p>Подробный ответ на вопрос будет доступен при клике.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section 
        className={`${styles.companySection} ${visibleSections.has('company') ? styles.visible : ''}`} 
        id="company"
        ref={setSectionRef('company')}
        data-section-id="company"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Компания</h2>
            <div className={styles.sectionLine}></div>
          </div>
          
          <div className={styles.companyContent}>
            <div className={styles.companyText}>
              <p className={styles.companyDescription}>
                Наша компания оказывает услуги по сборке и настройке БПЛА любого типа, а также по сборке 
                аккумуляторных батарей любой модификации.
              </p>
              <p className={styles.companyDescription}>
                Гибкие решения для предпринимателей, опытные специалисты и 20 000 реализованных проектов.
              </p>
              
              <button className={`${styles.btn} ${styles.btnPrimary} ${styles.companyButton}`}>
                <span>Подробнее</span>
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.companyStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>20K+</div>
                <div className={styles.statLabel}>Проектов</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>Товаров</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10+</div>
                <div className={styles.statLabel}>Лет опыта</div>
              </div>
            </div>
          </div>
          
          <div className={styles.companyInfo}>
            <h3 className={styles.whyUsTitle}>Почему выбирают нас</h3>
            <div className={styles.featuresGrid}>
              {companyFeatures.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section 
        className={`${styles.contactsSection} ${visibleSections.has('contacts') ? styles.visible : ''}`} 
        id="contacts"
        ref={setSectionRef('contacts')}
        data-section-id="contacts"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Контакты</h2>
            <div className={styles.sectionLine}></div>
          </div>
          
          <div className={styles.contactsGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactHeader}>
                <h3>Drone Technology</h3>
                <p>г. Москва, ул. Фабрициуса, д. 31А, вход №1</p>
              </div>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📍</div>
                  <div>
                    <h4>Станция метро</h4>
                    <p>Сходненская</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>🕐</div>
                  <div>
                    <h4>Режим работы</h4>
                    <p>Пн - Пт: 09:30 - 19:00</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📞</div>
                  <div>
                    <h4>Телефон</h4>
                    <p>+7 (936) 210-10-00</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@dronetechnology.ru</p>
                  </div>
                </div>
              </div>
              
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                Написать сообщение
              </button>
            </div>
            
            <div className={styles.contactFormSection}>
              <div className={styles.formHeader}>
                <h3>Оставьте заявку</h3>
                <p>Оставьте заявку, и наш специалист свяжется с вами для консультации</p>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ваше имя *"
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Телефон *"
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formCheckbox}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      required
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxCustom}></span>
                    <span className={styles.checkboxText}>
                      Я согласен на обработку персональных данных
                    </span>
                  </label>
                </div>
                
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Отправить заявку
                </button>
              </form>
              
              <div className={styles.newsletter}>
                <h4>Подписаться на рассылку</h4>
                <div className={styles.newsletterForm}>
                  <input 
                    type="email" 
                    placeholder="Ваш email" 
                    className={styles.newsletterInput}
                  />
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.newsletterButton}`}>
                    Подписаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;