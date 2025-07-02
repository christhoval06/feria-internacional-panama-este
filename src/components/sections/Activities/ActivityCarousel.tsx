import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { scheduleData, type ScheduleItem } from "../../../data/masterScheduleData";
import { Link } from "react-router-dom";

// Función para seleccionar algunas actividades destacadas para el carrusel
// Podrías tener una lógica más sofisticada aquí, como un flag "isFeatured" en ScheduleItem
// o seleccionar por categoría específica.
const getFeaturedActivities = (allActivities: ScheduleItem[], count: number = 6): ScheduleItem[] => {
  // Ejemplo: Tomar las primeras 'count' actividades que tengan una imagen definida
  // y que no sean de apertura o clausura para variar.
  const suitableActivities = allActivities.filter(
    act => act.imageUrl &&
      act.categoryKey !== 'calendar.categories.opening' &&
      act.categoryKey !== 'calendar.categories.closing'
  );
  return suitableActivities.slice(0, count);
};


function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center !w-10 !h-10 !bg-fair-primary/70 hover:!bg-fair-primary rounded-full hidden`}
      style={{ ...style, right: "-25px" }}
      onClick={onClick}
    >
      <FaArrowRight className="text-black" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center !w-10 !h-10 !bg-fair-primary/70 hover:!bg-fair-primary rounded-full hidden`}
      style={{ ...style, left: "-25px", zIndex: 1 }}
      onClick={onClick}
    >
      <FaArrowLeft className="text-black" />
    </div>
  );
}


const ActivityCarousel = () => {
  const { t, i18n } = useTranslation();
  const featuredActivities = getFeaturedActivities(scheduleData);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, arrows: false, } }
    ],
    appendDots: (dots: any) => (
      <div>
        <ul className="!m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-fair-accent/50 rounded-full transition-all duration-300 ease-in-out group-[.slick-active]:bg-fair-accent group-[.slick-active]:w-5"></div>
    )
  };

  if (featuredActivities.length === 0) {
    return null; // No renderizar el carrusel si no hay actividades destacadas
  }

  // Para el enlace "Ver todas las actividades"
  const currentLang = i18n.language.split('-')[0];
  const activitiesPathKey = t('routes.activities', { lng: currentLang });
  const fullActivitiesPath = `/${currentLang}${activitiesPathKey.startsWith('/') ? activitiesPathKey : '/' + activitiesPathKey}`.replace(/\/\//g, '/');

  return (
    <section className="py-12">
      <div className="flex-grow container mx-auto px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-fair-primary mb-8"
        >
          {t('activities.pageTitle')}
        </motion.h2>
        <Slider {...settings} className="mx-[-10px]"> {/* Negative margin to counteract padding on slides */}
          {featuredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="px-2.5 h-full" // h-full para asegurar que las tarjetas tengan la misma altura si el contenido varía
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }} // Animación cuando entra en vista
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
                <img
                  src={activity.imageUrl || 'https://via.placeholder.com/400x250/CCCCCC/FFFFFF?Text=Actividad'}
                  alt={t(activity.titleKey)}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  {activity.categoryKey && (
                    <span className="inline-block bg-fair-accent/10 text-fair-accent text-xs font-semibold px-2 py-0.5 rounded-full mb-2 self-start">
                      {t(activity.categoryKey)}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-fair-primary mb-2">
                    {t(activity.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-600 flex-grow">
                    {t(activity.shortDescriptionKey)}
                  </p>
                  {/* Podrías añadir un enlace a la página de detalle de la actividad si la tienes */}
                  {/* <Link to={`/${currentLang}${activitiesPathKey}/${activity.id}`} className="mt-3 text-sm text-fair-secondary hover:underline self-start">
                    {t('activities.learnMore', 'Saber más')}
                  </Link> */}
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
        <div className="text-center mt-10 md:mt-12">
          <Link
            to={fullActivitiesPath}
            className="bg-fair-primary hover:bg-fair-primary/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 inline-flex items-center"
          >
            {t('activities.viewAllButton', 'Ver Todas las Actividades')} <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

    </section>
  );
};
export default ActivityCarousel;