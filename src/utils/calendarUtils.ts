import { createEvents, type EventAttributes } from 'ics';

export interface MyEvent {
  title: string;
  description: string;
  start: Date; // O [año, mes, dia, hora, minuto]
  duration: { hours?: number; minutes?: number; days?: number };
  location?: string;
  url?: string;
  // ... más propiedades si necesitas
}

export const generateICSFile = (event: MyEvent): Promise<string> => {
  const eventAttributes: EventAttributes = {
    title: event.title,
    description: event.description,
    start: [event.start.getFullYear(), event.start.getMonth() + 1, event.start.getDate(), event.start.getHours(), event.start.getMinutes()],
    duration: event.duration,
    location: event.location,
    url: event.url,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
  };

  return new Promise((resolve, reject) => {
    createEvents([eventAttributes], (error, value) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      resolve(value);
    });
  });
};

export const downloadICS = (icsContent: string, filename: string = 'evento.ics') => {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};