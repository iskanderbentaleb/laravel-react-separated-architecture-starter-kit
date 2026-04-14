import i18n from 'i18next';
import { initReactI18next } from '../node_modules/react-i18next';

// Import your translations
import translationEN from '../public/locales/en/translation.json';
import translationFR from '../public/locales/fr/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('locale') || 'fr', // default language
    fallbackLng: localStorage.getItem('locale') || 'fr', // fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
