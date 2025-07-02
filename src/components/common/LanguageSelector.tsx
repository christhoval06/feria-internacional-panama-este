import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { findCanonicalKeyForPath } from "../../utils/i18nUtils";
// import styles from "./LanguageSelector.module.scss";

interface FlagIconProps {
    countryCode: string;
}



function FlagIcon({ countryCode = "" }: FlagIconProps) {
    // https://svgflags.com/
    switch (countryCode) {
        case "en":
            return (
                <svg className="inline-block mr-2 size-4" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256" /><g fill="#0052b4"><path d="m52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178z" /><path d="m503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076z" /><path d="m8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075z" /><path d="m411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177z" /><path d="m100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102v-133.176z" /><path d="m189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075z" /><path d="m322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075z" /><path d="m370.005 322.784 89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076z" /></g><g fill="#d80027"><path d="m509.833 222.609h-220.44-.001v-220.442c-10.931-1.423-22.075-2.167-33.392-2.167-11.319 0-22.461.744-33.391 2.167v220.44.001h-220.442c-1.423 10.931-2.167 22.075-2.167 33.392 0 11.319.744 22.461 2.167 33.391h220.44.001v220.442c10.931 1.423 22.073 2.167 33.392 2.167 11.317 0 22.461-.743 33.391-2.167v-220.44-.001h220.442c1.423-10.931 2.167-22.073 2.167-33.392 0-11.317-.744-22.461-2.167-33.391z" /><path d="m322.783 322.784 114.236 114.236c5.254-5.252 10.266-10.743 15.048-16.435l-97.802-97.802h-31.482z" /><path d="m189.217 322.784h-.002l-114.235 114.235c5.252 5.254 10.743 10.266 16.435 15.048l97.802-97.804z" /><path d="m189.217 189.219v-.002l-114.236-114.237c-5.254 5.252-10.266 10.743-15.048 16.435l97.803 97.803h31.481z" /><path d="m322.783 189.219 114.237-114.238c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802 97.803z" /></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
            )
        case "es":
        default:
            return (
                <svg className="inline-block mr-2 size-4" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256" /><path d="m0 256c0 141.384 114.616 256 256 256 0-97.355 0-256 0-256s-166.957 0-256 0z" fill="#0052b4" /><path d="m256 0c141.384 0 256 114.616 256 256-97.355 0-256 0-256 0s0-166.957 0-256z" fill="#d80027" /><path d="m152.389 89.043 16.577 51.018h53.643l-43.398 31.53 16.576 51.018-43.398-31.531-43.398 31.531 16.576-51.018-43.398-31.53h53.643z" fill="#0052b4" /><path d="m359.611 289.391 16.577 51.018h53.643l-43.399 31.53 16.577 51.018-43.398-31.531-43.398 31.531 16.576-51.018-43.398-31.53h53.643z" fill="#d80027" /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
            )
    }
}

interface Language {
    key: string;
    name: string;
}

const supportedLanguages: Language[] = [{ key: 'es', name: 'Español' }, {
    key: 'en',
    name: 'English'
}];

const LANGUAGE_SELECTOR_ID = 'language-selector';

export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams<{ lang?: string }>();

    const [isOpen, setIsOpen] = useState(true);
    const selectedLanguage = supportedLanguages.find(language => language.key === i18n.language);

    const handleLanguageChange = async (language: Language) => {

        const newLng = language.key;

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
            const prefixToRemove = `/${lang.key}`;
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

    useEffect(() => {
        const handleWindowClick = (event: any) => {
            const target = event.target.closest('button');
            if (target && target.id === LANGUAGE_SELECTOR_ID) {
                return;
            }
            setIsOpen(false);
        }
        window.addEventListener('click', handleWindowClick)
        return () => {
            window.removeEventListener('click', handleWindowClick);
        }
    }, []);

    if (!selectedLanguage) {
        return null;
    }

    return (
        <>
            <div className="flex items-center z-40">
                <div className="relative inline-block text-left">
                    <div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            id={LANGUAGE_SELECTOR_ID}
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            <FlagIcon countryCode={selectedLanguage.key} />
                            {selectedLanguage.name}
                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    {isOpen && <div
                        className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="language-selector"
                    >
                        <div className="py-1 grid grid-cols-2 gap-2" role="none">
                            {supportedLanguages.map((language, index) => {
                                return (
                                    <button
                                        key={language.key}
                                        onClick={() => handleLanguageChange(language)}
                                        className={`${selectedLanguage.key === language.key
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700"
                                            } block px-4 py-2 text-sm text-left items-center inline-flex hover:bg-gray-100 ${index % 2 === 0 ? 'rounded-r' : 'rounded-l'}`}
                                        role="menuitem"
                                    >
                                        <FlagIcon countryCode={language.key} />
                                        <span className="truncate">{language.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
};