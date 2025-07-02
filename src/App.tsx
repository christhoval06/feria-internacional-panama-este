import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutesContent from './routes/AppRoutesContent'; // Nuevo componente para el contenido de las rutas
import { AnimatePresence } from 'framer-motion';
import useScrollToTop from './hooks/useScrollToTop';
import ScrollToTop from './components/common/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';

// Idiomas soportados y el idioma por defecto
const supportedLangs = ['en', 'es'];
const defaultLang = 'es';

const LanguageWrapper = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLangInitialized, setIsLangInitialized] = useState(false);

  useEffect(() => {
    const currentLangInPath = lang; // El idioma actual en la URL
    const i18nLang = i18n.language.split('-')[0]; // El idioma actual de i18next

    // Caso 1: Hay un idioma en la URL y es soportado
    if (currentLangInPath && supportedLangs.includes(currentLangInPath)) {
      if (i18nLang !== currentLangInPath) {
        // console.log(`Wrapper: Changing i18n lang from ${i18nLang} to ${currentLangInPath} (from URL)`);
        i18n
          .changeLanguage(currentLangInPath)
          .then(() => {
            setIsLangInitialized(true); // Marcar como inicializado DESPUÉS de cambiar el idioma
          })
          .catch((err) => {
            console.error(`Error changing language: ${err}`);
          });
      } else {
        // i18n ya estaba sincronizado, podemos marcarlo como inicializado.
        setIsLangInitialized(true);
      }
    }
    // Caso 2: No hay idioma en la URL (estamos en la raíz '/' o una ruta huérfana)
    else if (!currentLangInPath) {
      if (location.pathname === '/') {
        // Redirigir desde la raíz a la URL con el idioma por defecto o el del navegador
        const browserLang = navigator.language.split('-')[0];
        const langToUse = supportedLangs.includes(browserLang) ? browserLang : defaultLang;
        // console.log(`Wrapper: Redirecting from / to /${langToUse}${location.pathname}`);
        navigate(`/${langToUse}${location.pathname === '/' ? '' : location.pathname}`, { replace: true });
      } else {
        // Es una ruta sin prefijo de idioma que no es la raíz, redirigir a 404 con idioma por defecto
        // console.log(`Wrapper: Path ${location.pathname} has no lang, redirecting to 404`);
        navigate(`/${defaultLang}/404`, { replace: true });
      }
    }
    // Caso 3: Idioma en la URL pero no es soportado
    else if (currentLangInPath && !supportedLangs.includes(currentLangInPath)) {
      // console.log(`Wrapper: Lang ${currentLangInPath} not supported, redirecting to 404`);
      navigate(`/${defaultLang}/404`, { replace: true });
    }
  }, [lang, i18n, navigate, location.pathname]);

  // Solo renderizar contenido si el idioma en la URL es válido y soportado
  if (!isLangInitialized && lang && supportedLangs.includes(lang)) {
    return <div>Loading language resources...</div>; // O un spinner
  }

  if (lang && supportedLangs.includes(lang)) {
    return <AppRoutesContent />;
  }

  // Si estamos en proceso de redirección desde la raíz, o si el idioma no es válido,
  // no renderizar nada o un loader hasta que la redirección se complete.
  // console.log("Wrapper: Lang not valid or redirection pending. Lang:", lang, "Path:", location.pathname);
  return null; // O un loader global
};

function App() {
  const location = useLocation();
  useScrollToTop();

  return (
    <>
      <ScrollToTop />
      <div className="bg-fair-light flex min-h-screen flex-col">
        <Header /> {/* Header ahora obtiene lang de params o i18n */}
        <main>
          <AnimatePresence mode="wait">
            <Routes key={location.pathname}>
              {' '}
              {/* El key aquí es importante para AnimatePresence */}
              <Route path="/:lang/*" element={<LanguageWrapper />} />
              <Route path="/" element={<LanguageWrapper />} /> {/* Para manejar la raíz y redirigir */}
              {/* Puedes añadir una ruta global 404 aquí si lo deseas, fuera del :lang */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}
export default App;
