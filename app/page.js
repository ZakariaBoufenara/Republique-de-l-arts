"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { Presentation, Disciplines, Advantages, Audiences, ContactUs } from '../components/Sections';
import { useLanguage } from '../components/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Presentation />
        <Disciplines />
        <Advantages />
        <Audiences />
        <ContactUs />
      </main>

      <footer style={{
        backgroundColor: '#1E293B',
        color: '#ffffff',
        padding: '4rem 0 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            {/* Footer Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <img src="/logo.jpg" alt="Logo" style={{ width: '50px', borderRadius: '10px' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: "'Outfit', sans-serif" }}>
                République <span style={{ color: '#E9471A' }}>des Arts</span>
              </span>
            </div>

            {/* Little Information */}
            <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.7, lineHeight: '1.6', fontSize: '1rem' }}>
              {t.footer.description}
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0', width: '100%' }}></div>

          <p style={{ opacity: 0.5, fontSize: '0.9rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} République des Arts. {t.footer.rights}
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @media (max-width: 768px) {
          h1 { font-size: 2.8rem !important; }
          h2 { font-size: 2.2rem !important; }
          .container { padding: 0 1.5rem; }
        }
      `}</style>
    </>
  );
}
