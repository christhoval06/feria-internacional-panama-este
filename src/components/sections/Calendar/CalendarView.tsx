import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import EventItem from './EventItem'; 
import type { ScheduleItem } from '../../../data/masterScheduleData';

interface CalendarViewProps {
  events: ScheduleItem[];
  selectedCategory: string; // 'all' o una clave de categoría específica
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, selectedCategory }) => {
  const { t, i18n } = useTranslation();

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') {
      return events;
    }
    return events.filter(event => event.categoryKey === selectedCategory);
  }, [events, selectedCategory]);

  // Agrupar eventos por fecha
  const eventsByDate = useMemo(() => {
    return filteredEvents.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      // Ordenar eventos dentro de cada fecha por hora de inicio
      acc[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
      return acc;
    }, {} as Record<string, ScheduleItem[]>);
  }, [filteredEvents]);

  const sortedDates = useMemo(() => Object.keys(eventsByDate).sort(), [eventsByDate]);

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString(i18n.language, {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
    });
  };

  if (sortedDates.length === 0 && filteredEvents.length === 0 && selectedCategory !== 'all') {
    return <p className="text-center text-gray-600 text-lg mt-10">{t('calendar.noEvents')}</p>;
  }
  if (sortedDates.length === 0 && events.length === 0) { // Si no hay eventos en absoluto
    return <p className="text-center text-gray-600 text-lg mt-10">{t('calendar.noEventsGeneral', 'No hay eventos programados por el momento.')}</p>;
     // Añadir 'calendar.noEventsGeneral' a tus traducciones
  }


  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date} className="mb-10">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }} // Ajusta animación si es necesario
            className="text-2xl font-semibold text-fair-primary mb-4 pb-2 border-b-2 border-fair-secondary/30"
          >
            {formatDateHeader(date)}
          </motion.h2>
          <div className="space-y-6">
            {eventsByDate[date].map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;