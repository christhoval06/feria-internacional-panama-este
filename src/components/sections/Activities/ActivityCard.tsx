// src/components/sections/Activities/ActivityCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaUsers, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import type { ScheduleItem } from '../../../data/masterScheduleData';

interface ActivityCardProps {
  activity: ScheduleItem;
  onViewDetails?: (activity: ScheduleItem) => void; // Para abrir un modal, por ejemplo
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onViewDetails }) => {
  const { t, i18n } = useTranslation();

  const formatDisplayDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr + 'T' + timeStr + 'Z'); // Asumir UTC para consistencia
    const formattedDate = date.toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', timeZone: 'UTC' });
    const formattedTime = date.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });
    return `${formattedDate}, ${formattedTime}`;
  };

  const mainDateDisplay = activity.multiDayDates && activity.multiDayDates.length > 0
    ? `${t('activities.multipleDates', 'Varias Fechas')}` // Añadir clave a traducciones
    : formatDisplayDate(activity.date, activity.startTime);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full" // h-full para igualar alturas si están en grid
    >
      <img
        src={activity.imageUrl || 'https://via.placeholder.com/400x250/CCCCCC/FFFFFF?Text=Actividad'}
        alt={t(activity.titleKey)}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        {activity.categoryKey && (
          <span className="inline-block bg-fair-accent/10 text-fair-accent text-xs font-semibold px-2 py-0.5 rounded-full mb-2 self-start">
            {t(activity.categoryKey, activity.categoryKey.split('.').pop())}
          </span>
        )}
        <h3 className="text-xl font-semibold text-fair-primary mb-2">
          {t(activity.titleKey)}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex-grow">
          {t(activity.shortDescriptionKey)}
        </p>

        <div className="text-xs text-gray-500 space-y-1 mt-auto pt-3 border-t border-gray-200">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-fair-secondary" />
            <span>{mainDateDisplay}</span>
          </div>
          {activity.locationKey && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-fair-secondary" />
              <span>{t(activity.locationKey)}</span>
            </div>
          )}
           {activity.typeKey && (
            <div className="flex items-center">
              <FaClock className="mr-2 text-fair-secondary" /> {/* Usando FaClock como tipo genérico */}
              <span>{t('activities.typeLabel', 'Tipo:')} {t(activity.typeKey)}</span>
            </div>
          )}
          {activity.targetAudienceKey && (
             <div className="flex items-center">
              <FaUsers className="mr-2 text-fair-secondary" />
              <span>{t('activities.audienceLabel', 'Público:')} {t(activity.targetAudienceKey)}</span>
            </div>
          )}
        </div>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(activity)}
            className="mt-4 w-full bg-fair-primary/80 hover:bg-fair-primary text-white text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            <FaInfoCircle className="mr-2" /> {t('activities.viewDetails', 'Más Detalles')}
          </button>
        )}
        {activity.requiresRegistration && activity.registrationLink && (
           <a
            href={activity.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            <FaExternalLinkAlt className="mr-2" /> {t('activities.registerNow', 'Inscríbete Aquí')}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityCard;