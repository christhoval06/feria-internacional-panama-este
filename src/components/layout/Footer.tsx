// src/components/layout/Footer.tsx
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom'; // Importar Link y useParams
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Asume que tienes tu logo en esta ruta o usa un placeholder
import logoFeriaBlanco from '../../assets/images/logo-1.png'; // Necesitarás un logo en versión blanca o clara

// Información de contacto (podrías moverla a un archivo de config o i18n si es muy dinámica)
const CONTACT_EMAIL_FOOTER = "info@feriapanamaeste.com";
const CONTACT_PHONE_FOOTER = "+507 123-4567";
const FAIR_ADDRESS_FOOTER_KEY = "footer.fairAddress"; // Clave para dirección resumida
const FAIR_ADDRESS_FOOTER_DEFAULT = "Recinto Ferial Panamá Este, Pacora";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const params = useParams<{ lang?: string }>();
  const currentYear = new Date().getFullYear();
  const currentLang = params.lang || i18n.language.split('-')[0] || 'es';

  // Links del menú (similar a Navbar, pero sin iconos aquí)
  const navLinksConfig = [
    { key: 'home', labelKey: 'nav.home' },
    { key: 'about', labelKey: 'nav.about' },
    { key: 'activities', labelKey: 'nav.activities' },
    { key: 'calendar', labelKey: 'nav.calendar' },
    { key: 'location', labelKey: 'nav.location' },
    { key: 'contact', labelKey: 'nav.contact' },
  ];

  const socialLinksConfig = [
    { icon: <FaFacebook size={20} />, href: "https://facebook.com/feriapanamaeste", label: "Facebook" },
    { icon: <FaInstagram size={20} />, href: "https://instagram.com/feriapanamaeste", label: "Instagram" },
    { icon: <FaTwitter size={20} />, href: "https://twitter.com/feriapanamaeste", label: "Twitter" },
    { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/company/feriapanamaeste", label: "LinkedIn" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-fair-dark text-gray-300 pt-12 pb-8" // Aumentar padding superior
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Columna 1: Logo y Breve Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <Link to={`/${currentLang}${t('routes.home', { lng: currentLang })}`.replace(/\/\//g, '/')} className="inline-block">
              <img
                src={logoFeriaBlanco} // Usa tu logo en versión clara/blanca
                alt={t('fairName')}
                className="h-24 md:h-16 w-auto" // Ajusta el tamaño
              />
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footer.fairDescription', 'La Primera Feria Internacional de Panamá Este: uniendo la agropecuaria, ganadería, el sector empresarial y los emprendimientos para impulsar el futuro de la región.')}
            </p>
            {/* Redes Sociales en esta columna también */}
            <div className="flex space-x-4 pt-2">
              {socialLinksConfig.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-400 hover:text-fair-secondary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 md:pl-4"
          >
            <h3 className="text-lg font-semibold text-white mb-3 uppercase tracking-wider">
              {t('footer.contactTitle', 'Contáctanos')}
            </h3>
            <a href={`mailto:${CONTACT_EMAIL_FOOTER}`} className="flex items-center text-sm hover:text-fair-secondary transition-colors">
              <FaEnvelope className="mr-3 flex-shrink-0" /> {CONTACT_EMAIL_FOOTER}
            </a>
            <a href={`tel:${CONTACT_PHONE_FOOTER.replace(/\s|-/g, '')}`} className="flex items-center text-sm hover:text-fair-secondary transition-colors">
              <FaPhone className="mr-3 flex-shrink-0" /> {CONTACT_PHONE_FOOTER}
            </a>
            <p className="flex items-start text-sm"> {/* items-start para alinear ícono con primera línea */}
              <FaMapMarkerAlt className="mr-3 mt-1 flex-shrink-0" />
              <span>{t(FAIR_ADDRESS_FOOTER_KEY, FAIR_ADDRESS_FOOTER_DEFAULT)}</span>
            </p>
          </motion.div>

          {/* Columna 3: Links del Menú */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2 md:pl-4"
          >
            <h3 className="text-lg font-semibold text-white mb-3 uppercase tracking-wider">
              {t('footer.quickLinksTitle', 'Enlaces Rápidos')}
            </h3>
            <ul className="space-y-1">
              {navLinksConfig.map(link => {
                const translatedPathSegment = t(`routes.${link.key}`, { lng: currentLang });
                let fullPath = `/${currentLang}`;
                if (link.key === 'home' && translatedPathSegment === '/') {
                  // No añadir / extra
                } else if (translatedPathSegment.startsWith('/')) {
                  fullPath += translatedPathSegment;
                } else {
                  fullPath += `/${translatedPathSegment}`;
                }
                fullPath = fullPath.replace(/\/\//g, '/');
                if (link.key === 'home' && fullPath === `/${currentLang}/`) {
                  fullPath = `/${currentLang}`;
                }

                return (
                  <li key={link.key}>
                    <Link
                      to={fullPath}
                      className="text-sm hover:text-fair-secondary transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Línea divisoria y Copyright */}
      <div className="border-t border-gray-700 pt-6 mt-8 text-center text-xs">
        <div className="container mx-auto px-4">
          <p>
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="mt-1">
            {t('footer.designedBy', 'Diseñado con ❤️ por @christhoval')} {/* Opcional */}
          </p>
        </div>
      </div>
    </motion.footer >
  );
};

export default Footer;