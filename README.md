# Primera Feria Internacional de Panamá Este 2025 - Sitio Web Oficial

Este repositorio contiene el código fuente del sitio web oficial para la **Primera Feria Internacional de Panamá Este 2025**, un evento dedicado a los sectores Agropecuario, Ganadero, Empresarial y de Emprendimientos.

## Stack Tecnológico

*   **Framework Frontend:** [React](https://reactjs.org/) (con TypeScript)
*   **Bundler/Herramienta de Desarrollo:** [Vite](https://vitejs.dev/)
*   **Estilización CSS:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
*   **Internacionalización (l10n):** [i18next](https://www.i18next.com/) con [react-i18next](https://react.i18next.com/)
*   **Enrutamiento:** [React Router DOM](https://reactrouter.com/)
*   **Carrusel:** [React Slick](https://react-slick.neostack.com/)
*   **Generación de Archivos .ics (Calendario):** [ics](https://www.npmjs.com/package/ics)
*   **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)

## Secciones Principales de la Web

*   **Inicio (Landing de Invitación):** Página principal con información destacada y llamado a la acción.
*   **Nosotros (About Us):** Información sobre la feria, su misión, visión y organizadores.
*   **Carrusel de Actividades:** Muestra visual de las principales actividades y atracciones.
*   **Calendario de Eventos:** Agenda detallada con opción para descargar eventos (.ics) y añadirlos al calendario personal.
*   **Ubicación:** Mapa interactivo e indicaciones sobre cómo llegar al recinto ferial.
*   **Contacto:** Formulario de contacto e información para consultas.
*   **Footer y Copyright:** Información legal y enlaces relevantes.

## Estructura del Proyecto

```
feria-panama-este-tailwind/
├── public/ # Archivos estáticos públicos
│ ├── favicon.ico
│ └── logo-feria.png # Ejemplo de logo
├── src/
│ ├── assets/ # Recursos como imágenes, fuentes, etc.
│ │ ├── images/
│ │ └── icons/
│ ├── components/ # Componentes reutilizables de React
│ │ ├── common/ # Componentes genéricos (Botones, Tarjetas, etc.)
│ │ │ ├── Button.tsx
│ │ │ ├── Card.tsx
│ │ │ └── LanguageSwitcher.tsx
│ │ ├── layout/ # Componentes de estructura (Header, Footer, Navbar)
│ │ │ ├── Header.tsx
│ │ │ ├── Footer.tsx
│ │ │ └── Navbar.tsx
│ │ └── sections/ # Componentes específicos para cada sección de la página
│ │ ├── Home/
│ │ │ ├── HeroSection.tsx
│ │ │ └── FairHighlights.tsx
│ │ ├── About/
│ │ │ └── AboutContent.tsx
│ │ ├── Activities/
│ │ │ └── ActivityCarousel.tsx
│ │ ├── Calendar/
│ │ │ ├── EventItem.tsx
│ │ │ └── CalendarView.tsx
│ │ ├── Location/
│ │ │ └── MapEmbed.tsx
│ │ └── Contact/
│ │ └── ContactForm.tsx
│ ├── hooks/ # Hooks personalizados de React
│ │ └── useScrollToTop.ts
│ ├── locales/ # Archivos de traducción para i18next
│ │ ├── en/
│ │ │ └── translation.json
│ │ └── es/
│ │ └── translation.json
│ ├── pages/ # Componentes que representan cada página/ruta
│ │ ├── HomePage.tsx
│ │ ├── AboutPage.tsx
│ │ ├── ActivitiesPage.tsx
│ │ ├── CalendarPage.tsx
│ │ ├── LocationPage.tsx
│ │ ├── ContactPage.tsx
│ │ └── NotFoundPage.tsx
│ ├── routes/ # Configuración del enrutamiento
│ │ └── AppRoutes.tsx
│ ├── utils/ # Funciones de utilidad
│ │ └── calendarUtils.ts
│ ├── App.tsx # Componente raíz de la aplicación
│ ├── main.tsx # Punto de entrada de la aplicación (renderiza App)
│ ├── i18n.ts # Configuración de i18next
│ └── index.css # Estilos globales y directivas de Tailwind CSS
├── .eslintrc.cjs # Configuración de ESLint
├── .gitignore # Archivos y carpetas ignorados por Git
├── index.html # Plantilla HTML principal
├── package.json # Metadatos del proyecto y dependencias
├── postcss.config.js # Configuración de PostCSS (para Tailwind)
├── tailwind.config.js # Configuración de Tailwind CSS
├── tsconfig.json # Configuración del compilador TypeScript
├── tsconfig.node.json # Configuración de TypeScript para el entorno Node (Vite)
└── vite.config.ts # Configuración de Vite
```

## Instalación y Puesta en Marcha

1.  **Clonar el Repositorio (si aplica):**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd feria-panama-este-tailwind
    ```

2.  **Instalar Dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) (v18 o superior recomendado) y [npm](https://www.npmjs.com/) (o [yarn](https://yarnpkg.com/)) instalados.
    ```bash
    npm install
    # o
    # yarn install
    ```

3.  **Ejecutar el Servidor de Desarrollo:**
    Esto iniciará la aplicación en modo de desarrollo con hot-reloading.
    ```bash
    npm run dev
    # o
    # yarn dev
    ```
    Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite) en tu navegador para ver la aplicación.

## Scripts Disponibles

En el archivo `package.json`, encontrarás varios scripts útiles:

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
*   `npm run preview`: Sirve localmente la build de producción desde la carpeta `dist/` para previsualizarla.

## Internacionalización (l10n)

La aplicación utiliza `i18next` para la gestión de múltiples idiomas.
*   Los archivos de traducción se encuentran en `src/locales/`.
*   Actualmente, se soportan **Español (es)** e **Inglés (en)**.
*   El idioma se detecta automáticamente según la configuración del navegador del usuario, con "es" como idioma de fallback.
*   Se incluye un componente `LanguageSwitcher` para permitir al usuario cambiar de idioma manualmente.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue las guías de estilo del proyecto y asegúrate de que todas las pruebas pasen antes de enviar un Pull Request.

## Despliegue

La aplicación está construida como un sitio estático y puede ser desplegada en cualquier plataforma de hosting que soporte este tipo de sitios (ej. Vercel, Netlify, GitHub Pages, AWS S3, etc.).

1.  Genera la build de producción:
    ```bash
    npm run build
    ```
2.  Sube el contenido de la carpeta `dist/` a tu proveedor de hosting.

## Licencia

(Opcional: Especifica una licencia si es necesario, ej: MIT, Apache 2.0, etc.)
Este proyecto es para uso exclusivo de la Primera Feria Internacional de Panamá Este.

---

¡Esperamos que esta plataforma web sea un gran éxito para la feria!