import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

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
      className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-12 text-center md:py-20" // Ajusta min-h según tu header/footer
    >
      {/* Icono o Imagen */}
      {/* {notFoundImage ? (
        <img src={notFoundImage} alt={t('notFound.altImage', "Ilustración de página no encontrada")} className="w-48 h-48 md:w-64 md:h-64 mb-8" />
      ) : ( */}
      <FaExclamationTriangle className="text-fair-secondary mb-8 text-6xl md:text-8xl" />
      {/* )} */}

      <h1 className="text-fair-primary mb-4 text-5xl font-bold md:text-7xl">{t('notFound.title', '404')}</h1>
      <p className="mb-2 text-xl text-gray-700 md:text-2xl">{t('notFound.subtitle', '¡Oops! Página no encontrada.')}</p>
      <p className="text-md mb-8 max-w-md text-gray-600">
        {t(
          'notFound.message',
          'Lo sentimos, la página que estás buscando no existe, ha sido eliminada, su nombre ha cambiado o no está disponible temporalmente.',
        )}
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          to={homePath.replace(/\/\//g, '/')} // Asegurar que no haya doble slash
          className="bg-fair-primary hover:bg-fair-primary/80 inline-flex items-center rounded-lg px-6 py-3 text-lg font-semibold text-white transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          {t('notFound.goHome', 'Ir a Inicio')}
        </Link>
        <button
          onClick={() => navigate(-1)} // Retrocede una página en el historial
          className="inline-flex items-center rounded-lg bg-gray-200 px-6 py-3 text-lg font-semibold text-gray-700 transition-colors duration-300 hover:bg-gray-300"
        >
          {t('notFound.goBack', 'Volver Atrás')}
        </button>
      </div>

      {/* Opcional: Enlaces a otras secciones */}
      <div className="mt-10 text-sm">
        <p className="mb-2 text-gray-500">{t('notFound.tryLinks', 'O prueba uno de estos enlaces:')}</p>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link
            to={`/${currentLang}${t('routes.activities', { lng: currentLang })}`.replace(/\/\//g, '/')}
            className="text-fair-secondary hover:underline"
          >
            {t('nav.activities', 'Actividades')}
          </Link>
          <Link
            to={`/${currentLang}${t('routes.calendar', { lng: currentLang })}`.replace(/\/\//g, '/')}
            className="text-fair-secondary hover:underline"
          >
            {t('nav.calendar', 'Calendario')}
          </Link>
          <Link
            to={`/${currentLang}${t('routes.contact', { lng: currentLang })}`.replace(/\/\//g, '/')}
            className="text-fair-secondary hover:underline"
          >
            {t('nav.contact', 'Contacto')}
          </Link>
        </nav>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
