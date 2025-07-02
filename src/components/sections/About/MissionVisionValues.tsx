import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaHeart } from 'react-icons/fa'; // Iconos de ejemplo

const MissionVisionValues = () => {
  const { t } = useTranslation();

  const items = [
    {
      icon: <FaBullseye className="text-4xl text-fair-secondary mb-4" />,
      titleKey: 'about.missionTitle',
      textKey: 'about.missionText',
      defaultTitle: 'Nuestra Misión',
      defaultText: 'Fomentar la innovación, el intercambio comercial y el conocimiento en los sectores agropecuario, ganadero, empresarial y de emprendimiento, impulsando el desarrollo sostenible de Panamá Este.'
    },
    {
      icon: <FaEye className="text-4xl text-fair-secondary mb-4" />,
      titleKey: 'about.visionTitle',
      textKey: 'about.visionText',
      defaultTitle: 'Nuestra Visión',
      defaultText: 'Ser la feria internacional referente que posicione a Panamá Este como un hub de desarrollo económico, innovación y oportunidades, reconocido por su excelencia y contribución al progreso regional y nacional.'
    },
    {
      icon: <FaHeart className="text-4xl text-fair-secondary mb-4" />,
      titleKey: 'about.valuesTitle',
      textKey: 'about.valuesText',
      defaultTitle: 'Nuestros Valores',
      defaultText: 'Innovación, Colaboración, Sostenibilidad, Excelencia, Integridad, e Inclusión.'
    }
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
          {items.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="p-6"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-fair-primary mb-3">
                {t(item.titleKey, item.defaultTitle)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(item.textKey, item.defaultText)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;