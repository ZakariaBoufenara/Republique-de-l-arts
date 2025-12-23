"use client";
import React from 'react';
import { useLanguage } from './LanguageContext';

const Hero = () => {
    const { t, locale } = useLanguage();
    const isRTL = locale === 'ar';

    return (
        <section id="home" className={`hero-section ${isRTL ? 'rtl' : ''}`}>
            {/* Background artistic layers */}
            <div className="hero-bg-accent" />
            <div className="hero-bg-dots" />

            {/* Floating creative shapes */}
            <div className="shape shape-1" />
            <div className="shape shape-2" />
            <div className="shape shape-3" />

            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-badge animate-fade-in">
                        <span className="badge-dot" />
                        {locale === 'fr' ? 'Bienvenue à la République des Arts' : 'مرحباً بكم في الجمهورية للفنون'}
                    </div>

                    <h1 className="hero-title animate-slide-up">
                        {t.hero.title}
                    </h1>

                    <p className="hero-subtitle animate-slide-up-delayed">
                        {t.hero.subtitle}
                    </p>

                    <div className="hero-btns animate-fade-in-delayed">
                        <a href="#register" className="btn-hero-primary">
                            {t.hero.ctaRegister}
                            <span className="btn-shine" />
                        </a>
                        <a href="#contact" className="btn-hero-secondary">
                            {t.hero.ctaContact}
                        </a>
                    </div>

                    <div className="hero-stats animate-fade-in-long">
                        <div className="stat-item">
                            <span className="stat-num">500+</span>
                            <span className="stat-label">{locale === 'fr' ? 'Élèves' : 'تلميذ'}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-num">15+</span>
                            <span className="stat-label">{locale === 'fr' ? 'Experts' : 'خبير'}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-num">100%</span>
                            <span className="stat-label">{locale === 'fr' ? 'Passion' : 'شغف'}</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual animate-slide-left">
                    <div className="visual-frame">
                        <div className="visual-image" style={{ backgroundImage: 'url("/images/hero_art_new.png")' }} />
                        <div className="visual-overlay" />
                    </div>
                    {/* Floating small creative floating elements could be added here */}
                    <div className="floating-card music">🎶</div>
                    <div className="floating-card art">🎨</div>
                </div>
            </div>

            <style jsx>{`
                .hero-section {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    background-color: #FAF9F6;
                    position: relative;
                    overflow: hidden;
                    padding-top: 100px;
                    padding-bottom: 60px;
                }

                .hero-section.rtl {
                    direction: rtl;
                }

                /* Background Accents */
                .hero-bg-accent {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(233, 71, 26, 0.03) 0%, rgba(245, 245, 220, 0.4) 100%);
                    z-index: 0;
                    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
                }

                .hero-section.rtl .hero-bg-accent {
                    left: 0;
                    right: auto;
                    clip-path: polygon(0 0, 80% 0, 100% 100%, 0% 100%);
                }

                .hero-bg-dots {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: radial-gradient(#E9471A 0.5px, transparent 0.5px);
                    background-size: 30px 30px;
                    opacity: 0.05;
                    z-index: 0;
                }

                /* Floating Shapes */
                .shape {
                    position: absolute;
                    z-index: 1;
                    filter: blur(60px);
                    opacity: 0.4;
                    border-radius: 50%;
                }

                .shape-1 {
                    width: 400px;
                    height: 400px;
                    background: #E9471A;
                    top: -100px;
                    right: -100px;
                    animation: float 20s infinite alternate;
                }

                .shape-2 {
                    width: 300px;
                    height: 300px;
                    background: #2C3E50;
                    bottom: -50px;
                    left: -50px;
                    animation: float 25s infinite alternate-reverse;
                }

                .shape-3 {
                    width: 200px;
                    height: 200px;
                    background: #F5F5DC;
                    top: 20%;
                    left: 10%;
                }

                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    100% { transform: translate(40px, 60px) rotate(10deg); }
                }

                .hero-container {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    align-items: center;
                    gap: 4rem;
                    position: relative;
                    z-index: 2;
                }

                .hero-section.rtl .hero-container {
                    /* Unchanged grid columns for RTL to maintain size ratios */
                }

                /* Content Styles */
                .hero-content {
                    text-align: center;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding: 0.6rem 1.2rem;
                    background: white;
                    border: 1px solid rgba(233, 71, 26, 0.1);
                    border-radius: 100px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: #E9471A;
                    color: #E9471A;
                    margin: 0 auto 2rem auto;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                }

                .badge-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #E9471A;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #E9471A;
                }

                .hero-title {
                    font-size: clamp(2.5rem, 4vw, 3.5rem);
                    font-family: 'Playfair Display', serif;
                    font-weight: 900;
                    color: #2C3E50;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                    text-align: center;
                }
                
                .hero-section.rtl .hero-title {
                    font-family: 'Outfit', sans-serif; /* Best for Arabic Bold */
                    line-height: 1.3;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: #64748B;
                    line-height: 1.7;
                    max-width: 600px;
                    max-width: 600px;
                    margin: 0 auto 3rem auto;
                    font-weight: 500;
                }

                .hero-btns {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 4rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .btn-hero-primary {
                    position: relative;
                    padding: 1.2rem 3rem;
                    background-color: #E9471A;
                    color: white;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 1.1rem;
                    text-decoration: none;
                    box-shadow: 0 10px 25px rgba(233, 71, 26, 0.3);
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .btn-hero-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(233, 71, 26, 0.4);
                }

                .btn-hero-secondary {
                    padding: 1.2rem 3rem;
                    background-color: transparent;
                    color: #2C3E50;
                    border: 2px solid rgba(44, 62, 80, 0.15);
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .btn-hero-secondary:hover {
                    background-color: rgba(44, 62, 80, 0.05);
                    border-color: #2C3E50;
                }

                /* Stats */
                .hero-stats {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2.5rem;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-num {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: #2C3E50;
                    font-family: 'Outfit', sans-serif;
                }

                .stat-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #64748B;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .stat-divider {
                    width: 1px;
                    height: 40px;
                    background-color: rgba(44, 62, 80, 0.1);
                }

                /* Visual Part */
                .hero-visual {
                    position: relative;
                    width: 100%;
                }

                .visual-frame {
                    position: relative;
                    aspect-ratio: 4/5;
                    border-radius: 40px;
                    overflow: hidden;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
                    border: 12px solid white;
                    transform: rotate(3deg);
                }

                .visual-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.6s ease;
                }

                .visual-frame:hover .visual-image {
                    transform: scale(1.08);
                }

                .visual-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%);
                }

                .floating-card {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    background: white;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    z-index: 10;
                    animation: float-card 6s infinite ease-in-out;
                }

                .music { top: 20%; left: -30px; animation-delay: 1s; }
                .art { bottom: 20%; right: -20px; animation-delay: 2s; }

                @keyframes float-card {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }

                /* Animations */
                .animate-fade-in { animation: fadeIn 1s forwards; }
                .animate-slide-up { animation: slideUp 1s forwards; }
                .animate-slide-up-delayed { animation: slideUp 1s 0.2s forwards; opacity: 0; }
                .animate-fade-in-delayed { animation: fadeIn 1s 0.4s forwards; opacity: 0; }
                .animate-fade-in-long { animation: fadeIn 1.5s 0.6s forwards; opacity: 0; }
                .animate-slide-left { animation: slideLeft 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; opacity: 0; }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideLeft {
                    from { opacity: 0; transform: translateX(50px) rotate(5deg); }
                    to { opacity: 1; transform: translateX(0) rotate(3deg); }
                }

                /* Mobile Optimization */
                @media (max-width: 1024px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 5rem;
                    }
                    
                    .hero-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .hero-visual {
                        max-width: 500px;
                        margin: 0 auto;
                    }

                    .hero-bg-accent { width: 100%; clip-path: none; opacity: 0.1; }
                    .hero-bg-dots { opacity: 0.03; }
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 2.8rem; }
                    .hero-btns { justify-content: center; }
                    .hero-stats { flex-direction: column; gap: 1.5rem; }
                    .stat-divider { display: none; }
                }

                @media (max-width: 480px) {
                    .hero-title { font-size: 2.2rem; }
                    .hero-section { padding-top: 80px; }
                    .btn-hero-primary, .btn-hero-secondary { padding: 1rem 2rem; width: 100%; text-align: center; }
                    .hero-btns { gap: 1rem; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
