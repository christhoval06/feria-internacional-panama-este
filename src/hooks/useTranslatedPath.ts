import { useTranslation } from 'react-i18next';

/**
 * Hook para obtener la ruta traducida para una clave de ruta dada.
 * @param pathKey Clave de la ruta en los archivos de traducción (ej. "about", "contact")
 * @returns La ruta traducida (ej. "/nosotros", "/contact-us")
 */
export const useTranslatedPath = (pathKey: string): string => {
  const { t, i18n } = useTranslation();
  // Asegúrate de que la clave de la ruta exista en el namespace de rutas.
  // Si no se encuentra, devuelve un slug simple como fallback.
  const translated = t(`routes.${pathKey}`, { lng: i18n.language });

  // Si la traducción es la misma que la clave, significa que no se encontró
  // o que intencionalmente es así (como para 'home' -> '/')
  if (translated === `routes.${pathKey}`) {
    // Fallback si no se encuentra la traducción de la ruta (esto no debería pasar si está bien configurado)
    // Para 'home', esto es esperado si se mapea a '/'
    if (pathKey === 'home') return '/';
    console.warn(`Missing route translation for key: routes.${pathKey} in language ${i18n.language}`);
    return `/${pathKey}`; // Fallback simple
  }
  return translated;
};
