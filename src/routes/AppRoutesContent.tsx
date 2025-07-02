import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ActivitiesPage from '../pages/ActivitiesPage';
import CalendarPage from '../pages/CalendarPage';
import LocationPage from '../pages/LocationPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useTranslatedPath } from '../hooks/useTranslatedPath';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
    {children}
  </motion.div>
);

const AppRoutesContent = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  // Si el idioma de i18next no coincide con el de la URL, espera a que se actualice
  // Esto puede pasar brevemente durante la carga inicial o el cambio de idioma
  if (lang && i18n.language.split('-')[0] !== lang) {
    return <div>Loading language...</div>; // O un spinner
  }

  // Obtener rutas traducidas dinámicamente
  // const homePath = useTranslatedPath('home'); // Será "/"
  const aboutPath = useTranslatedPath('about'); // ej. "/nosotros" o "/about-us"
  const activitiesPath = useTranslatedPath('activities');
  const calendarPath = useTranslatedPath('calendar');
  const locationPath = useTranslatedPath('location');
  const contactPath = useTranslatedPath('contact');

  return (
    <Routes>
      {/* Nota: las rutas ahora son relativas al prefijo /:lang/ */}
      {/* La ruta raíz para un idioma específico */}
      <Route
        index
        element={
          <AnimatedPage>
            <HomePage />
          </AnimatedPage>
        }
      />
      <Route
        path={aboutPath.startsWith('/') ? aboutPath.substring(1) : aboutPath}
        element={
          <AnimatedPage>
            <AboutPage />
          </AnimatedPage>
        }
      />
      <Route
        path={calendarPath.startsWith('/') ? calendarPath.substring(1) : calendarPath}
        element={
          <AnimatedPage>
            <CalendarPage />
          </AnimatedPage>
        }
      />
      <Route
        path={activitiesPath.startsWith('/') ? activitiesPath.substring(1) : activitiesPath}
        element={
          <AnimatedPage>
            <ActivitiesPage />
          </AnimatedPage>
        }
      />
      <Route
        path={locationPath.startsWith('/') ? locationPath.substring(1) : locationPath}
        element={
          <AnimatedPage>
            <LocationPage />
          </AnimatedPage>
        }
      />
      <Route
        path={contactPath.startsWith('/') ? contactPath.substring(1) : contactPath}
        element={
          <AnimatedPage>
            <ContactPage />
          </AnimatedPage>
        }
      />
      <Route
        path="404"
        element={
          <AnimatedPage>
            <NotFoundPage />
          </AnimatedPage>
        }
      />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
};

export default AppRoutesContent;
