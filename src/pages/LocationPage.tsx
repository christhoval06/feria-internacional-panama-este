// src/pages/LocationPage.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageBanner from '../components/common/PageBanner';
import MapEmbed from '../components/sections/Location/MapEmbed'; // Asumiendo que tienes este
import { FaCar, FaBus, FaParking, FaWheelchair, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// Placeholder para imagen de banner
import locationBannerImage from '../assets/images/highlights/ganaderia-highlight.jpg'; // Necesitarás esta imagen
// Coordenadas y URL de Google Maps (REEMPLAZAR CON LAS REALES)
const FAIR_LOCATION_GMAPS_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.717396950675!2d-79.37001808521885!3d9.070000093490488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMTEuMiJOIDc5wrAyMicwNC4xIlc!5e0!3m2!1ses!2spa!4v1610000000000!5m2!1ses!2spa"; // URL de Embed de Google Maps
const FAIR_ADDRESS_KEY = 'location.address';
const FAIR_ADDRESS_DEFAULT = 'Avenida Principal de la Feria, Corregimiento de Pacora, Panamá Este, República de Panamá';
const FAIR_GMAPS_DIRECTIONS_LINK = "https://goo.gl/maps/tuEnlaceDirectoADirecciones"; // Enlace directo para "Obtener Direcciones"

const LocationPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageBanner
        imageUrl={locationBannerImage}
        title={t('location.pageTitle', 'Encuéntranos')}
        subtitle={t('location.pageSubtitle', 'Te esperamos en el corazón de Panamá Este.')}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Sección del Mapa */}
        <section>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-fair-primary mb-6 text-center"
          >
            {t('location.mapTitle', 'Nuestra Ubicación en el Mapa')}
          </motion.h2>
          <MapEmbed mapEmbedUrl={FAIR_LOCATION_GMAPS_URL} />
          <div className="mt-6 text-center">
            <a
              href={FAIR_GMAPS_DIRECTIONS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-fair-secondary hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              <FaMapMarkerAlt className="mr-2" /> {t('location.getDirections', 'Obtener Direcciones')}
            </a>
          </div>
        </section>

        {/* Sección de Dirección */}
        <section className="text-center">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <FaMapMarkerAlt className="text-4xl text-fair-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-fair-primary mb-2">
              {t('location.addressTitle', 'Dirección del Recinto Ferial')}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto">
              {t(FAIR_ADDRESS_KEY, FAIR_ADDRESS_DEFAULT)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {t('location.referencePoints', 'Referencias: Cerca del Nuevo Intercambiador Vial, frente al Super X.')}
            </p>
          </motion.div>
        </section>

        {/* Sección Cómo Llegar */}
        <section>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay:0.1 }}
            className="text-2xl md:text-3xl font-bold text-fair-primary mb-8 text-center"
          >
            {t('location.howToGetThereTitle', 'Cómo Llegar a la Feria')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* En Vehículo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white rounded-lg shadow-lg"
            >
              <FaCar className="text-3xl text-fair-secondary mb-3" />
              <h3 className="text-xl font-semibold text-fair-primary mb-2">{t('location.byCarTitle', 'En Vehículo Particular')}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>{t('location.byCarDesc1', 'Desde el centro de la ciudad, tomar la Autopista Panamericana Este.')}</li>
                <li>{t('location.byCarDesc2', 'Utilizar la salida hacia Pacora/Chepo y seguir las señalizaciones hacia el recinto ferial.')}</li>
                <li>{t('location.byCarDesc3', 'Amplio estacionamiento disponible (ver detalles abajo).')}</li>
              </ul>
            </motion.div>

            {/* En Transporte Público */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white rounded-lg shadow-lg"
            >
              <FaBus className="text-3xl text-fair-secondary mb-3" />
              <h3 className="text-xl font-semibold text-fair-primary mb-2">{t('location.byPublicTransportTitle', 'En Transporte Público')}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>{t('location.byPublicTransportDesc1', 'Rutas de MiBus con destino Pacora (ej. S420, E428) te dejarán cerca.')}</li>
                <li>{t('location.byPublicTransportDesc2', 'Verifica las paradas más cercanas en la app de MiBus o Google Maps.')}</li>
                <li>{t('location.byPublicTransportDesc3', 'Desde la estación de Metro de Nuevo Tocumen, puedes tomar un taxi o bus complementario.')}</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Sección Estacionamiento y Accesibilidad */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-gray-50 rounded-lg shadow"
            >
              <FaParking className="text-3xl text-fair-primary mb-3" />
              <h3 className="text-xl font-semibold text-fair-primary mb-2">{t('location.parkingTitle', 'Estacionamiento')}</h3>
              <p className="text-gray-700 text-sm">
                {t('location.parkingDesc', 'Contamos con amplias zonas de estacionamiento gratuito para visitantes dentro del recinto ferial. Siga las indicaciones del personal al llegar.')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 bg-gray-50 rounded-lg shadow"
            >
              <FaWheelchair className="text-3xl text-fair-primary mb-3" />
              <h3 className="text-xl font-semibold text-fair-primary mb-2">{t('location.accessibilityTitle', 'Accesibilidad')}</h3>
              <p className="text-gray-700 text-sm">
                {t('location.accessibilityDesc', 'El recinto ferial está equipado con rampas y accesos para personas con movilidad reducida. Contamos con baños accesibles. Por favor, contacte a nuestro personal si requiere asistencia especial.')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Horarios (Opcional, pero útil aquí) */}
        <section className="text-center">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaClock className="text-4xl text-fair-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-fair-primary mb-2">
              {t('location.fairHoursTitle', 'Horarios de la Feria')}
            </h3>
            <p className="text-gray-700">
              {t('location.fairHoursText', 'Del 13 al 17 de Agosto, 2025')} <br/>
              {t('location.fairHoursTime', 'De 9:00 AM a 8:00 PM todos los días.')}
            </p>
           </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default LocationPage;