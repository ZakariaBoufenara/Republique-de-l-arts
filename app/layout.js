import "../styles/globals.css";
import { LanguageProvider } from "../components/LanguageContext";

export const metadata = {
  title: "République des Arts - École d'Art & Musique",
  description: "Formation artistique de qualité pour enfants, adolescents et adultes. Musique, Dessin et Ateliers Créatifs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload fonts to prevent FOUC */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Critical CSS to prevent flash of unstyled content */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Visibility control - hide until CSS loads */
          body {
            visibility: visible !important;
          }
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html, body {
            margin: 0;
            padding: 0;
            background-color: #FAF9F6;
          }
          body {
            font-family: 'Inter', sans-serif;
            color: #1E293B;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          /* Critical navbar styles */
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 2000;
            padding: 24px 0;
            background: transparent;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }
          /* Critical hero styles */
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
          .hero-container {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            align-items: center;
            gap: 4rem;
          }
          /* Critical button styles */
          .btn-hero-primary {
            padding: 1.2rem 3rem;
            background-color: #E9471A;
            color: white;
            border-radius: 12px;
            font-weight: 800;
            text-decoration: none;
          }
          .btn-hero-secondary {
            padding: 1.2rem 3rem;
            background-color: transparent;
            color: #2C3E50;
            border: 2px solid rgba(44, 62, 80, 0.15);
            border-radius: 12px;
            font-weight: 800;
            text-decoration: none;
          }
          /* Loading skeleton styles */
          .loading-container {
            width: 100vw;
            height: 100vh;
            background-color: #FAF9F6;
            position: relative;
            overflow: hidden;
          }
          /* Responsive */
          @media (max-width: 1024px) {
            .hero-container {
              grid-template-columns: 1fr;
            }
          }
        `}} />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
