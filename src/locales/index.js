import { en } from './en';
import { ru } from './ru';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';

export const translations = {
  en,
  ru,
  es,
  fr,
  de
};

export const useTranslation = (language = 'en') => {
  const t = (key, fallback = key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    return value || fallback;
  };
  
  return { t };
};

export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' }
];

export const isLanguageSupported = (language) => {
  return Object.keys(translations).includes(language);
};

export const getDefaultLanguage = () => {
  // Try to detect browser language
  const browserLang = navigator.language.split('-')[0];
  return isLanguageSupported(browserLang) ? browserLang : 'en';
};