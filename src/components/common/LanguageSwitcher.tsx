// src/components/common/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { findCanonicalKeyForPath } from '../../utils/i18nUtils';

const supportedLanguages = ['es', 'en']; // Definir los idiomas soportados globalmente o importarlos

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ lang?: string }>();

  const changeLanguage = (newLng: string) => {
    const currentUrlLang = params.lang;
    let currentPathname = location.pathname;

    if (currentUrlLang === newLng) {
      if (i18n.language.split('-')[0] !== newLng) {
        i18n.changeLanguage(newLng);
      }
      return;
    }

    let pathWithoutAnyLangPrefix = currentPathname;

    // 1. Eliminar CUALQUIER prefijo de idioma soportado de la ruta actual
    // Esto es para manejar casos donde la extracción inicial pudo haber fallado
    // o si la ruta ya estaba mal formada con múltiples prefijos.
    for (const lang of supportedLanguages) {
      const prefixToRemove = `/${lang}`;
      if (pathWithoutAnyLangPrefix.toLowerCase().startsWith(prefixToRemove.toLowerCase())) {
        pathWithoutAnyLangPrefix = pathWithoutAnyLangPrefix.substring(prefixToRemove.length);
        // Si después de quitar el prefijo queda vacío, significa que era la raíz de ese idioma
        if (pathWithoutAnyLangPrefix === '' || pathWithoutAnyLangPrefix === '/') {
          pathWithoutAnyLangPrefix = '/';
        }
        // Rompemos el bucle una vez que encontramos y eliminamos un prefijo,
        // asumiendo que no debería haber múltiples prefijos (ej. /en/es/).
        break;
      }
    }
    // Si después de quitar todos los prefijos, pathWithoutAnyLangPrefix no empieza con '/', añadirlo (excepto si es solo '')
    if (pathWithoutAnyLangPrefix !== '/' && !pathWithoutAnyLangPrefix.startsWith('/') && pathWithoutAnyLangPrefix !== '') {
      pathWithoutAnyLangPrefix = '/' + pathWithoutAnyLangPrefix;
    } else if (pathWithoutAnyLangPrefix === '') { // Si era solo "/es" y quedó "", convertir a "/"
      pathWithoutAnyLangPrefix = '/';
    }


    let segmentToAppend = pathWithoutAnyLangPrefix; // Por defecto, no se traduce

    if (pathWithoutAnyLangPrefix !== '/') {
      const effectiveCurrentLang = currentUrlLang || i18n.language.split('-')[0] || 'es'; // Idioma del segmento actual
      const canonicalRouteKey = findCanonicalKeyForPath(pathWithoutAnyLangPrefix, effectiveCurrentLang);

      if (canonicalRouteKey) {
        const translatedSegment = i18n.t(`routes.${canonicalRouteKey}`, { lng: newLng });
        // Asegurarse de que el segmento traducido tenga el slash inicial si no es solo "/"
        if (translatedSegment === '/') {
          segmentToAppend = '/'; // Si la clave canónica se traduce a la raíz en el nuevo idioma
        } else {
          segmentToAppend = translatedSegment.startsWith('/') ? translatedSegment : `/${translatedSegment}`;
        }
      } else {
        // Si no se encuentra la clave canónica, mantenemos el pathWithoutAnyLangPrefix original.
        // Esto podría pasar si es una ruta dinámica con parámetros que no está en 'routes'.
        console.warn(`Canonical key not found for "${pathWithoutAnyLangPrefix}". Using original segment.`);
      }
    }


    // 3. Construir la nueva ruta completa
    let newPath;
    if (segmentToAppend === '/' || segmentToAppend === '') {
      newPath = `/${newLng}`;
    } else {
      // El `segmentToAppend` ya debería tener el slash inicial correcto (o ser solo "/")
      newPath = `/${newLng}${segmentToAppend}`;
    }

    // Limpieza final (aunque el paso 1 debería haber ayudado mucho)
    newPath = newPath.replace(/\/\//g, '/');
    if (newPath !== `/${newLng}` && newPath.endsWith('/') && newPath.length > `/${newLng}`.length) {
      newPath = newPath.slice(0, -1);
    }


    console.log("--- Language Switch (Robust Clean) ---");
    console.log("Initial Pathname (location.pathname):", currentPathname);
    console.log("Current URL Lang (params.lang):", currentUrlLang);
    console.log("Path After Cleaning ALL Lang Prefixes:", pathWithoutAnyLangPrefix);
    console.log("Segment to Append:", segmentToAppend);
    console.log("New Language (newLng):", newLng);
    console.log("Calculated New Path:", newPath);
    console.log("-------------------------------------");


    i18n.changeLanguage(newLng).then(() => {
      navigate(newPath, { replace: true });
    });
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <div className="language-switcher flex space-x-2 mt-2 sm:mt-0">
      {supportedLanguages.map((lang) => (
        <motion.button
          key={lang}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => changeLanguage(lang)}
          disabled={params.lang === lang}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors
                      ${(params.lang === lang)
              ? 'bg-fair-secondary text-white cursor-default'
              : 'bg-white text-fair-primary hover:bg-fair-light'
            } disabled:opacity-70`}
        >
          {lang.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
};
export default LanguageSwitcher;