"use client";
import React from 'react';
import { useLanguage } from './LanguageContext';

export const Presentation = () => {
    const { t } = useLanguage();

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" style={{ backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
            {/* Subtle Logo Watermark */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                backgroundImage: 'url(/logo.jpg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.03,
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'grayscale(100%)'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <div style={{
                        backgroundColor: '#E9471A',
                        padding: '1.5rem 4rem',
                        display: 'inline-block',
                        borderRadius: '100px',
                        boxShadow: '0 10px 30px rgba(233, 71, 26, 0.2)',
                        marginBottom: '1rem'
                    }}>
                        <h2 style={{
                            color: '#FFFFFF',
                            margin: 0,
                            fontSize: '3.5rem',
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: '900',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>{t.presentation.title}</h2>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                    <div className="animate-on-scroll vision-card" style={{
                        padding: '4rem 3rem',
                        borderRadius: '24px',
                        transform: 'translateX(-50px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: '350px',
                        backgroundColor: '#E9471A',
                        color: '#FFFFFF',
                        boxShadow: '0 20px 40px rgba(233, 71, 26, 0.15)'
                    }}>
                        <h3 style={{ fontSize: '2.8rem', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif", fontWeight: '900' }}>{t.presentation.vision}</h3>
                        <p style={{ fontSize: '1.4rem', lineHeight: '1.7', opacity: 0.95, fontWeight: '500' }}>{t.presentation.visionText}</p>
                    </div>

                    <div className="animate-on-scroll approach-card" style={{
                        padding: '4rem 3rem',
                        borderRadius: '24px',
                        transform: 'translateX(50px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: '350px',
                        backgroundColor: '#2C3E50',
                        color: '#FFFFFF',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ fontSize: '2.8rem', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif", fontWeight: '900' }}>{t.presentation.approach}</h3>
                        <p style={{ fontSize: '1.4rem', lineHeight: '1.7', opacity: 0.95, fontWeight: '500' }}>{t.presentation.approachText}</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .icon-zoom:hover {
          transform: scale(1.2) rotate(5deg);
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
        <section id="advantages" style={{ backgroundColor: '#ffffff', padding: '80px 0', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <div style={{
                    backgroundColor: '#E9471A',
                    padding: '1.2rem 3.5rem',
                    display: 'inline-block',
                    borderRadius: '100px',
                    boxShadow: '0 10px 30px rgba(233, 71, 26, 0.2)',
                }}>
                    <h2 style={{
                        color: '#FFFFFF',
                        margin: 0,
                        fontSize: '3rem',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: '900'
                    }}>{t.advantages.title}</h2>
                </div>
            </div>

            <div className="marquee-wrapper">
                <div className="marquee-content">
                    {/* Render items twice for a seamless infinite loop */}
                    {[...adv, ...adv].map((item, idx) => (
                        <div key={idx} className="advantage-card hover-lift" style={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${item.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <p className="label">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .marquee-wrapper {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    padding: 2rem 0;
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    direction: ltr !important;
                }

                .marquee-content {
                    display: flex;
                    gap: 2rem;
                    width: max-content;
                    animation: ${isAr ? 'marquee-ltr' : 'marquee-rtl'} 40s linear infinite;
                    direction: ltr !important;
                }

                .marquee-wrapper:hover .marquee-content {
                    animation-play-state: paused;
                }

                .advantage-card {
                    flex-shrink: 0;
                    width: 320px;
                    padding: 3rem 2rem;
                    border: 1px solid rgba(233, 71, 26, 0.08);
                    border-radius: 28px;
                    text-align: center;
                    box-shadow: 0 12px 30px rgba(0,0,0,0.04);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .label {
                    font-weight: 800;
                    color: #2C3E50;
                    font-size: 1.6rem;
                    margin: 0;
                    line-height: 1.3;
                }

                .advantage-card:hover {
                    border-color: var(--primary);
                    background-color: #ffffff;
                    transform: translateY(-10px) scale(1.02);
                }

                @keyframes marquee-rtl {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @keyframes marquee-ltr {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }

                @media (max-width: 768px) {
                    .advantage-card {
                        width: 260px;
                        padding: 2.2rem 1.5rem;
                    }
                    .label {
                        font-size: 1.35rem;
                    }
                    .marquee-content {
                        gap: 1.5rem;
                        animation-duration: 25s;
                    }
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
            `}</style>
        </section>
    );
};

export const RegistrationForm = () => {
    const { t, locale } = useLanguage();
    const isRTL = locale === 'ar';

    return (
        <section id="register" className="registration-section">
            <div className="container">
                <div className="form-wrapper">
                    {/* Section Header */}
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-icon">📝</span>
                            {isRTL ? 'انضم إلينا' : 'Rejoignez-nous'}
                        </div>
                        <h2 className="section-title">{t.form.title}</h2>
                        <p className="section-subtitle">
                            {isRTL
                                ? 'املأ النموذج أدناه وسنتصل بك قريباً'
                                : 'Remplissez le formulaire ci-dessous et nous vous contacterons bientôt'}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="form-card">
                        <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
                            {/* Name Fields */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">{t.form.firstName}</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder={isRTL ? 'أدخل الاسم' : 'Entrez votre prénom'}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t.form.lastName}</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder={isRTL ? 'أدخل اللقب' : 'Entrez votre nom'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Age Field */}
                            <div className="form-group">
                                <label className="form-label">{t.form.age}</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder={isRTL ? 'أدخل العمر' : 'Entrez votre âge'}
                                    min="3"
                                    max="99"
                                    required
                                />
                            </div>

                            {/* Discipline Select */}
                            <div className="form-group">
                                <label className="form-label">{t.form.discipline}</label>
                                <select className="form-select" required>
                                    <option value="">{isRTL ? 'اختر التخصص' : 'Choisissez une discipline'}</option>
                                    <option value="music">{t.disciplines.music.title}</option>
                                    <option value="drawing">{t.disciplines.drawing.title}</option>
                                    <option value="workshops">{t.disciplines.workshops.title}</option>
                                </select>
                            </div>

                            {/* Phone Field */}
                            <div className="form-group">
                                <label className="form-label required-field">{t.form.phone}</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder={isRTL ? '+212 6XX XXX XXX' : '+212 6XX XXX XXX'}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="form-submit">
                                <span className="btn-text">{t.form.submit}</span>
                                <span className="btn-icon">→</span>
                            </button>
                        </form>
                    </div>

                    {/* Trust Indicators */}
                    <div className="trust-indicators">
                        <div className="trust-item">
                            <span className="trust-icon">✓</span>
                            <span className="trust-text">{isRTL ? 'آمن ومحمي' : 'Sécurisé'}</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">⚡</span>
                            <span className="trust-text">{isRTL ? 'رد سريع' : 'Réponse rapide'}</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">🎓</span>
                            <span className="trust-text">{isRTL ? 'أكثر من 500 تلميذ' : '+500 élèves'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .registration-section {
                    background: linear-gradient(135deg, #FAF9F6 0%, #F5F5DC 100%);
                    padding: 100px 0;
                    position: relative;
                    overflow: hidden;
                }

                .registration-section::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(233, 71, 26, 0.03) 0%, transparent 70%);
                    pointer-events: none;
                }

                .form-wrapper {
                    max-width: 650px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* Header */
                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .header-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding: 0.6rem 1.5rem;
                    background: White;
                    border: 2px solid rgba(233, 71, 26, 0.1);
                    border-radius: 100px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 700;
                    font-size: 0.95rem;
                    color: #E9471A;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }

                .badge-icon {
                    font-size: 1.2rem;
                }

                .section-title {
                    font-size: clamp(2.5rem, 4vw, 3.5rem);
                    font-family: 'Playfair Display', serif;
                    font-weight: 900;
                    color: #2C3E50;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    color: #64748B;
                    max-width: 500px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Form Card */
                .form-card {
                    background: white;
                    border-radius: 24px;
                    padding: 3rem;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                    border: 1px solid rgba(233, 71, 26, 0.08);
                }

                .registration-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.8rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.2rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .form-label {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #2C3E50;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .required-field::after {
                    content: ' *';
                    color: #E9471A;
                }

                .form-input,
                .form-select {
                    padding: 1rem 1.2rem;
                    border-radius: 12px;
                    border: 2px solid #E2E8F0;
                    font-size: 1rem;
                    font-family: 'Outfit', sans-serif;
                    background-color: #F8FAFC;
                    color: #2C3E50;
                    transition: all 0.3s ease;
                    width: 100%;
                }

                .form-input:focus,
                .form-select:focus {
                    outline: none;
                    border-color: #E9471A;
                    background-color: white;
                    box-shadow: 0 0 0 4px rgba(233, 71, 26, 0.1);
                }

                .form-input::placeholder {
                    color: #94A3B8;
                }

                .form-select {
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%232C3E50' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1.2rem center;
                    padding-right: 3rem;
                }

                /* Submit Button */
                .form-submit {
                    margin-top: 1rem;
                    padding: 1.3rem 2.5rem;
                    background-color: #E9471A;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 800;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 25px rgba(233, 71, 26, 0.3);
                }

                .form-submit:hover {
                    background-color: #C83D16;
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(233, 71, 26, 0.4);
                }

                .form-submit:active {
                    transform: translateY(-1px);
                }

                .btn-icon {
                    font-size: 1.3rem;
                    transition: transform 0.3s ease;
                }

                .form-submit:hover .btn-icon {
                    transform: translateX(4px);
                }

                /* Trust Indicators */
                .trust-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 2.5rem;
                    margin-top: 2.5rem;
                    flex-wrap: wrap;
                }

                .trust-item {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #64748B;
                }

                .trust-icon {
                    font-size: 1.2rem;
                    color: #E9471A;
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .form-card {
                        padding: 2rem 1.5rem;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }

                    .trust-indicators {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: center;
                    }

                    .section-title {
                        font-size: 2.2rem;
                    }
                }
            `}</style>
        </section>
    );
};
