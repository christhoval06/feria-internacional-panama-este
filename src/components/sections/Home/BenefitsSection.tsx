import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaUsers, FaFlask, FaChartLine, FaChalkboardTeacher } from 'react-icons/fa'; // Example icons

interface Benefit {
    id: string;
    icon: React.ReactElement;
    titleKey: string;
    descriptionKey: string;
}

const benefitsData: Benefit[] = [
    { id: 'networking', icon: <FaUsers size={40} className="text-fair-secondary" />, titleKey: 'home.benefit1_title', descriptionKey: 'home.benefit1_desc' },
    { id: 'innovation', icon: <FaFlask size={40} className="text-fair-secondary" />, titleKey: 'home.benefit2_title', descriptionKey: 'home.benefit2_desc' },
    { id: 'business', icon: <FaChartLine size={40} className="text-fair-secondary" />, titleKey: 'home.benefit3_title', descriptionKey: 'home.benefit3_desc' },
    { id: 'knowledge', icon: <FaChalkboardTeacher size={40} className="text-fair-secondary" />, titleKey: 'home.benefit4_title', descriptionKey: 'home.benefit4_desc' },
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.15, duration: 0.4 },
    }),
};

const BenefitsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center text-fair-primary mb-10 md:mb-12"
                >
                    {t('home.benefitsTitle')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {benefitsData.map((benefit, index) => (
                        <motion.div
                            key={benefit.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="p-6 text-center bg-fair-light rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-fair-primary mb-2">{t(benefit.titleKey)}</h3>
                            <p className="text-sm text-gray-700">{t(benefit.descriptionKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;