// src/pages/AboutPage.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Importa los componentes de sección que decidas crear
import PageBanner from '../components/common/PageBanner';
import MissionVisionValues from '../components/sections/About/MissionVisionValues';
import ImpactSection from '../components/sections/About/ImpactSection';
import OrganizersSection from '../components/sections/About/OrganizersSection';

// Placeholder para imagen de banner (reemplazar con una real)
import aboutBannerImage from '../assets/images/highlights/agro-highlight.jpg'; // Necesitarás esta imagen

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 md:space-y-16 lg:space-y-20" // Espaciado entre secciones
        >

            {/* Sección 1: Banner o Encabezado Inspirador */}
            <PageBanner
                imageUrl={aboutBannerImage}
                title={t('about.pageTitle', 'Conoce Nuestra Feria')}
                subtitle={t('about.pageSubtitle', 'Impulsando el futuro agropecuario, ganadero, empresarial y de emprendimientos en Panamá Este.')}
            />

            {/* Sección 2: Nuestra Historia / El Porqué de la Feria */}
            <section className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-fair-primary mb-4">
                        {t('about.storyTitle', 'Nuestra Motivación: Un Evento Pionero')}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t('about.storyTextP1', 'La Primera Feria Internacional de Panamá Este nace de la visión de crear un espacio único de convergencia para los pilares económicos y de desarrollo de nuestra vibrante región. Identificamos la necesidad de una plataforma que no solo celebre nuestros logros en los sectores agropecuario y ganadero, sino que también impulse la innovación empresarial y fomente el espíritu emprendedor que caracteriza a Panamá Este.')}
                    </p>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        {t('about.storyTextP2', 'Creemos firmemente en el potencial de nuestra gente y nuestra tierra. Esta feria es una invitación a soñar en grande, a conectar, a aprender y a construir juntos un futuro más próspero y sostenible para todos.')}
                    </p>
                </motion.div>
            </section>

            {/* Sección 3: Misión, Visión y Valores */}
            <MissionVisionValues />

            {/* Sección 4: Impacto en Panamá Este y los Sectores */}
            <ImpactSection />

            {/* Sección 5: Los Organizadores / Nuestro Equipo (Opcional) */}
            <OrganizersSection />
            {/* Ejemplo simple si no hay componente OrganizersSection: */}
            <section className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-fair-primary mb-6">
                    {t('about.organizersTitle', 'Impulsado Por')}
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                    {t('about.organizersText', 'Esta feria es posible gracias al esfuerzo conjunto de [Menciona aquí instituciones clave, cámaras de comercio, asociaciones, gobierno local, etc.] y un dedicado equipo de profesionales comprometidos con el desarrollo de Panamá Este.')}
                </p>
                {/* Aquí podrías poner logos de instituciones organizadoras si los tienes */}
            </section>

            {/* Sección 6: ¿Qué Esperar en la Feria? */}
            <section className="bg-fair-light py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-fair-primary mb-6">
                        {t('about.whatToExpectTitle', '¿Qué Podrás Encontrar?')}
                    </h2>
                    <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        {t('about.whatToExpectText', 'Prepárate para una experiencia inmersiva con exposiciones de vanguardia, conferencias magistrales de líderes de opinión, talleres prácticos, demostraciones en vivo de nuevas tecnologías, vibrantes rondas de negocios, una zona dedicada al emprendimiento innovador, y una rica oferta cultural y gastronómica que celebra lo mejor de Panamá Este.')}
                    </p>
                </div>
            </section>

            {/* Sección 7: Llamada a la Acción */}
            <section className="container mx-auto px-4 text-center py-10">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {/* Redirigir a página de contacto o registro de expositores */ }}
                    className="bg-fair-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
                >
                    {t('about.ctaButton', '¡Únete a Nosotros!')}
                </motion.button>
            </section>

        </motion.div>
    );
};

export default AboutPage;