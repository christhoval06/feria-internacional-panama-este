// src/components/sections/Home/FairHighlights.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaLeaf, FaHorseHead, FaCity, FaLightbulb } from 'react-icons/fa'; // Iconos de ejemplo

// Importa tus imágenes (ajusta las rutas si es necesario)
import agroImage from '../../../assets/images/highlights/agro-highlight.jpg';
import ganaderiaImage from '../../../assets/images/highlights/ganaderia-highlight.jpg';
import empresarialImage from '../../../assets/images/highlights/empresarial-highlight.jpg';
import emprendimientoImage from '../../../assets/images/highlights/emprendimiento-highlight.jpg';
import { cloneElement } from 'react';

interface HighlightItem {
  id: string;
  icon: React.ReactElement;
  titleKey: string;
  descriptionKey: string;
  image: string;
  bgColor: string; // Para un fondo distintivo en la tarjeta
  textColor: string;
}

const highlightsData: HighlightItem[] = [
  {
    id: 'agro',
    icon: <FaLeaf className="text-4xl mb-3" />,
    titleKey: 'highlights.agro_title',
    descriptionKey: 'highlights.agro_desc',
    image: agroImage,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'ganaderia',
    icon: <FaHorseHead className="text-4xl mb-3" />,
    titleKey: 'highlights.ganaderia_title',
    descriptionKey: 'highlights.ganaderia_desc',
    image: ganaderiaImage,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  {
    id: 'empresarial',
    icon: <FaCity className="text-4xl mb-3" />,
    titleKey: 'highlights.empresarial_title',
    descriptionKey: 'highlights.empresarial_desc',
    image: empresarialImage,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    id: 'emprendimiento',
    icon: <FaLightbulb className="text-4xl mb-3" />,
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
    <section className="py-12 md:py-16 bg-fair-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-fair-primary mb-10 md:mb-12"
        >
          {t('highlights.title')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlightsData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index} // Pasa el índice para el delay escalonado
              variants={cardVariants}
              initial="hidden"
              whileInView="visible" // Anima cuando el elemento entra en el viewport
              viewport={{ once: true, amount: 0.3 }} // `once: true` para animar solo una vez, `amount` para definir qué porcentaje del elemento debe estar visible
              className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${item.bgColor}`}
            >
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="w-full h-48 object-cover"
              />
              <div className={`p-6 ${item.textColor}`}>
                <div className="flex justify-center mb-3">
                  {cloneElement(item.icon, { className: `${item.icon.props.className} ${item.textColor}` })}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-center text-gray-700">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FairHighlights;