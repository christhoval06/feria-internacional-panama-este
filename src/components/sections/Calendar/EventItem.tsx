// src/components/sections/Calendar/EventItem.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaMapMarkerAlt, FaClock, FaTags } from 'react-icons/fa';
import type { ScheduleItem } from '../../../data/masterScheduleData';
 // Ajusta la ruta si es necesario
import { generateICSFile, downloadICS, type MyEvent } from '../../../utils/calendarUtils'; // Asumiendo que ya lo tienes

interface EventItemProps {
  event: ScheduleItem;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { t, i18n } = useTranslation();

  const handleDownloadICS = async () => {
    const [year, month, day] = event.date.split('-').map(Number);
    const [hours, minutes] = event.startTime.split(':').map(Number);

    const startDate = new Date(year, month - 1, day, hours, minutes);

    const icsEvent = {
      title: t(event.titleKey),
      description: t(event.shortDescriptionKey),
      start: startDate,
      duration: event.duration,
      location: event.locationKey ? t(event.locationKey) : undefined,
      // url: 'https://tuferia.com/calendario', // Opcional: URL del evento en tu web
    } satisfies MyEvent;

    try {
      const icsString = await generateICSFile(icsEvent);
      downloadICS(icsString, `${t(event.titleKey).replace(/\s+/g, '_')}.ics`);
    } catch (error) {
      console.error("Error al generar ICS:", error);
      alert("Hubo un error al generar el archivo del calendario.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00Z'); // Usar Z para UTC y evitar problemas de zona horaria al parsear
    return date.toLocaleDateString(i18n.language, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' // Mostrar en UTC para consistencia
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date(); // Temporal para formatear
    date.setUTCHours(parseInt(hours), parseInt(minutes)); // Asumir que startTime es UTC
    return date.toLocaleTimeString(i18n.language, {
      hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' // Mostrar en UTC
    });
  };

  const formatDuration = () => {
    if (!event.duration) return null;
    const parts = [];
    if (event.duration.hours) parts.push(`${event.duration.hours} ${t('calendar.hours', { count: event.duration.hours })}`);
    if (event.duration.minutes) parts.push(`${event.duration.minutes} ${t('calendar.minutes', { count: event.duration.minutes })}`);
    return parts.join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg mb-6 border-l-4 border-fair-secondary"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-start">
        <div className="flex-grow mb-4 md:mb-0 md:mr-6">
          <h3 className="text-xl md:text-2xl font-semibold text-fair-primary mb-1">{t(event.titleKey)}</h3>
          {event.categoryKey && (
            <span className="inline-block bg-fair-accent/10 text-fair-accent text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
              <FaTags className="inline mr-1 mb-0.5" />{t(event.categoryKey)}
            </span>
          )}
          <p className="text-gray-700 text-sm leading-relaxed">{t(event.shortDescriptionKey)}</p> {/* CAMBIO: Usar shortDescriptionKey */}
        </div>
        <button
          onClick={handleDownloadICS}
          className="flex-shrink-0 bg-fair-secondary hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md text-sm flex items-center justify-center transition-colors duration-300 whitespace-nowrap"
          title={t('calendar.downloadICS')}
        >
          <FaCalendarPlus className="mr-2" /> {t('calendar.downloadICS')}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-2">
        <div className="flex items-center">
          <FaClock className="mr-2 text-fair-primary" />
          <span>
            {formatDate(event.date)} - {formatTime(event.startTime)}
            {event.duration && ` (${t('calendar.duration')}: ${formatDuration()})`}
          </span>
        </div>
        {event.locationKey && (
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-fair-primary" />
            <span>{t('calendar.location')}: {t(event.locationKey)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventItem;