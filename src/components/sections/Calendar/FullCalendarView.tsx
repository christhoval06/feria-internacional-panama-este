// src/components/sections/Calendar/FullCalendarView.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // Necesario para dateClick, eventClick, etc.
import { useTranslation } from 'react-i18next';
import type { ScheduleItem } from '../../../data/masterScheduleData';

interface FullCalendarViewProps {
    events: ScheduleItem[];
    initialDate: string; // YYYY-MM-DD para el inicio de la feria
    validRange: { start: string; end: string }; // YYYY-MM-DD
}

// Define tu paleta de colores para las categorías.
// Puedes usar nombres de colores de Tailwind, códigos HEX, RGB, etc.
// Es importante que estos colores tengan buen contraste con el texto del evento (generalmente blanco o negro).
const categoryColorMap: Record<string, string> = {
    'calendar.categories.opening': '#FFD700',   // Gold
    'calendar.categories.agro': '#4CAF50',      // Green
    'calendar.categories.livestock': '#FF9800', // Orange
    'calendar.categories.business': '#2196F3',  // Blue
    'calendar.categories.entrepreneurship': '#9C27B0', // Purple
    'calendar.categories.conference': '#00BCD4', // Cyan
    'calendar.categories.workshop': '#795548',   // Brown
    'calendar.categories.exhibition': '#607D8B', // Blue Grey
    'calendar.categories.networking': '#03A9F4', // Light Blue
    'calendar.categories.entertainment': '#E91E63', // Pink
    'calendar.categories.kids': '#FFEB3B',      // Yellow
    'calendar.categories.food': '#CDDC39',      // Lime
    'calendar.categories.sustainability': '#009688', // Teal
    'calendar.categories.innovation': '#673AB7', // Deep Purple
    'calendar.categories.technology': '#3F51B5', // Indigo
    'calendar.categories.closing': '#F44336',    // Red
    'calendar.categories.cultural': '#FF5722',   // Deep Orange
    'calendar.categories.family': '#8BC34A',    // Light Green
    // Añade un color por defecto si una categoría no está mapeada
    'default': '#546E7A' // Slate Grey
};

const FullCalendarView: React.FC<FullCalendarViewProps> = ({ events, initialDate, validRange }) => {
    const { t, i18n } = useTranslation();

    const getCategoryColor = (categoryKey?: string): string => {
        if (categoryKey && categoryColorMap[categoryKey]) {
            return categoryColorMap[categoryKey];
        }
        return categoryColorMap['default']; // Color por defecto
    };

    const calendarEvents = events.flatMap(event => { // Usamos flatMap para manejar multiDayDates
        const baseEventProps = {
            id: event.id,
            title: t(event.titleKey),
            allDay: false, // Asumimos que todos tienen hora; podrías cambiar esto
            extendedProps: {
                description: t(event.shortDescriptionKey), // Usar shortDescription para el pop-up del calendario
                longDescription: event.longDescriptionKey ? t(event.longDescriptionKey) : t(event.shortDescriptionKey),
                location: event.locationKey ? t(event.locationKey) : '',
                category: event.categoryKey ? t(event.categoryKey) : '',
                speakers: event.speakerKeys?.map(sk => t(sk)).join(', '),
                imageUrl: event.imageUrl,
                // ... cualquier otro dato de ScheduleItem que quieras accesible
            },
            backgroundColor: getCategoryColor(event.categoryKey),
            borderColor: getCategoryColor(event.categoryKey),
        };

        if (event.multiDayDates && event.multiDayDates.length > 0) {
            return event.multiDayDates.map(occurrence => {
                const [year, month, day] = occurrence.date.split('-').map(Number);
                const [sHours, sMinutes] = occurrence.startTime.split(':').map(Number);
                const startDate = new Date(year, month - 1, day, sHours, sMinutes);
                let endDate = startDate;
                if (occurrence.endTime) {
                    const [eHours, eMinutes] = occurrence.endTime.split(':').map(Number);
                    endDate = new Date(year, month - 1, day, eHours, eMinutes);
                } else if (event.duration) { // Usar duration global si no hay endTime específico por ocurrencia
                    endDate = new Date(startDate.getTime() + (event.duration.hours || 0) * 3600000 + (event.duration.minutes || 0) * 60000);
                }
                return { ...baseEventProps, start: startDate, end: endDate, id: `${event.id}-${occurrence.date}` };
            });
        } else {
            // Evento de un solo día
            const [year, month, day] = event.date.split('-').map(Number);
            const [hours, minutes] = event.startTime.split(':').map(Number);
            const startDate = new Date(year, month - 1, day, hours, minutes);
            let endDate = startDate;

            if (event.duration) {
                endDate = new Date(startDate.getTime() + (event.duration.hours || 0) * 3600000 + (event.duration.minutes || 0) * 60000);
            } else if (event.endTime) {
                const [endHours, endMinutes] = event.endTime.split(':').map(Number);
                endDate = new Date(year, month - 1, day, endHours, endMinutes);
            }
            return [{ ...baseEventProps, start: startDate, end: endDate }];
        }
    });

    return (
        <div className="fullcalendar-container p-0 md:p-4 bg-white rounded-lg shadow-md">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth" // Vista inicial
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' // Vistas disponibles
                }}
                events={calendarEvents}
                editable={false} // No permitir arrastrar ni redimensionar
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true} // Limita el número de eventos por día antes de mostrar "+ more"
                weekends={true}
                initialDate={initialDate} // Fecha en la que se abrirá el calendario
                validRange={validRange} // Restringe la navegación a los días de la feria
                locale={i18n.language.split('-')[0]} // 'es', 'en', etc.
                height="auto" // O un valor fijo como "600px"
                contentHeight="auto"
                eventClick={(clickInfo) => { // Ejemplo de eventClick para mostrar más detalles
                    // Aquí podrías abrir un modal con clickInfo.event.extendedProps
                    alert(
                        `Evento: ${clickInfo.event.title}\n` +
                        `Categoría: ${clickInfo.event.extendedProps.category}\n` +
                        `Lugar: ${clickInfo.event.extendedProps.location}\n` +
                        `Descripción: ${clickInfo.event.extendedProps.description}`
                    );
                }}
                // dateClick={(arg) => {
                //   console.log('Date clicked:', arg.dateStr);
                // }}
                buttonText={{
                    today: t('calendar.fc.today', 'hoy'),
                    month: t('calendar.fc.month', 'mes'),
                    week: t('calendar.fc.week', 'semana'),
                    day: t('calendar.fc.day', 'día'),
                    list: t('calendar.fc.list', 'agenda')
                }}
                allDayText={t('calendar.fc.allDay', 'todo el día')}
                noEventsText={t('calendar.fc.noEvents', 'No hay eventos para mostrar')}
            // eventContent={(eventInfo) => { // Para personalizar más el renderizado del evento
            //   return (
            //     <>
            //       <b>{eventInfo.timeText}</b>
            //       <i className="ml-1">{eventInfo.event.title}</i>
            //     </>
            //   );
            // }}
            //eventDidMount={(info) => {
            // Puedes usar esto para añadir tooltips o popovers si lo deseas
            // por ejemplo, con Tippy.js
            // if (info.event.extendedProps.description) {
            //   tippy(info.el, {
            //     content: `<b>${info.event.title}</b><br>${info.event.extendedProps.description}`,
            //     allowHTML: true,
            //   });
            // }
            />
        </div>
    );
};

export default FullCalendarView;