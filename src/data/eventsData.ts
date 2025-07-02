// src/data/eventsData.ts
export interface EventData {
  id: string;
  titleKey: string;
  descriptionKey: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM (24h)
  endTime?: string; // HH:MM (24h) - Opcional, o usar duration
  duration: { hours?: number; minutes?: number }; // Opcional, o usar endTime
  locationKey?: string;
  categoryKey?: string;
}

const fairStartDate = new Date(2025, 7, 13); // Agosto es el mes 7 (0-indexado)
const fairEndDate = new Date(2025, 7, 17);

const categories = [
  'calendar.categories.opening', 'calendar.categories.closing',
  'calendar.categories.agro', 'calendar.categories.livestock',
  'calendar.categories.business', 'calendar.categories.entrepreneurship',
  'calendar.categories.conference', 'calendar.categories.workshop',
  'calendar.categories.cultural', 'calendar.categories.family'
];

const locations = [
  'calendar.locations.mainStage', 'calendar.locations.pavilionA', 'calendar.locations.pavilionB',
  'calendar.locations.conferenceRoom1', 'calendar.locations.conferenceRoom2',
  'calendar.locations.startupZone', 'calendar.locations.foodCourt', 'calendar.locations.kidsArea'
];

const sampleTitles = [
  'calendar.sampletitles.title1', 'calendar.sampletitles.title2', 'calendar.sampletitles.title3',
  'calendar.sampletitles.title4', 'calendar.sampletitles.title5', 'calendar.sampletitles.title6',
  'calendar.sampletitles.title7', 'calendar.sampletitles.title8', 'calendar.sampletitles.title9',
  'calendar.sampletitles.title10'
];

const sampleDescriptions = [
  'calendar.sampledescs.desc1', 'calendar.sampledescs.desc2', 'calendar.sampledescs.desc3',
  'calendar.sampledescs.desc4', 'calendar.sampledescs.desc5'
];

// Función para generar una hora aleatoria entre las 09:00 y las 19:00
const getRandomTime = (): string => {
  const hour = Math.floor(Math.random() * (19 - 9 + 1)) + 9; // 9 AM to 7 PM
  const minute = Math.random() < 0.5 ? '00' : '30';
  return `${String(hour).padStart(2, '0')}:${minute}`;
};

// Función para generar una duración aleatoria
const getRandomDuration = (): { hours?: number; minutes?: number } => {
  const type = Math.random();
  if (type < 0.3) return { minutes: 30 };
  if (type < 0.7) return { hours: 1 };
  if (type < 0.9) return { hours: 1, minutes: 30 };
  return { hours: 2 };
};

// Función para generar una fecha aleatoria dentro del rango de la feria
const getRandomFairDate = (): string => {
  const start = fairStartDate.getTime();
  const end = fairEndDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  const randomDate = new Date(randomTime);
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Mes es 0-indexado
  const day = String(randomDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const events: EventData[] = [];

// Evento de Apertura
events.push({
  id: 'evt-opening',
  titleKey: 'calendar.eventOpening.title',
  descriptionKey: 'calendar.eventOpening.description',
  date: '2025-08-13',
  startTime: '09:00',
  duration: { hours: 1, minutes: 30 },
  locationKey: 'calendar.locations.mainStage',
  categoryKey: 'calendar.categories.opening',
});

// Generar 23 eventos aleatorios más
for (let i = 1; i <= 23; i++) {
  events.push({
    id: `evt${i}`,
    titleKey: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
    descriptionKey: sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)],
    date: getRandomFairDate(),
    startTime: getRandomTime(),
    duration: getRandomDuration(),
    locationKey: locations[Math.floor(Math.random() * locations.length)],
    categoryKey: categories[Math.floor(Math.random() * (categories.length -2 )) + 2], // Evitar opening/closing para los random
  });
}

// Evento de Clausura
events.push({
  id: 'evt-closing',
  titleKey: 'calendar.eventClosing.title',
  descriptionKey: 'calendar.eventClosing.description',
  date: '2025-08-17',
  startTime: '18:00',
  duration: { hours: 1 },
  locationKey: 'calendar.locations.mainStage',
  categoryKey: 'calendar.categories.closing',
});

// Ordenar todos los eventos por fecha y luego por hora de inicio (opcional, CalendarView ya lo hace)
// events.sort((a, b) => {
//   const dateComparison = a.date.localeCompare(b.date);
//   if (dateComparison !== 0) return dateComparison;
//   return a.startTime.localeCompare(b.startTime);
// });