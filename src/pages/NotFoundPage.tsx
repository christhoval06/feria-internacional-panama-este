// src/pages/NotFoundPage.tsx
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

// Opcional: Importa una imagen o SVG para la página 404
// import notFoundImage from '../assets/images/404-image.svg'; // Necesitarás esta imagen

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams<{ lang?: string }>(); // Para obtener el idioma de la URL si existe

  // Determinar el prefijo de idioma para los enlaces
  const currentLang = params.lang || i18n.language.split('-')[0] || 'es';
  const homePath = `/${currentLang}${t('routes.home', { lng: currentLang })}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center px-4 py-12 md:py-20 min-h-[calc(100vh-200px)]" // Ajusta min-h según tu header/footer
    >
      {/* Icono o Imagen */}
      {/* {notFoundImage ? (
        <img src={notFoundImage} alt={t('notFound.altImage', "Ilustración de página no encontrada")} className="w-48 h-48 md:w-64 md:h-64 mb-8" />
      ) : ( */}
        <FaExclamationTriangle className="text-6xl md:text-8xl text-fair-secondary mb-8" />
      {/* )} */}

      <h1 className="text-5xl md:text-7xl font-bold text-fair-primary mb-4">
        {t('notFound.title', '404')}
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-2">
        {t('notFound.subtitle', '¡Oops! Página no encontrada.')}
      </p>
      <p className="text-md text-gray-600 mb-8 max-w-md">
        {t('notFound.message', 'Lo sentimos, la página que estás buscando no existe, ha sido eliminada, su nombre ha cambiado o no está disponible temporalmente.')}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to={homePath.replace(/\/\//g, '/')} // Asegurar que no haya doble slash
          className="bg-fair-primary hover:bg-fair-primary/80 text-white font-semibold py-3 px-6 rounded-lg text-lg inline-flex items-center transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          {t('notFound.goHome', 'Ir a Inicio')}
        </Link>
        <button
          onClick={() => navigate(-1)} // Retrocede una página en el historial
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg text-lg inline-flex items-center transition-colors duration-300"
        >
          {t('notFound.goBack', 'Volver Atrás')}
        </button>
      </div>

      {/* Opcional: Enlaces a otras secciones */}
      <div className="mt-10 text-sm">
        <p className="text-gray-500 mb-2">{t('notFound.tryLinks', 'O prueba uno de estos enlaces:')}</p>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link to={`/${currentLang}${t('routes.activities', { lng: currentLang })}`.replace(/\/\//g, '/')} className="text-fair-secondary hover:underline">
            {t('nav.activities', 'Actividades')}
          </Link>
          <Link to={`/${currentLang}${t('routes.calendar', { lng: currentLang })}`.replace(/\/\//g, '/')} className="text-fair-secondary hover:underline">
            {t('nav.calendar', 'Calendario')}
          </Link>
          <Link to={`/${currentLang}${t('routes.contact', { lng: currentLang })}`.replace(/\/\//g, '/')} className="text-fair-secondary hover:underline">
            {t('nav.contact', 'Contacto')}
          </Link>
        </nav>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;