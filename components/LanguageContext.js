"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fr } from '../data/fr';
import { ar } from '../data/ar';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [locale, setLocale] = useState('fr');
    const t = locale === 'fr' ? fr : ar;

    const toggleLanguage = () => {
        const newLocale = locale === 'fr' ? 'ar' : 'fr';
        setLocale(newLocale);
        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLocale;
    };

    return (
        <LanguageContext.Provider value={{ t, locale, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
