"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { Presentation, Disciplines, Advantages, Audiences, RegistrationForm } from '../components/Sections';
import { useLanguage } from '../components/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const phoneNumber = "+212500000000";
  const whatsAppNumber = "212500000000";

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Presentation />
        <Disciplines />
        <Advantages />
        <Audiences />
        <RegistrationForm />

        {/* Contact Section */}
        <section id="contact" style={{ backgroundColor: '#FAF9F6' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{
              backgroundColor: '#E9471A',
              padding: '1.2rem 3.5rem',
              display: 'inline-block',
              borderRadius: '100px',
              boxShadow: '0 10px 30px rgba(233, 71, 26, 0.2)',
              marginBottom: '3rem'
            }}>
              <h2 style={{
                color: '#FFFFFF',
                margin: 0,
                fontSize: '3rem',
                fontFamily: "'Playfair Display', serif",
                fontWeight: '900'
              }}>{t.nav.contact}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <a href={`tel:${phoneNumber}`} className="btn" style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '2rem',
                borderRadius: '24px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.02)'
              }}>
                <span style={{ fontSize: '2.5rem' }}>📞</span>
                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#E9471A' }}>{t.contact.call}</span>
                <span style={{ color: '#64748B' }}>{phoneNumber}</span>
              </a>

              <a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noopener noreferrer" className="btn" style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '2rem',
                borderRadius: '24px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.02)'
              }}>
                <span style={{ fontSize: '3rem' }}>💬</span>
                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#25D366' }}>{t.contact.whatsapp}</span>
                <span style={{ color: '#64748B' }}>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        backgroundColor: '#2C3E50',
        color: '#ffffff',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <img
            src="/logo.jpg"
            alt="République des Arts"
            style={{
              height: '80px',
              width: 'auto',
              marginBottom: '1rem',
              borderRadius: '8px',
              imageRendering: '-webkit-optimize-contrast',
              filter: 'grayscale(20%) brightness(0.9)',
              opacity: 0.9
            }}
          />
          <div style={{ fontWeight: '800', fontSize: '1.8rem', color: '#E9471A', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>
            République des Arts
          </div>
          <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{t.footer.rights}</p>
        </div>
      </footer>

      <style jsx global>{`
        @media (max-width: 768px) {
          h1 { font-size: 2.8rem !important; }
          h2 { font-size: 2.2rem !important; }
          .container { padding: 0 1.5rem; }
          .nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
