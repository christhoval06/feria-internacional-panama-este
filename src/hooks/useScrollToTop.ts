// src/hooks/useScrollToTop.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado que desplaza la ventana del navegador a la parte superior
 * cada vez que cambia la ubicación (ruta) de la aplicación.
 */
const useScrollToTop = (): void => {
  const { pathname } = useLocation(); // Obtiene el pathname actual de la URL

  useEffect(() => {
    // Intenta desplazar la ventana al inicio de la página.
    // Usamos try-catch por si window.scrollTo no está disponible en algún entorno (muy raro para navegadores).
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth', // Opcional: 'auto' para un scroll instantáneo, 'smooth' para uno animado
      });
    } catch (error) {
      // Si window.scrollTo no está disponible o falla, simplemente desplaza al inicio de forma básica.
      console.warn("window.scrollTo no está disponible o falló:", error);
      window.scrollTo(0, 0);
    }
  }, [pathname]); // El efecto se ejecuta cada vez que 'pathname' cambia
};

export default useScrollToTop;