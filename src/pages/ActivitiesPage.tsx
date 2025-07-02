// src/pages/ActivitiesPage.tsx
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageBanner from '../components/common/PageBanner';
import ActivityFilters, { type FilterValues } from '../components/sections/Activities/ActivityFilters';
import ActivityGrid from '../components/sections/Activities/ActivityGrid';
import Modal from '../components/common/Modal'; // CAMBIO: Importar Modal
import ActivityModalContent from '../components/sections/Activities/ActivityModalContent';

// Placeholder para imagen de banner
import activitiesBannerImage from '../assets/images/highlights/emprendimiento-highlight.jpg'; // Necesitarás esta imagen
import { scheduleData, type ScheduleItem } from '../data/masterScheduleData';
import i18n from '../i18n';
import { Link } from 'react-router-dom';

const ActivitiesPage = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState<FilterValues>({
        category: 'all',
        day: 'all',
        type: 'all',
        audience: 'all',
    });
    const [selectedActivity, setSelectedActivity] = useState<ScheduleItem | null>(null);

    const filteredActivities = useMemo(() => {
        return scheduleData.filter(activity => { // CAMBIO: Usar scheduleData
            const categoryMatch = filters.category === 'all' || activity.categoryKey === filters.category;
            const dayMatch = filters.day === 'all' || (activity.multiDayDates && activity.multiDayDates.length > 0 ? activity.multiDayDates.some(d => d.date === filters.day) : activity.date === filters.day);
            const typeMatch = !filters.type || filters.type === 'all' || activity.typeKey === filters.type;
            const audienceMatch = !filters.audience || filters.audience === 'all' || activity.targetAudienceKey === filters.audience;
            return categoryMatch && dayMatch && typeMatch && audienceMatch;
        });
    }, [filters, scheduleData]);
    const handleViewDetails = (activity: ScheduleItem) => {
        setSelectedActivity(activity);
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
    };

    const currentLang = i18n.language.split('-')[0];
    const calendarPathKey = t('routes.calendar', { lng: currentLang });
    const fullCalendarPath = `/${currentLang}${calendarPathKey.startsWith('/') ? calendarPathKey : '/' + calendarPathKey}`.replace(/\/\//g, '/');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <PageBanner
                imageUrl={activitiesBannerImage}
                title={t('activities.pageTitle', 'Explora Nuestras Actividades')}
                subtitle={t('activities.pageSubtitle', 'Sumérgete en un mundo de conocimiento, innovación y entretenimiento.')}
            />

            <div className="container mx-auto px-4 py-8 md:py-12">
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-center text-lg text-gray-700 mb-8 md:mb-10 max-w-2xl mx-auto"
                >
                    {t('activities.introText', 'Desde conferencias magistrales hasta demostraciones interactivas y espectáculos culturales, la Primera Feria Internacional de Panamá Este ofrece algo para todos. ¡Usa los filtros para encontrar las actividades que más te interesan!')}
                </motion.p>

                <ActivityFilters currentFilters={filters} onFilterChange={setFilters} allActivities={scheduleData} />

                {filteredActivities.length > 0 ? (
                    <ActivityGrid
                        activities={filteredActivities}
                        onViewDetails={handleViewDetails}
                    />
                ) : (
                    <p className="text-center text-gray-600 text-xl mt-10">
                        {t('activities.noResults', 'No se encontraron actividades que coincidan con tus filtros.')}
                    </p>
                )}

                {selectedActivity && (
                    <Modal
                        isOpen={!!selectedActivity}
                        onClose={handleCloseModal}
                        title={t(selectedActivity.titleKey)} // El título del modal será el título de la actividad
                        size="xl" // Puedes ajustar el tamaño
                    >
                        <ActivityModalContent activity={selectedActivity} />
                    </Modal>
                )}
                <div className="text-center mt-12">

                    <Link
                        to={fullCalendarPath} // Usar la ruta construida
                        className="bg-fair-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg inline-block transition duration-300 transform hover:scale-105"
                    >
                        {t('activities.viewFullCalendar', 'Ver Agenda Completa')}
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { /* Navegar a la página de calendario */
                            const { i18n, navigate } = (window as any).globalNavigateAndI18n; // Solución temporal para acceder a navigate
                            if (navigate && i18n) {
                                const calendarPath = i18n.t('routes.calendar', { lng: i18n.language });
                                navigate(`/${i18n.language.split('-')[0]}${calendarPath}`);
                            }
                        }}
                        className="bg-fair-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg"
                    >
                        {t('activities.viewFullCalendar', 'Ver Agenda Completa')}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
// Solución temporal para acceder a navigate e i18n si no están disponibles por contexto directo en un botón
// En un proyecto real, esto se manejaría mejor con un hook o pasando navigate como prop.
// O usando Link de react-router-dom
// import { Link, useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// const { i18n } = useTranslation();
// const calendarPath = t('routes.calendar');
// const lang = i18n.language.split('-')[0];
// <Link to={`/${lang}${calendarPath}`} className="...">

export default ActivitiesPage;