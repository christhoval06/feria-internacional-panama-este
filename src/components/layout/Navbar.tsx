// src/components/layout/Navbar.tsx
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaHome, FaInfoCircle, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaTasks } from 'react-icons/fa';
import { LanguageSelector } from '../common/LanguageSelector';

const navItemVariants = {
  hover: { scale: 1.1, color: '#DAA520' },
  tap: { scale: 0.95 },
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const params = useParams<{ lang?: string }>();
  const currentLangInUrl = params.lang || i18n.language.split('-')[0] || 'es'; // Priorizar lang de URL

  const routeKeys = [
    { key: 'home', icon: <FaHome className="mr-1" /> },
    { key: 'about', icon: <FaInfoCircle className="mr-1" /> },
    // ... (otras claves de ruta)
    { key: 'activities', icon: <FaTasks className="mr-1" /> },
    { key: 'calendar', icon: <FaCalendarAlt className="mr-1" /> },
    { key: 'location', icon: <FaMapMarkerAlt className="mr-1" /> },
    { key: 'contact', icon: <FaEnvelope className="mr-1" /> },
  ];

  return (
    <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <ul className="flex flex-wrap justify-center sm:justify-start space-x-3 sm:space-x-4">
        {routeKeys.map(route => {
          // Obtener el segmento de ruta traducido para el idioma actual (detectado de i18n o params.lang)
          const translatedPathSegment = t(`routes.${route.key}`, { lng: currentLangInUrl });

          let fullPath;
          if (route.key === 'home' && translatedPathSegment === '/') {
            fullPath = `/${currentLangInUrl}`; // ej. /es o /en
          } else {
            // Asegurar que no haya doble slash si translatedPathSegment ya es una ruta absoluta (como "/")
            const segment = translatedPathSegment.startsWith('/') ? translatedPathSegment : `/${translatedPathSegment}`;
            fullPath = `/${currentLangInUrl}${segment === '/' && route.key !== 'home' ? '' : segment}`;
            fullPath = fullPath.replace(/\/\//g, '/'); // Limpiar doble slash
             // Si después de la limpieza, para la home queda /es/ y debería ser /es
            if (route.key === 'home' && fullPath === `/${currentLangInUrl}/`) {
                fullPath = `/${currentLangInUrl}`;
            }
          }


          return (
            <motion.li key={route.key} variants={navItemVariants} whileHover="hover" whileTap="tap">
              <NavLink
                to={fullPath}
                className={({ isActive }) =>
                  `flex items-center py-2 px-1 sm:px-2 text-sm font-medium transition-colors duration-200 hover:text-fair-secondary ${
                    isActive ? 'text-fair-secondary border-b-2 border-fair-secondary' : 'text-white'
                  }`
                }
              >
                {route.icon}{t(`nav.${route.key}`)}
              </NavLink>
            </motion.li>
          );
        })}
      </ul>
      <LanguageSelector />
    </nav>
  );
};
export default Navbar;