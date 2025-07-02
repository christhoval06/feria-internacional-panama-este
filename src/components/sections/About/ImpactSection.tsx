// src/components/sections/About/ImpactSection.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSeedling, FaHorseHead, FaBuilding, FaLightbulb } from 'react-icons/fa'; // Iconos para cada sector

interface ImpactItem {
  id: string;
  color: string; // Color para el borde superior de la tarjeta
  icon: React.ReactElement;
  titleKey: string;
  textKey: string;
  defaultTitle: string;
  defaultText: string;
  bgColorClass: string; // Para un fondo sutil a la tarjeta del icono
}

const impactData: ImpactItem[] = [
  {
    id: 'agro',
    color: 'green',
    icon: <FaSeedling className="text-5xl text-green-600" />,
    titleKey: 'about.impactAgroTitle',
    textKey: 'about.impactAgroText',
    defaultTitle: 'Sector Agropecuario',
    defaultText: 'Acceso a nuevas tecnologías, mejora de prácticas productivas, optimización de recursos y apertura a mercados nacionales e internacionales para nuestros agricultores.',
    bgColorClass: 'bg-green-50',
  },
  {
    id: 'livestock',
    color: 'yellow',
    icon: <FaHorseHead className="text-5xl text-yellow-600" />,
    titleKey: 'about.impactLivestockTitle',
    textKey: 'about.impactLivestockText',
    defaultTitle: 'Sector Ganadero',
    defaultText: 'Fomento de la mejora genética, implementación de buenas prácticas de manejo y sanidad animal, y una plataforma para la exhibición de la excelencia ganadera de la región.',
    bgColorClass: 'bg-yellow-50',
  },
  {
    id: 'business',
    color: 'blue',
    icon: <FaBuilding className="text-5xl text-blue-600" />,
    titleKey: 'about.impactBusinessTitle',
    textKey: 'about.impactBusinessText',
    defaultTitle: 'Sector Empresarial',
    defaultText: 'Creación de valiosas oportunidades de networking, establecimiento de alianzas estratégicas, mayor visibilidad para empresas locales y atracción de inversión.',
    bgColorClass: 'bg-blue-50',
  },
  {
    id: 'entrepreneurship',
    color: 'purple',
    icon: <FaLightbulb className="text-5xl text-purple-600" />,
    titleKey: 'about.impactEntrepreneurshipTitle',
    textKey: 'about.impactEntrepreneurshipText',
    defaultTitle: 'Sector de Emprendimientos',
    defaultText: 'Una plataforma de lanzamiento para nuevas ideas y startups, acceso a mentoría, visibilidad ante posibles inversores y fomento de una cultura de innovación.',
    bgColorClass: 'bg-purple-50',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const ImpactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-fair-primary">
            {t('about.impactTitle', 'Impacto en Panamá Este y sus Sectores')}
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.impactIntro', 'La feria está diseñada para generar un impacto positivo y tangible en nuestra comunidad y sus pilares económicos:')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {impactData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index} // Puedes usar index para delays escalonados si configuras la transición
              className={`flex flex-col sm:flex-row items-start p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border-t-4 border-${item.color}-500`} // Borde superior del color del ícono
            >
              <div className={`flex-shrink-0 p-4 rounded-full mr-0 mb-4 sm:mr-6 sm:mb-0 ${item.bgColorClass}`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-fair-primary mb-2">
                  {t(item.titleKey, item.defaultTitle)}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t(item.textKey, item.defaultText)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;