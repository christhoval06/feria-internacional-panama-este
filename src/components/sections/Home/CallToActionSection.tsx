import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const CallToActionSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí integrarías la lógica para enviar el email a tu servicio de newsletter
    // (Mailchimp, Sendgrid, backend propio, etc.)
    console.log('Email para suscribir:', email);
    alert(`Gracias por suscribirte con ${email}! (Funcionalidad de ejemplo)`);
    setEmail('');
  };

  return (
    <section className="py-12 md:py-16 bg-fair-primary text-black/80">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <FaEnvelope className="text-5xl text-fair-secondary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('home.ctaSecondaryTitle')}
          </h2>
          <p className="text-md md:text-lg mb-8 max-w-xl mx-auto text-white/90">
            {t('home.ctaSecondaryText')}
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.emailPlaceholder')}
              required
              className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:ring-2 focus:ring-fair-secondary focus:outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-fair-secondary hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
            >
              {t('home.subscribeButton')}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;