"use client";
import React from 'react';
import { useLanguage } from './LanguageContext';

export const Presentation = () => {
    const { t, locale } = useLanguage();
    const isRTL = locale === 'ar';

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" style={{ backgroundColor: '#ffffff', padding: '100px 0', overflow: 'hidden' }}>
            <div className="container">
                {/* Section Title */}
                <div className="animate-on-scroll slide-up" style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <div className="section-badge">
                        {locale === 'ar' ? 'من نحن' : 'Qui sommes-nous ?'}
                    </div>
                    <h2 className="section-heading">{t.presentation.title}</h2>
                </div>

                {/* Vision Feature */}
                <div className="feature-row">
                    <div className="feature-image-wrapper animate-on-scroll slide-right">
                        <div className="feature-image" style={{ backgroundImage: 'url("/images/vision_flow.png")' }} />
                        <div className="feature-blob blob-1" />
                    </div>
                    <div className="feature-content animate-on-scroll slide-left">
                        <div className="feature-icon">👁️</div>
                        <h3>{t.presentation.vision}</h3>
                        <p>{t.presentation.visionText}</p>
                    </div>
                </div>

                {/* Approach Feature */}
                <div className={`feature-row ${isRTL ? '' : 'reversed'}`}>
                    <div className="feature-content animate-on-scroll slide-right">
                        <div className="feature-icon">🎨</div>
                        <h3>{t.presentation.approach}</h3>
                        <p>{t.presentation.approachText}</p>
                    </div>
                    <div className="feature-image-wrapper animate-on-scroll slide-left">
                        <div className="feature-image" style={{ backgroundImage: 'url("/images/approach_flow.png")' }} />
                        <div className="feature-blob blob-2" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .section-badge {
                    display: inline-block;
                    padding: 0.6rem 1.5rem;
                    background: rgba(233, 71, 26, 0.1);
                    color: #E9471A;
                    border-radius: 50px;
                    font-weight: 700;
                    font-family: 'Outfit', sans-serif;
                    margin-bottom: 1.5rem;
                }

                .section-heading {
                    font-size: 3rem;
                    font-family: 'Playfair Display', serif;
                    font-weight: 900;
                    color: #2C3E50;
                    margin: 0;
                }

                .feature-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 5rem;
                    align-items: center;
                    margin-bottom: 6rem;
                }

                .feature-row.reversed {
                    direction: ltr; /* Force LTR for layout logic, handled manually */
                }
                
                /* In LTR mode, .reversed means Text Left, Image Right. 
                   In main layout text flow handles itself. 
                   We just need to swap order if we want Zig-Zag manually or use order css. 
                   Let's use simple order switching for responsiveness.
                */
                
                .feature-image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/3;
                    border-radius: 24px;
                    overflow: visible; /* For blob */
                }

                .feature-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    border-radius: 24px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    position: relative;
                    z-index: 2;
                    transition: transform 0.5s ease;
                }

                .feature-image:hover {
                    transform: scale(1.02);
                }

                .feature-blob {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 20px;
                    left: 20px;
                    border-radius: 24px;
                    z-index: 1;
                    opacity: 0.5;
                }

                .blob-1 { background-color: #E9471A; }
                .blob-2 { background-color: #2C3E50; }

                .feature-content {
                    padding: 2rem;
                }

                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                    background: white;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    color: #E9471A;
                }

                .feature-content h3 {
                    font-size: 2.5rem;
                    font-family: 'Playfair Display', serif;
                    color: #2C3E50;
                    margin-bottom: 1.5rem;
                }

                .feature-content p {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: #64748B;
                }

                /* Animations */
                .animate-on-scroll { opacity: 0; transition: all 1s ease-out; }
                .slide-up { transform: translateY(30px); }
                .slide-left { transform: translateX(30px); }
                .slide-right { transform: translateX(-30px); }

                .is-visible { opacity: 1; transform: translate(0); }

                @media (max-width: 1024px) {
                    .feature-row {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                        text-align: center;
                    }

                    .feature-content {
                        order: 2;
                        padding: 0;
                    }
                    
                    .feature-image-wrapper {
                        order: 1;
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .feature-icon { margin: 0 auto 1.5rem auto; }
                }

                @media (max-width: 480px) {
                    .section-heading { font-size: 2.5rem; }
                    .feature-content h3 { font-size: 2rem; }
                    .feature-image-wrapper { aspect-ratio: 1; }
                }
            `}</style>
        </section>
    );
};

const DisciplineCard = ({ title, content, image, rotation, offset, isRTL }) => {
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const [centerTransform, setCenterTransform] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current || window.innerWidth < 1024) return;

        if (!isHovered) {
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            setCenterTransform({
                x: centerX - cardCenterX,
                y: centerY - cardCenterY
            });
            setIsHovered(true);
        }

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cX = rect.width / 2;
        const cY = rect.height / 2;

        const tX = (y - cY) / 25;
        const tY = (cX - x) / 25;
        setTilt({ x: tX, y: tY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
        setCenterTransform({ x: 0, y: 0 });
    };

    return (
        <>
            {/* Dark Backdrop */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.8)',
                zIndex: 900,
                opacity: isHovered ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.8s ease',
                backdropFilter: 'blur(8px)'
            }} />

            <div
                ref={cardRef}
                className={`card-container ${isHovered ? 'hovered' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: isHovered
                        ? `translate(${centerTransform.x}px, ${centerTransform.y}px) rotate(0deg)`
                        : `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
                    zIndex: isHovered ? 1000 : 1,
                    transition: isHovered
                        ? 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.3s'
                        : 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.3s'
                }}
            >
                <div
                    className="card-inner"
                    style={{
                        transform: isHovered
                            ? `rotateY(180deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                            : 'rotateY(0deg) rotateX(0deg)',
                        transition: isHovered
                            ? 'transform 0.1s ease-out'
                            : 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    {/* Front Side */}
                    <div className="card-face card-front" style={{ backgroundImage: `url(${image})` }}>
                        <div className="card-overlay"></div>
                        <h3 className="card-title">{title}</h3>
                    </div>

                    {/* Back Side */}
                    <div className="card-face card-back">
                        <div className="card-back-content" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '2.5rem',
                                backgroundColor: '#FFFFFF',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '15px',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                flexDirection: 'row'
                            }}>
                                <img
                                    src="/logo.jpg"
                                    alt="Logo"
                                    style={{
                                        height: '32px',
                                        width: 'auto',
                                        borderRadius: '6px',
                                        imageRendering: '-webkit-optimize-contrast'
                                    }}
                                />
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    lineHeight: 1
                                }}>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '800',
                                        color: '#E9471A',
                                        fontFamily: 'Outfit',
                                        letterSpacing: '-0.3px'
                                    }}>
                                        République
                                    </span>
                                    <span style={{
                                        fontSize: '0.6rem',
                                        fontWeight: '700',
                                        color: '#2C3E50',
                                        fontFamily: 'Outfit',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase'
                                    }}>
                                        des Arts
                                    </span>
                                </div>
                            </div>
                            <h4 style={{
                                color: '#FFFFFF',
                                marginBottom: '1.5rem',
                                fontSize: '2.2rem',
                                fontWeight: '900',
                                fontFamily: "'Playfair Display', serif"
                            }}>{title}</h4>

                            {content.type === 'list' ? (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {content.items.map((item, i) => (
                                        <li key={i} style={{
                                            marginBottom: '1rem',
                                            fontSize: '1.35rem',
                                            fontWeight: '700',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            color: '#FFFFFF',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{ color: '#FFFFFF', opacity: 0.8, fontSize: '1.6rem' }}>✦</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ fontSize: '1.5rem', lineHeight: '1.8', fontWeight: '600', color: '#FFFFFF' }}>{content.value}</p>
                            )}
                        </div>
                    </div>
                </div>

                <style jsx>{`
                .card-container {
                    width: 420px;
                    height: 560px;
                    perspective: 1500px;
                    cursor: pointer;
                    transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.3s;
                    position: relative;
                }
                .card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transform-style: preserve-3d;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
                    border-radius: 32px;
                }
                .card-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-radius: 32px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border: 10px solid #ffffff;
                }
                .card-front {
                    background-size: cover;
                    background-position: center;
                    color: white;
                }
                .card-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, 
                        rgba(0,0,0,0.1) 0%, 
                        rgba(0,0,0,0.3) 50%, 
                        rgba(0,0,0,0.7) 100%);
                    z-index: 1;
                    transition: all 0.4s ease;
                    backdrop-filter: blur(0px);
                }
                .card-inner:hover .card-overlay {
                    background: linear-gradient(to bottom, 
                        rgba(0,0,0,0.2) 0%, 
                        rgba(0,0,0,0.4) 50%, 
                        rgba(0,0,0,0.9) 100%);
                    backdrop-filter: blur(4px);
                }
                .card-title {
                    position: relative;
                    z-index: 2;
                    font-size: 3.2rem;
                    font-weight: 900;
                    color: #FFFFFF !important;
                    text-shadow: 0 4px 15px rgba(0,0,0,0.5);
                    font-family: 'Playfair Display', serif;
                    padding: 0 1.5rem;
                    margin: 0;
                    line-height: 1.1;
                }
                .card-back {
                    background-color: #E9471A;
                    color: #FFFFFF;
                    transform: rotateY(180deg);
                    padding: 3rem;
                    border: 10px solid #FFFFFF;
                }
                .card-back-content {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .card-container {
                        width: 340px;
                        height: 500px;
                        transform: none !important;
                    }
                    .card-title {
                        font-size: 2.5rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-container {
                        width: 90vw;
                        height: 450px;
                    }
                    .card-title {
                        font-size: 2rem;
                        padding: 0 1rem;
                    }
                    .card-back {
                        padding: 1.5rem;
                    }
                    .card-back-content li {
                        font-size: 1.1rem !important;
                    }
                }
                `}</style>
            </div>
        </>
    );
};

export const Disciplines = () => {
    const { t, locale } = useLanguage();
    const isRTL = locale === 'ar';

    const disciplines = [
        {
            title: t.disciplines.music.title,
            image: '/images/music-bg.jpg',
            content: { type: 'list', items: t.disciplines.music.instruments },
            rotation: -4,
            offset: { x: -20, y: 0 }
        },
        {
            title: t.disciplines.drawing.title,
            image: '/images/drawing-bg.webp',
            content: { type: 'list', items: t.disciplines.drawing.topics },
            rotation: 3,
            offset: { x: 0, y: 0 }
        },
        {
            title: t.disciplines.workshops.title,
            image: '/images/workshops-bg.jpg',
            content: { type: 'text', value: t.disciplines.workshops.text },
            rotation: -2,
            offset: { x: 20, y: 0 }
        }
    ];

    return (
        <section id="disciplines" style={{
            position: 'relative',
            backgroundColor: '#FAF9F6',
            padding: '120px 0',
            overflow: 'hidden'
        }}>
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '400px',
                backgroundColor: '#E9471A',
                opacity: 0.03,
                rotate: '-5deg',
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{
                        backgroundColor: '#2C3E50',
                        padding: '1.2rem 3.5rem',
                        display: 'inline-block',
                        borderRadius: '100px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    }}>
                        <h2 style={{
                            color: '#FFFFFF',
                            margin: 0,
                            fontSize: '3.5rem',
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: '900'
                        }}>{t.disciplines.title}</h2>
                    </div>
                </div>

                <div className="disciplines-wrapper" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '3rem',
                    padding: '4rem 0',
                    minHeight: '600px',
                    width: '100%'
                }}>
                    {disciplines.map((d, i) => (
                        <DisciplineCard
                            key={i}
                            title={d.title}
                            content={d.content}
                            image={d.image}
                            rotation={d.rotation}
                            offset={d.offset}
                            isRTL={isRTL}
                        />
                    ))}
                </div>

                <style jsx>{`
                    .disciplines-wrapper {
                        flex-wrap: nowrap;
                    }
                    @media (max-width: 1200px) {
                        .disciplines-wrapper {
                            flex-wrap: wrap;
                            gap: 2rem;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export const Advantages = () => {
    const { t, locale } = useLanguage();
    const isAr = locale === 'ar';
    const adv = [
        { label: t.advantages.equipment, img: '/images/adv-equipment.jpg' },
        { label: t.advantages.teachers, img: '/images/adv-teachers.jpg' },
        { label: t.advantages.climate, img: '/images/adv-rooms.jpg' },
        { label: t.advantages.waiting, img: '/images/adv-waiting.jpg' },
        { label: t.advantages.parking, img: '/images/adv-parking.jpg' },
        { label: t.advantages.safety, img: '/images/adv-safety.jpg' },
        { label: t.advantages.experience, img: '/images/adv-experience.jpg' },
    ];

    return (
        <section id="advantages" style={{ backgroundColor: '#FAF9F6', padding: '100px 0', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.6rem 1.5rem',
                    background: 'rgba(44, 62, 80, 0.05)',
                    color: '#2C3E50',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(44, 62, 80, 0.1)'
                }}>
                    {isAr ? 'لماذا تختارنا ؟' : 'Pourquoi nous choisir ?'}
                </div>
                <h2 style={{
                    color: '#2C3E50',
                    margin: 0,
                    fontSize: '3.5rem',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '900'
                }}>{t.advantages.title}</h2>
            </div>

            {/* Premium Marquee */}
            <div className="marquee-container">
                <div className="marquee-track">
                    {/* Render 6 sets for absolutely seamless infinite loop on all screen sizes */}
                    {[...adv, ...adv, ...adv, ...adv, ...adv, ...adv].map((item, idx) => (
                        <div key={idx} className="premium-card">
                            <div className="card-image" style={{ backgroundImage: `url(${item.img})` }} />
                            <div className="card-content">
                                <div className="card-icon">✨</div>
                                <h3 className="card-label">{item.label}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Side Gradients for Fade Effect */}
                <div className="fade-left" />
                <div className="fade-right" />
            </div>

            <style jsx>{`
                .marquee-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    padding: 2rem 0;
                    margin-bottom: 4rem;
                    direction: ltr !important; /* FORCE LTR to fix Arabic layout issues */
                }

                .marquee-track {
                    display: flex;
                    gap: 2.5rem;
                    width: max-content;
                    animation: scroll-left 80s linear infinite; /* Always scroll left for consistency */
                    will-change: transform;
                }

                .marquee-container:hover .marquee-track {
                    animation-play-state: paused;
                }

                .premium-card {
                    position: relative;
                    width: 350px;
                    height: 480px;
                    border-radius: 30px;
                    overflow: hidden;
                    flex-shrink: 0;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: default;
                }

                .premium-card:hover {
                    transform: translateY(-15px) scale(1.02);
                    box-shadow: 0 30px 60px rgba(233, 71, 26, 0.2);
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.7s ease;
                }

                .premium-card:hover .card-image {
                    transform: scale(1.1);
                }

                .card-content {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 2.5rem 1.5rem;
                    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;
                    height: 100%;
                    box-sizing: border-box;
                }

                .card-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.8rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.4s ease;
                }

                .premium-card:hover .card-icon {
                    opacity: 1;
                    transform: translateY(0);
                }

                .card-label {
                    color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin: 0;
                    line-height: 1.2;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                }

                /* Directional Scroll Animations */
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 6)); }
                }

                @keyframes scroll-right {
                    0% { transform: translateX(calc(-100% / 6)); }
                    100% { transform: translateX(0); }
                }

                /* Side Fades */
                .fade-left, .fade-right {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 150px;
                    z-index: 2;
                    pointer-events: none;
                }

                .fade-left {
                    left: 0;
                    background: linear-gradient(to right, #FAF9F6, transparent);
                }

                .fade-right {
                    right: 0;
                    background: linear-gradient(to left, #FAF9F6, transparent);
                }

                @media (max-width: 768px) {
                    .premium-card {
                        width: 280px;
                        height: 400px;
                    }
                    .card-label { font-size: 1.5rem; }
                    .fade-left, .fade-right { width: 50px; }
                }
            `}</style>
        </section>
    );
};

export const Audiences = () => {
    const { t } = useLanguage();
    const images = [
        '/images/audiences/audience-1.avif',
        '/images/audiences/audience-2.avif',
        '/images/audiences/audience-3.avif',
        '/images/audiences/audience-4.avif',
        '/images/audiences/audience-5.avif',
        '/images/audiences/audience-6.avif',
        '/images/audiences/audience-7.avif',
        '/images/audiences/audience-8.avif',
        '/images/audiences/audience-9.avif',
        '/images/audiences/audience-10.avif',
        '/images/audiences/audience-11.avif'
    ];
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section id="audiences" style={{
            position: 'relative',
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '100px 0'
        }}>
            {/* Background Slider */}
            {images.map((img, idx) => (
                <div key={idx} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'opacity 1.5s ease-in-out',
                    opacity: current === idx ? 1 : 0,
                    zIndex: -2
                }} />
            ))}

            {/* Dark Overlay for Readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                zIndex: -1
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <h2 style={{
                    color: '#FFFFFF',
                    fontSize: '3.5rem',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '900',
                    textShadow: '0 4px 15px rgba(0,0,0,0.4)',
                    marginBottom: '1.5rem'
                }}>
                    {t.audiences.title}
                </h2>
                <p style={{
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    maxWidth: '800px',
                    margin: '0 auto 4rem',
                    opacity: 0.95,
                    fontWeight: '500',
                    lineHeight: 1.6,
                    textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                }}>
                    {t.audiences.text}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {[t.audiences.children, t.audiences.teenagers, t.audiences.adults].map((label, idx) => (
                        <div key={idx} className="audience-tag" style={{
                            padding: '2rem 4rem',
                            fontSize: '1.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '50px',
                            backdropFilter: 'blur(10px)',
                            fontWeight: '800',
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                h2 { color: #ffffff !important; }
                .audience-tag:hover {
                    background-color: #ffffff;
                    color: var(--primary);
                    transform: translateY(-5px);
                }
                
                @media (max-width: 768px) {
                    .audience-tag {
                        padding: 1rem 2rem !important;
                        fontSize: 1.1rem !important;
                    }
                    h2 { font-size: 2.5rem !important; }
                    p { font-size: 1.1rem !important; margin-bottom: 2rem !important; }
                }
            `}</style>
        </section>
    );
};

export const ContactUs = () => {
    const { t, locale } = useLanguage();
    const isRTL = locale === 'ar';
    const phoneNumber = "+213 553 37 62 67";
    const whatsAppNumber = "213553376267";

    return (
        <section id="contact" style={{
            background: 'linear-gradient(135deg, #FAF9F6 0%, #F5F5DC 100%)',
            padding: '100px 0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Blob */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(233,71,26,0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="contact-wrapper">
                    {/* Left Column: Contact Info & Credentials */}
                    <div className="contact-info">
                        <div className="info-header">
                            <h2 style={{
                                color: '#2C3E50',
                                fontSize: '3.5rem',
                                fontFamily: "'Playfair Display', serif",
                                marginBottom: '1.5rem',
                                fontWeight: '900'
                            }}>
                                {isRTL ? 'تواصل معنا' : 'Contactez-nous'}
                            </h2>
                            <p style={{
                                color: '#64748B',
                                fontSize: '1.1rem',
                                lineHeight: '1.7',
                                marginBottom: '3rem',
                                maxWidth: '500px'
                            }}>
                                {isRTL
                                    ? 'نحن هنا للإجابة على جميع استفساراتكم. انضموا إلينا في رحلة فنية ملهمة.'
                                    : 'Nous sommes là pour répondre à toutes vos questions. Rejoignez-nous pour un voyage artistique inspirant.'}
                            </p>
                        </div>

                        <div className="info-cards">
                            {/* Address */}
                            <div className="info-card">
                                <div className="icon">📍</div>
                                <div>
                                    <h4>{isRTL ? 'العنوان' : 'Adresse'}</h4>
                                    <p>Citée les orangés Rouiba , Alger</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="info-card">
                                <div className="icon">📞</div>
                                <div>
                                    <h4>{isRTL ? 'الهاتف' : 'Téléphone'}</h4>
                                    <p>
                                        <a href={`tel:${phoneNumber}`} className="contact-link" dir="ltr">
                                            {phoneNumber}
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Opening Hours */}
                            <div className="info-card">
                                <div className="icon">🕒</div>
                                <div>
                                    <h4>{isRTL ? 'ساعات العمل' : 'Horaires'}</h4>
                                    <p>{isRTL ? 'الإثنين - السبت: 9:00 - 18:00' : 'Lun - Sam: 9h00 - 18h00'}</p>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{isRTL ? 'الأحد: مغلق' : 'Dimanche: Fermé'}</p>
                                </div>
                            </div>

                            {/* Social Icons Row (Replacing Text) */}
                            <div className="social-icons-row" style={{ marginTop: '2rem' }}>
                                <a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Redesigned Form */}
                    <div className="contact-form-wrapper">
                        <div className="form-card">
                            <h3 style={{
                                fontSize: '2rem',
                                fontFamily: "'Playfair Display', serif",
                                color: '#2C3E50',
                                marginBottom: '2rem',
                                textAlign: 'center',
                                fontWeight: '800'
                            }}>
                                {t.form.title}
                            </h3>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-grid">
                                    <div className="input-group">
                                        <label>{t.form.firstName}</label>
                                        <input type="text" className="modern-input" required />
                                    </div>
                                    <div className="input-group">
                                        <label>{t.form.lastName}</label>
                                        <input type="text" className="modern-input" required />
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="input-group">
                                        <label>{t.form.phone}</label>
                                        <input type="tel" className="modern-input" required />
                                    </div>
                                    <div className="input-group">
                                        <label>{isRTL ? 'التخصص' : 'Discipline'}</label>
                                        <select className="modern-input" required style={{ appearance: 'none' }}>
                                            <option value="">{isRTL ? 'اختر التخصص' : 'Choisissez une discipline'}</option>
                                            <option value="music">{t.disciplines.music.title}</option>
                                            <option value="drawing">{t.disciplines.drawing.title}</option>
                                            <option value="workshops">{t.disciplines.workshops.title}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input-group full-width">
                                    <label>{isRTL ? 'رسالتك / وصف' : 'Message / Description'}</label>
                                    <textarea
                                        className="modern-input textarea"
                                        rows="4"
                                        placeholder={isRTL ? 'أخبرنا المزيد...' : 'Dites-nous en plus...'}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn">
                                    <span>{t.form.submit}</span>
                                    <span>→</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contact-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }

                .info-card {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                    align-items: flex-start;
                    padding: 1.5rem;
                    background: rgba(255,255,255,0.6);
                    border-radius: 20px;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.5);
                }

                .info-card:hover {
                    background: #FFFFFF;
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
                }

                .info-card .icon {
                    width: 50px;
                    height: 50px;
                    background: #FFFFFF;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: #E9471A;
                    flex-shrink: 0;
                    box-shadow: 0 4px 15px rgba(233, 71, 26, 0.1);
                }

                .info-card h4 {
                    color: #2C3E50;
                    font-size: 1.2rem;
                    margin: 0 0 0.4rem 0;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 700;
                }

                .info-card p {
                    color: #64748B;
                    margin: 0;
                    font-size: 1.05rem;
                    font-weight: 500;
                    line-height: 1.5;
                }

                .contact-link {
                    color: inherit;
                    text-decoration: none;
                    transition: color 0.3s;
                    border-bottom: 1px dotted rgba(0,0,0,0.2);
                }

                .contact-link:hover {
                    color: #E9471A;
                    border-bottom-color: #E9471A;
                }

                /* Social Icons */
                .social-icons-row {
                    display: flex;
                    gap: 1rem;
                }

                .social-icon-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #2C3E50;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                    border: 1px solid rgba(0,0,0,0.05);
                }

                .social-icon-btn:hover {
                    transform: translateY(-5px) scale(1.1);
                    color: white;
                }

                .social-icon-btn.whatsapp:hover { background: #25D366; }
                .social-icon-btn.instagram:hover { background: #E1306C; }
                .social-icon-btn.facebook:hover { background: #1877F2; }

                /* Form Styling */
                .form-card {
                    background: #FFFFFF;
                    padding: 3.5rem 3rem;
                    border-radius: 30px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.08);
                    border: 1px solid rgba(255,255,255,0.8);
                    position: relative;
                    overflow: hidden;
                }
                
                .form-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 6px;
                    background: linear-gradient(90deg, #E9471A, #F5d4c9);
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .input-group label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #64748B;
                    font-family: 'Outfit', sans-serif;
                    margin-left: 0.5rem;
                }

                .modern-input {
                    width: 100%;
                    padding: 1rem 1.2rem;
                    background: #F8FAFC;
                    border: 2px solid #F1F5F9;
                    border-radius: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    color: #2C3E50;
                    transition: all 0.3s ease;
                    outline: none;
                }
                
                .modern-input.textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .modern-input:focus {
                    border-color: #E9471A;
                    background: #FFFFFF;
                    box-shadow: 0 0 0 4px rgba(233, 71, 26, 0.1);
                }

                .submit-btn {
                    width: 100%;
                    padding: 1.2rem;
                    background: #2C3E50;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    font-family: 'Outfit', sans-serif;
                }

                .submit-btn:hover {
                    background: #E9471A;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 35px rgba(233, 71, 26, 0.2);
                }

                @media (max-width: 1024px) {
                    .contact-wrapper {
                        grid-template-columns: 1fr;
                        gap: 4rem;
                    }
                    .info-header { text-align: center; margin: 0 auto; }
                    .info-cards { 
                        display: grid; 
                        grid-template-columns: 1fr; 
                        gap: 1.5rem; 
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .social-icons-row { justify-content: center; }
                }

                @media (max-width: 768px) {
                   .form-grid { grid-template-columns: 1fr; gap: 1rem;}
                   .form-card { padding: 2rem 1.5rem; }
                }

                @media (max-width: 480px) {
                    .contact-wrapper { gap: 3rem; }
                    .info-header h2 { font-size: 2.5rem !important; }
                    .form-card { padding: 1.5rem 1rem; }
                }
            `}</style>
        </section>
    );
};
