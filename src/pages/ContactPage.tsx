// src/pages/ContactPage.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageBanner from '../components/common/PageBanner';
import ContactForm from '../components/sections/Contact/ContactForm';
import ContactChannels from '../components/sections/Contact/ContactChannels';

// Placeholder para imagen de banner
import contactBannerImage from '../assets/images/highlights/empresarial-highlight.jpg'; // Necesitarás esta imagen

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageBanner
        imageUrl={contactBannerImage}
        title={t('contact.pageTitle', 'Ponte en Contacto')}
        subtitle={t('contact.pageSubtitle', 'Estamos listos para responder tus preguntas y escuchar tus ideas.')}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-lg text-gray-700 mb-10 md:mb-12 max-w-2xl mx-auto"
        >
          {t('contact.introText', '¿Tienes alguna pregunta sobre la feria, quieres participar como expositor, patrocinador o simplemente quieres saber más? Completa el formulario o utiliza nuestros otros canales de contacto. ¡Nos encantaría saber de ti!')}
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          {/* Columna del Formulario (ocupa más espacio) */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-fair-primary mb-6"
            >
              {t('contact.formTitle', 'Envíanos un Mensaje')}
            </motion.h2>
            <ContactForm />
          </div>

          {/* Columna de Otros Canales (ocupa menos espacio) */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-fair-primary mb-6"
            >
              {t('contact.channelsTitle', 'Otros Canales')}
            </motion.h2>
            <ContactChannels />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;