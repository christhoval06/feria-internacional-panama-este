import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  en: { translation: translationEN, routes: translationEN.routes }, // Asegúrate de que `routes` esté al mismo nivel que `translation` si lo usas así
  es: { translation: translationES, routes: translationES.routes },
};
// O mejor, si "routes" está dentro de "translation":
// const resources = {
//   en: { translation: translationEN },
//   es: { translation: translationES },
// };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto si la detección falla
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },
    react: {
      useSuspense: true,
    },
    detection: {
      order: ['path', 'navigator', 'localStorage', 'cookie', 'htmlTag'], // 'path' para detectar desde la URL /:lang/
      caches: ['localStorage', 'cookie'],
      lookupFromPathIndex: 0, // El idioma es el primer segmento en la ruta (/:lang/)
    },
  });

export default i18n;
