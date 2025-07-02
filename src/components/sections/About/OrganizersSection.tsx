// src/components/sections/About/OrganizersSection.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Asume que tienes logos en src/assets/images/organizations/ o usa placeholders
// import orgLogo1 from '../../../assets/images/organizations/org1.png';
// import orgLogo2 from '../../../assets/images/organizations/org2.png';

interface Organizer {
  id: string;
  nameKey: string; // Clave para el nombre de la organización
  defaultName: string;
  logoUrl: string;
  descriptionKey?: string; // Clave para una breve descripción (opcional)
  defaultDescription?: string;
  websiteUrl?: string;
}

// DATOS DE EJEMPLO - REEMPLAZA CON LOS REALES
const organizersData: Organizer[] = [
  {
    id: 'org1',
    nameKey: 'about.organizers.org1Name',
    defaultName: 'Cámara de Comercio de Panamá Este',
    logoUrl: 'https://via.placeholder.com/150x80/CBD5E1/475569?Text=Cámara+Comercio',
    descriptionKey: 'about.organizers.org1Desc',
    defaultDescription: 'Promoviendo el desarrollo empresarial y comercial en la región.',
    websiteUrl: '#',
  },
  {
    id: 'org2',
    nameKey: 'about.organizers.org2Name',
    defaultName: 'Asociación de Agricultores Unidos',
    logoUrl: 'https://via.placeholder.com/150x80/CBD5E1/475569?Text=Agro+Unidos',
    descriptionKey: 'about.organizers.org2Desc',
    defaultDescription: 'Apoyando a los productores locales con recursos y representación.',
    websiteUrl: '#',
  },
  {
    id: 'org3',
    nameKey: 'about.organizers.org3Name',
    defaultName: 'Gobierno Local de [Municipio/Provincia]',
    logoUrl: 'https://via.placeholder.com/150x80/CBD5E1/475569?Text=Gobierno+Local',
    descriptionKey: 'about.organizers.org3Desc',
    defaultDescription: 'Comprometidos con el progreso y bienestar de Panamá Este.',
    websiteUrl: '#',
  },
  // ... más organizadores
];

const OrganizersSection = () => {
  const { t } = useTranslation();

  if (organizersData.length === 0) return null; // No renderizar si no hay datos

  return (
    <section className="bg-fair-light py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-fair-primary">
            {t('about.organizersSectionTitle', 'Conoce a los Impulsores')}
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.organizersSectionIntro', 'Esta feria es posible gracias a la dedicación y colaboración de las siguientes entidades:')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizersData.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <a href={org.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="mb-4">
                <img
                  src={org.logoUrl}
                  alt={t(org.nameKey, org.defaultName)}
                  className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </a>
              <h3 className="text-xl font-semibold text-fair-primary mb-1">
                {t(org.nameKey, org.defaultName)}
              </h3>
              {org.descriptionKey && (
                <p className="text-sm text-gray-600">
                  {t(org.descriptionKey, org.defaultDescription)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;