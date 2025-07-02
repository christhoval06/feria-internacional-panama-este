import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaLeaf, FaHorseHead, FaCity, FaLightbulb } from 'react-icons/fa'; // Iconos de ejemplo
import { type IconType, type IconBaseProps } from 'react-icons';

// Importa tus imágenes (ajusta las rutas si es necesario)
import agroImage from '../../../assets/images/highlights/agro-highlight.jpg';
import ganaderiaImage from '../../../assets/images/highlights/ganaderia-highlight.jpg';
import empresarialImage from '../../../assets/images/highlights/empresarial-highlight.jpg';
import emprendimientoImage from '../../../assets/images/highlights/emprendimiento-highlight.jpg';
import { cloneElement } from 'react';

interface HighlightItem {
  id: string;
  icon: React.ReactElement<IconBaseProps, IconType>;
  titleKey: string;
  descriptionKey: string;
  image: string;
  bgColor: string; // Para un fondo distintivo en la tarjeta
  textColor: string;
}

const highlightsData: HighlightItem[] = [
  {
    id: 'agro',
    icon: <FaLeaf className="mb-3 text-4xl" />,
    titleKey: 'highlights.agro_title',
    descriptionKey: 'highlights.agro_desc',
    image: agroImage,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'ganaderia',
    icon: <FaHorseHead className="mb-3 text-4xl" />,
    titleKey: 'highlights.ganaderia_title',
    descriptionKey: 'highlights.ganaderia_desc',
    image: ganaderiaImage,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  {
    id: 'empresarial',
    icon: <FaCity className="mb-3 text-4xl" />,
    titleKey: 'highlights.empresarial_title',
    descriptionKey: 'highlights.empresarial_desc',
    image: empresarialImage,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    id: 'emprendimiento',
    icon: <FaLightbulb className="mb-3 text-4xl" />,
    titleKey: 'highlights.emprendimiento_title',
    descriptionKey: 'highlights.emprendimiento_desc',
    image: emprendimientoImage,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // Efecto de aparición escalonado
      duration: 0.5,
    },
  }),
};

const FairHighlights = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-fair-light py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-fair-primary mb-10 text-center text-3xl font-bold md:mb-12 md:text-4xl"
        >
          {t('highlights.title')}
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {highlightsData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index} // Pasa el índice para el delay escalonado
              variants={cardVariants}
              initial="hidden"
              whileInView="visible" // Anima cuando el elemento entra en el viewport
              viewport={{ once: true, amount: 0.3 }} // `once: true` para animar solo una vez, `amount` para definir qué porcentaje del elemento debe estar visible
              className={`transform overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${item.bgColor}`}
            >
              <img src={item.image} alt={t(item.titleKey)} className="h-48 w-full object-cover" />
              <div className={`p-6 ${item.textColor}`}>
                <div className="mb-3 flex justify-center">
                  {cloneElement(item.icon, { className: `${item.icon.props.className} ${item.textColor}` })}
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold">{t(item.titleKey)}</h3>
                <p className="text-center text-sm text-gray-700">{t(item.descriptionKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FairHighlights;
