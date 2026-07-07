import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import ContactCard from './components/ContactCard.jsx';
import Footer from './components/Footer.jsx';
import Logo from './components/Logo.jsx';
import Reveal from './components/Reveal.jsx';
import SocialLinks from './components/SocialLinks.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { CONTACT } from './config/contact.js';

const ContactForm = lazy(() => import('./components/ContactForm.jsx'));

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const heroTitle = useMemo(() => {
    return CONTACT.tagline || 'Let\'s connect.';
  }, []);

  const messageSectionRef = useRef(null);
  const [showContactForm, setShowContactForm] = useState(() => {
    return typeof window !== 'undefined' && window.location?.hash === '#message';
  });

  useEffect(() => {
    if (showContactForm) return;
    const el = messageSectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setShowContactForm(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowContactForm(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: '500px 0px', threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [showContactForm]);

  return (
    <div className="page">
      <header className="header">
        <div className="container header__inner">
          <div className="header__brand">
            <Logo size={22} className="header__logo" />
            <span className="header__name">Ritik Kumar</span>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1 className="hero__title">
            {CONTACT.name}
            <span className="hero__mark" aria-hidden="true" />
          </h1>
          <p className="hero__tagline">{heroTitle}</p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true">
        <hr className="section-divider__rule" />
      </div>

      <main className="container grid">
        <section className="stack stack--sticky">
          <Reveal delayMs={0}>
            <ContactCard contact={CONTACT} />
          </Reveal>
        </section>

        <section className="stack" id="message" ref={messageSectionRef}>
          <Reveal delayMs={90}>
            {showContactForm ? (
              <Suspense fallback={<div className="card"><div className="card__inner"><div className="hint">Loading form&hellip;</div></div></div>}>
                <ContactForm contact={CONTACT} />
              </Suspense>
            ) : (
              <div className="card">
                <div className="card__inner">
                  <div className="hint">Form loads as you scroll.</div>
                </div>
              </div>
            )}
          </Reveal>
        </section>
      </main>

      <section className="social-section">
        <div className="container">
          <Reveal delayMs={40}>
            <SocialLinks links={CONTACT.socialLinks} />
          </Reveal>
        </div>
      </section>

      <Footer contact={CONTACT} />
    </div>
  );
}
