// src/components/sections/Activities/ActivityModalContent.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ScheduleItem } from '../../../data/masterScheduleData';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaTags, FaUserTie, FaExternalLinkAlt } from 'react-icons/fa';

interface ActivityModalContentProps {
  activity: ScheduleItem;
}

const ActivityModalContent: React.FC<ActivityModalContentProps> = ({ activity }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setUTCHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });
  };

  return (
    <div className="space-y-4 text-sm md:text-base">
      {activity.imageUrl && (
        <img
          src={activity.imageUrl}
          alt={t(activity.titleKey)}
          className="w-full max-h-60 object-cover rounded-lg mb-4 shadow"
        />
      )}

      <p className="text-gray-700 leading-relaxed">
        {t(activity.longDescriptionKey || activity.shortDescriptionKey)}
      </p>

      <div className="pt-3 space-y-3">
        {/* Fechas y Horas */}
        {(activity.multiDayDates && activity.multiDayDates.length > 0) ? (
          activity.multiDayDates.map((occurrence, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <FaCalendarAlt className="mr-3 text-fair-secondary flex-shrink-0" />
              <span>{formatDate(occurrence.date)}: {formatTime(occurrence.startTime)} {occurrence.endTime ? `- ${formatTime(occurrence.endTime)}` : ''}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-3 text-fair-secondary flex-shrink-0" />
            <span>{formatDate(activity.date)}</span>
          </div>
        )}
         {!(activity.multiDayDates && activity.multiDayDates.length > 0) && (
            <div className="flex items-center text-gray-600">
                <FaClock className="mr-3 text-fair-secondary flex-shrink-0" />
                <span>{formatTime(activity.startTime)} {activity.endTime ? `- ${formatTime(activity.endTime)}` : (activity.duration ? `(${t('calendar.duration')}: ${activity.duration.hours || 0}h ${activity.duration.minutes || 0}m)` : '')}</span>
            </div>
         )}


        {/* Ubicación */}
        {activity.locationKey && (
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-3 text-fair-secondary flex-shrink-0" />
            <span>{t('calendar.location')}: {t(activity.locationKey)}</span>
          </div>
        )}

        {/* Categoría */}
        {activity.categoryKey && (
          <div className="flex items-center text-gray-600">
            <FaTags className="mr-3 text-fair-secondary flex-shrink-0" />
            <span>{t('activities.filterByCategory', 'Categoría:')} {t(activity.categoryKey)}</span>
          </div>
        )}

        {/* Tipo de Actividad */}
        {activity.typeKey && (
          <div className="flex items-center text-gray-600">
            <FaTags className="mr-3 text-fair-secondary flex-shrink-0" /> {/* Podrías usar otro icono */}
            <span>{t('activities.filterByType', 'Tipo:')} {t(activity.typeKey)}</span>
          </div>
        )}

        {/* Ponentes */}
        {activity.speakerKeys && activity.speakerKeys.length > 0 && (
          <div className="flex items-start text-gray-600"> {/* items-start para multilínea */}
            <FaUserTie className="mr-3 text-fair-secondary flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold">{t('activities.speakersLabel', 'Ponentes:')}</span>
              <ul className="list-disc list-inside ml-1">
                {activity.speakerKeys.map(speakerKey => (
                  <li key={speakerKey}>{t(speakerKey)}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Público Objetivo */}
        {activity.targetAudienceKey && (
          <div className="flex items-center text-gray-600">
            <FaUsers className="mr-3 text-fair-secondary flex-shrink-0" />
            <span>{t('activities.audienceLabel', 'Público:')} {t(activity.targetAudienceKey)}</span>
          </div>
        )}

        {/* Registro */}
        {activity.requiresRegistration && (
          <div className="mt-5">
            {activity.registrationLink ? (
              <a
                href={activity.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
              >
                <FaExternalLinkAlt className="mr-2" /> {t('activities.registerNow', 'Inscríbete Aquí')}
              </a>
            ) : (
              <p className="text-green-600 font-semibold">{t('activities.registrationRequired', 'Requiere Inscripción Previa')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityModalContent;