import i18n from '../i18n'; // Importa tu instancia configurada de i18next

/**
 * Encuentra la clave canónica de una ruta basándose en un segmento de ruta traducido
 * y el idioma de ese segmento.
 *
 * @param pathSegment El segmento de ruta traducido (ej. "/nosotros", "/about-us"). Debe incluir el '/' inicial.
 * @param segmentLang El idioma del pathSegment proporcionado (ej. "es", "en").
 * @returns La clave canónica de la ruta (ej. "about") o null si no se encuentra.
 */
export const findCanonicalKeyForPath = (
  pathSegment: string,
  segmentLang: string
): string | null => {
  if (!pathSegment || !segmentLang) {
    return null;
  }

  // Obtener todas las claves de ruta definidas en el idioma por defecto (o cualquier idioma, ya que las claves son las mismas)
  // Asumimos que 'routes' es un objeto dentro de 'translation' en tus archivos JSON.
  const defaultLang = i18n.options.fallbackLng;
  let baseLangToUse: string | readonly string[] | undefined = Array.isArray(defaultLang) ? defaultLang[0] : defaultLang;
  if (typeof baseLangToUse !== 'string') baseLangToUse = 'es'; // Un fallback más si fallbackLng es complejo

  const routeKeysObject = i18n.getResource(baseLangToUse, 'translation', 'routes');

  if (!routeKeysObject || typeof routeKeysObject !== 'object') {
    console.warn(`No 'routes' object found in translations for language: ${baseLangToUse}`);
    return null;
  }

  const canonicalRouteKeys = Object.keys(routeKeysObject);

  for (const key of canonicalRouteKeys) {
    // Obtener la traducción de esta clave canónica en el segmentLang
    const translatedPathForKey = i18n.t(`routes.${key}`, { lng: segmentLang });

    // Comparar (normalizando para asegurar que ambos tengan o no tengan slash inicial,
    // aunque esperamos que pathSegment ya lo tenga y las traducciones también)
    const normalizedPathSegment = pathSegment.startsWith('/') ? pathSegment : `/${pathSegment}`;
    const normalizedTranslatedPath = translatedPathForKey.startsWith('/') ? translatedPathForKey : `/${translatedPathForKey}`;

    if (normalizedPathSegment.toLowerCase() === normalizedTranslatedPath.toLowerCase()) {
      return key; // Encontramos la clave canónica
    }
  }

  // Caso especial para la ruta raíz "/" que podría no estar explícitamente en todas
  // las traducciones de 'routes' si su clave 'home' siempre se traduce a '/'
  if (pathSegment === '/') {
    // Verificar si hay una clave "home" y si su traducción es "/" en el segmentLang
    const homeTranslated = i18n.t('routes.home', { lng: segmentLang });
    if (homeTranslated === '/') {
      return 'home';
    }
  }


  console.warn(`Could not find canonical key for pathSegment: "${pathSegment}" in language: "${segmentLang}"`);
  return null; // No se encontró ninguna coincidencia
};