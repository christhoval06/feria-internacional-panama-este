// src/components/layout/MobileMenu.tsx
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaEnvelope, FaHome, FaInfoCircle, FaMapMarkerAlt, FaTasks } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import logo from '../../assets/images/logo-1.png';
import LanguageSwitcher from '../common/LanguageSwitcher'; // Reutilizamos el mismo

interface MobileMenuProps {
    onClose: () => void; // Función para cerrar el menú
}

const menuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
    exit: { x: '100%', opacity: 0, transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

const navItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
    const { t, i18n } = useTranslation();
    const params = useParams<{ lang?: string }>();
    const currentLang = params.lang || i18n.language.split('-')[0] || 'es';

    const routeKeys = [
        { key: 'home', icon: <FaHome className="mr-3" /> },
        { key: 'about', icon: <FaInfoCircle className="mr-3" /> },
        { key: 'activities', icon: <FaTasks className="mr-3" /> },
        { key: 'calendar', icon: <FaCalendarAlt className="mr-3" /> },
        { key: 'location', icon: <FaMapMarkerAlt className="mr-3" /> },
        { key: 'contact', icon: <FaEnvelope className="mr-3" /> },
    ];

    // Cerrar menú al hacer clic en un enlace (manejado también por el useEffect en Header, pero esto es más inmediato)
    const handleLinkClick = () => {
        onClose();
    };

    return (
        <>
            {/* Backdrop (opcional, si quieres oscurecer el fondo) */}
            <motion.div
                key="mobile-backdrop"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose} // Cerrar al hacer clic en el backdrop
                className="fixed inset-0 bg-black/50 z-35 lg:hidden" // z-index menor que el menú
            />

            <motion.div
                key="mobile-menu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm h-full bg-fair-primary shadow-2xl z-40 flex flex-col lg:hidden"
                // Ajusta el padding superior para que coincida con la altura del header si es necesario
                // O deja que el header sea sticky y el menú empiece debajo
                style={{ paddingTop: '4rem' }} // Ejemplo si el header tiene ~4rem de altura
            >
                <div className="p-4 border-b border-white/20">
                    <img src={logo} alt={t('fairName')} className="h-10 w-auto" />
                </div>

                <nav className="flex-grow p-6 space-y-1 overflow-y-auto">
                    {routeKeys.map((route, index) => {
                        const translatedPathSegment = t(`routes.${route.key}`, { lng: currentLang });
                        let fullPath = `/${currentLang}`;
                        if (route.key === 'home' && translatedPathSegment === '/') {
                            // noop
                        } else if (translatedPathSegment.startsWith('/')) {
                            fullPath += translatedPathSegment;
                        } else {
                            fullPath += `/${translatedPathSegment}`;
                        }
                        fullPath = fullPath.replace(/\/\//g, '/');
                        if (route.key === 'home' && fullPath === `/${currentLang}/`) {
                            fullPath = `/${currentLang}`;
                        } else if (fullPath !== `/${currentLang}` && fullPath.endsWith('/')) {
                            fullPath = fullPath.slice(0, -1);
                        }


                        return (
                            <motion.div
                                key={route.key}
                                variants={navItemVariants}
                                initial="hidden" // Estos se animarán con staggerChildren en el ul o nav si lo envuelves
                                animate="visible"
                                transition={{ delay: 0.1 + index * 0.05 }} // Animación escalonada
                            >
                                <NavLink
                                    to={fullPath}
                                    onClick={handleLinkClick} // Cerrar menú al hacer clic
                                    className={({ isActive }) =>
                                        `flex items-center py-3 px-3 text-lg rounded-md transition-colors font-medium
                    ${isActive
                                            ? 'bg-fair-secondary text-white'
                                            : 'text-gray-200 hover:bg-white/10 hover:text-white'
                                        }`
                                    }
                                >
                                    {route.icon}
                                    {t(`nav.${route.key}`)}
                                </NavLink>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Language Switcher en el pie del menú móvil */}
                <div className="p-6 border-t border-white/20">
                    <p className="text-sm text-gray-300 mb-3 text-center">{t('mobileMenu.changeLanguage', 'Cambiar Idioma:')}</p>
                    <div className="flex justify-center">
                        <LanguageSwitcher />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default MobileMenu;