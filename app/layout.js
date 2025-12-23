import "../styles/globals.css";
import { LanguageProvider } from "../components/LanguageContext";

export const metadata = {
  title: "République des Arts - École d'Art & Musique",
  description: "Formation artistique de qualité pour enfants, adolescents et adultes. Musique, Dessin et Ateliers Créatifs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
