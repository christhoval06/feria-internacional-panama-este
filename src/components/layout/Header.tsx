import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/images/logo-1.png';
import i18n from '../../i18n';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Evitar scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Asegurarse de restaurar al desmontar
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className="bg-fair-primary sticky top-0 z-10 text-white shadow-lg"
      >
        <div className="flex flex-col items-center justify-between bg-red-500 px-10 py-2 text-right text-white sm:flex-row">
          <p className="text-sm">
            <strong className="mx-2">xxxxxxxx:</strong>xxxxxxxxxxxxxxxx
            <strong className="mx-2">xxxxxxxx:</strong>xxxxxxxx
          </p>
          <div className="flex justify-between">
            {Array.from(new Array(4)).map(() => (
              <div className="mx-1 h-6 w-6 rounded bg-white" />
            ))}
          </div>
        </div>

        <div className="container mx-auto flex flex-row items-center justify-between px-4 py-4">
          <Link
            to={`/${i18n.language.split('-')[0] || 'es'}${t('routes.home')}`.replace(/\/\//g, '/')}
            className="flex items-center"
          >
            <img src={logo} alt={t('fairName')} className="mr-2 h-8 w-auto sm:mr-3 sm:h-10" />
            <h1 className="hidden text-lg font-bold tracking-tight sm:text-xl md:text-2xl lg:inline-block">
              {t('fairName')}
            </h1>
          </Link>
          <div className="hidden lg:flex">
            <Navbar />
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="focus:ring-fair-secondary rounded p-2 text-white focus:ring-2 focus:outline-none"
              aria-label={isMobileMenuOpen ? t('header.closeMenu', 'Cerrar menú') : t('header.openMenu', 'Abrir menú')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}</AnimatePresence>
    </>
  );
};
export default Header;
