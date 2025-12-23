"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const Navbar = () => {
    const { t, locale, toggleLanguage } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isRTL = locale === 'ar';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: t.nav.home },
        { href: "#about", label: t.nav.about },
        { href: "#disciplines", label: t.nav.disciplines },
        { href: "#advantages", label: t.nav.advantages },
        { href: "#audiences", label: t.nav.audiences },
        { href: "#contact", label: t.nav.contact },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className={`container nav-container ${isRTL ? 'rtl' : ''}`}>
                {/* Logo Section */}
                <a href="#home" className="brand">
                    <img
                        src="/logo.jpg"
                        alt="République des Arts"
                        className="logo-img"
                    />
                    <div className="brand-text">
                        <span className="brand-name">République</span>
                        <span className="brand-sub">des Arts</span>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="menu-wrapper">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} className="nav-link">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA / Language Toggle */}
                    <div className="nav-actions">
                        <button
                            onClick={toggleLanguage}
                            className="lang-btn"
                        >
                            <span className="lang-icon">🌐</span>
                            {locale === 'fr' ? 'العربية' : 'Français'}
                        </button>
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-overlay ${mobileMenuOpen ? 'show' : ''}`}>
                <ul className="mobile-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li className="mobile-actions">
                        <button
                            onClick={() => {
                                toggleLanguage();
                                setMobileMenuOpen(false);
                            }}
                            className="mobile-lang-btn"
                        >
                            {locale === 'fr' ? 'العربية' : 'Français'}
                        </button>
                    </li>
                </ul>
            </div>

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 2000;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    padding: 24px 0;
                    background: transparent;
                }

                .navbar.scrolled {
                    padding: 12px 0;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(15px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    border-bottom: 1px solid rgba(233, 71, 26, 0.1);
                }

                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-container.rtl {
                    flex-direction: row-reverse;
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    text-decoration: none;
                }

                .logo-img {
                    height: 85px;
                    width: auto;
                    transition: all 0.4s ease;
                    border-radius: 12px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    border: 2px solid white;
                }

                .scrolled .logo-img {
                    height: 55px;
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1;
                }

                .brand-name {
                    font-size: 1.6rem;
                    font-weight: 800;
                    color: #E9471A;
                    font-family: 'Outfit', sans-serif;
                    letter-spacing: -0.5px;
                }

                .brand-sub {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #2C3E50;
                    font-family: 'Outfit', sans-serif;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-top: 2px;
                }

                .scrolled .brand-name { font-size: 1.3rem; }
                .scrolled .brand-sub { font-size: 0.85rem; }

                .menu-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 3rem;
                }

                .nav-links {
                    display: flex;
                    gap: 2.2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-link {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #2C3E50;
                    text-decoration: none;
                    position: relative;
                    padding: 4px 0;
                    transition: color 0.3s ease;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #E9471A;
                    transition: width 0.3s ease;
                }

                .nav-link:hover {
                    color: #E9471A;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                }

                .lang-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(233, 71, 26, 0.08);
                    color: #E9471A;
                    border: 1.5px solid rgba(233, 71, 26, 0.1);
                    padding: 0.6rem 1.2rem;
                    border-radius: 50px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .lang-btn:hover {
                    background: #E9471A;
                    color: white;
                    border-color: #E9471A;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(233, 71, 26, 0.2);
                }

                /* Hamburger */
                .hamburger {
                    display: none;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 30px;
                    height: 24px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 2500;
                }

                .bar {
                    width: 30px;
                    height: 2.5px;
                    background: #2C3E50;
                    border-radius: 10px;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform-origin: left center;
                }

                .hamburger.active .bar:nth-child(1) { transform: rotate(45deg); width: 33px; }
                .hamburger.active .bar:nth-child(2) { opacity: 0; }
                .hamburger.active .bar:nth-child(3) { transform: rotate(-45deg); width: 33px; }

                /* Mobile Menu Overlay */
                .mobile-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: white;
                    z-index: 2100;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: translateY(-100%);
                    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                .mobile-overlay.show {
                    transform: translateY(0);
                }

                .mobile-links {
                    list-style: none;
                    text-align: center;
                    padding: 0;
                }

                .mobile-link {
                    display: block;
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    color: #2C3E50;
                    text-decoration: none;
                    margin: 1.5rem 0;
                    transition: color 0.3s ease;
                }

                .mobile-link:hover { color: #E9471A; }

                .mobile-lang-btn {
                    margin-top: 2rem;
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    background: #E9471A;
                    color: white;
                    border: none;
                    font-size: 1.2rem;
                    font-weight: 700;
                    cursor: pointer;
                }

                @media (max-width: 1024px) {
                    .menu-wrapper { display: none; }
                    .hamburger { display: flex; }
                    .navbar { padding: 15px 0; }
                    .logo-img { height: 60px; }
                    .brand-name { font-size: 1.3rem; }
                    .brand-sub { font-size: 0.8rem; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
