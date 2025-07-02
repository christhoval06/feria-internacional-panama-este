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
    const formattedTime = date.toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  const mainDateDisplay =
    activity.multiDayDates && activity.multiDayDates.length > 0
      ? `${t('activities.multipleDates', 'Varias Fechas')}` // Añadir clave a traducciones
      : formatDisplayDate(activity.date, activity.startTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg" // h-full para igualar alturas si están en grid
    >
      <img
        src={activity.imageUrl || 'https://via.placeholder.com/400x250/CCCCCC/FFFFFF?Text=Actividad'}
        alt={t(activity.titleKey)}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-grow flex-col p-5">
        {activity.categoryKey && (
          <span className="bg-fair-accent/10 text-fair-accent mb-2 inline-block self-start rounded-full px-2 py-0.5 text-xs font-semibold">
            {t(activity.categoryKey, activity.categoryKey.split('.').pop() ?? '')}
          </span>
        )}
        <h3 className="text-fair-primary mb-2 text-xl font-semibold">{t(activity.titleKey)}</h3>
        <p className="mb-3 flex-grow text-sm text-gray-600">{t(activity.shortDescriptionKey)}</p>

        <div className="mt-auto space-y-1 border-t border-gray-200 pt-3 text-xs text-gray-500">
          <div className="flex items-center">
            <FaCalendarAlt className="text-fair-secondary mr-2" />
            <span>{mainDateDisplay}</span>
          </div>
          {activity.locationKey && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-fair-secondary mr-2" />
              <span>{t(activity.locationKey)}</span>
            </div>
          )}
          {activity.typeKey && (
            <div className="flex items-center">
              <FaClock className="text-fair-secondary mr-2" /> {/* Usando FaClock como tipo genérico */}
              <span>
                {t('activities.typeLabel', 'Tipo:')} {t(activity.typeKey)}
              </span>
            </div>
          )}
          {activity.targetAudienceKey && (
            <div className="flex items-center">
              <FaUsers className="text-fair-secondary mr-2" />
              <span>
                {t('activities.audienceLabel', 'Público:')} {t(activity.targetAudienceKey)}
              </span>
            </div>
          )}
        </div>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(activity)}
            className="bg-fair-primary/80 hover:bg-fair-primary mt-4 flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            <FaInfoCircle className="mr-2" /> {t('activities.viewDetails', 'Más Detalles')}
          </button>
        )}
        {activity.requiresRegistration && activity.registrationLink && (
          <a
            href={activity.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex w-full items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
          >
            <FaExternalLinkAlt className="mr-2" /> {t('activities.registerNow', 'Inscríbete Aquí')}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityCard;
