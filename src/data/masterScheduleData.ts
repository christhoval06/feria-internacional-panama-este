export interface ScheduleItem {
  id: string;
  // Para Título y Descripción (usar claves de i18next)
  titleKey: string;
  shortDescriptionKey: string; // Para tarjetas y lista de calendario
  longDescriptionKey?: string;  // Para modal o página de detalle de actividad

  // Para presentación visual en ActivitiesPage
  imageUrl?: string;            // Imagen principal de la actividad

  // Datos de Fecha y Hora (para ambos)
  date: string;                 // YYYY-MM-DD (si es un solo día)
  startTime: string;            // HH:MM
  endTime?: string;             // HH:MM (opcional)
  duration: { hours?: number; minutes?: number }; // Opcional
  multiDayDates?: { date: string; startTime: string; endTime?: string }[]; // Si la actividad se repite o dura varios días

  // Para organización y filtrado (para ambos)
  locationKey?: string;
  categoryKey: string;          // Categoría principal
  typeKey?: string;             // Ej: 'conferencia', 'taller', 'demostracion'
  tags?: string[];              // Palabras clave adicionales

  // Específico de Actividades (opcional)
  speakerKeys?: string[];
  targetAudienceKey?: string;
  requiresRegistration?: boolean;
  registrationLink?: string;
  capacity?: number;
}


const fairStartDate = new Date(2025, 7, 13); // Agosto es el mes 7 (0-indexado)
const fairEndDate = new Date(2025, 7, 17);

// Usaremos las mismas categorías, ubicaciones, títulos y descripciones de muestra que antes
// Asegúrate de que estas claves existan en tus archivos de traducción
const categories = [
  'calendar.categories.opening', 'calendar.categories.closing',
  'calendar.categories.agro', 'calendar.categories.livestock',
  'calendar.categories.business', 'calendar.categories.entrepreneurship',
  'calendar.categories.conference', 'calendar.categories.workshop',
  'calendar.categories.cultural', 'calendar.categories.family', 'calendar.categories.exhibition',
  'calendar.categories.networking', 'calendar.categories.entertainment', 'calendar.categories.kids',
  'calendar.categories.food', 'calendar.categories.sustainability', 'calendar.categories.innovation',
  'calendar.categories.technology'
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

const sampleShortDescs = [ // Usaremos los sampleDescs como shortDescription
  'calendar.sampledescs.desc1', 'calendar.sampledescs.desc2', 'calendar.sampledescs.desc3',
  'calendar.sampledescs.desc4', 'calendar.sampledescs.desc5'
];

// Podríamos tener descripciones largas diferentes o generarlas
const sampleLongDescs = [
  'calendar.samplelongdescs.longdesc1', 'calendar.samplelongdescs.longdesc2',
  'calendar.samplelongdescs.longdesc3'
];

const activityTypes = [
  'activityTypes.conference', 'activityTypes.workshop', 'activityTypes.demonstration',
  'activityTypes.exhibition', 'activityTypes.show', 'activityTypes.contest', 'activityTypes.networking'
];

const targetAudiences = [
  'audience.professionals', 'audience.farmers', 'audience.ranchers', 'audience.entrepreneurs',
  'audience.students', 'audience.families', 'audience.generalPublic'
];

const speakerNames = [ // Usar claves para nombres de ponentes
    'speakers.juanPerez', 'speakers.mariaLopez', 'speakers.carlosGomez', 'speakers.anaRodriguez'
];

// --- Helper Functions (las mismas que antes) ---
const getRandomTime = (): string => {
  const hour = Math.floor(Math.random() * (19 - 9 + 1)) + 9;
  const minute = Math.random() < 0.5 ? '00' : '30';
  return `${String(hour).padStart(2, '0')}:${minute}`;
};
const getRandomDuration = (): { hours?: number; minutes?: number } => {
  const type = Math.random();
  if (type < 0.3) return { minutes: 30 };
  if (type < 0.7) return { hours: 1 };
  if (type < 0.9) return { hours: 1, minutes: 30 };
  return { hours: 2 };
};
const getRandomFairDate = (): string => {
  const start = fairStartDate.getTime();
  const end = fairEndDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  const randomDate = new Date(randomTime);
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// --- End Helper Functions ---

export const scheduleData: ScheduleItem[] = [];

// --- Evento de Apertura ---
scheduleData.push({
  id: 'sch-opening',
  titleKey: 'calendar.eventOpening.title',
  shortDescriptionKey: 'calendar.eventOpening.description', // Usamos la misma desc para short y long por ahora
  longDescriptionKey: 'calendar.eventOpening.longDescription', // Deberías crear esta clave en tus traducciones
  imageUrl: 'https://placehold.co/600x300/FFD700/000000?Text=Gran+Apertura',
  date: '2025-08-13',
  startTime: '09:00',
  duration: { hours: 1, minutes: 30 },
  locationKey: 'calendar.locations.mainStage',
  categoryKey: 'calendar.categories.opening',
  typeKey: 'activityTypes.ceremony',
  targetAudienceKey: 'audience.generalPublic',
  tags: ['inauguración', 'oficial', 'bienvenida'],
});

// --- Generar 23 eventos aleatorios más ---
for (let i = 1; i <= 23; i++) {
  const date = getRandomFairDate();
  const startTime = getRandomTime();
  const duration = getRandomDuration();
  const category = categories[Math.floor(Math.random() * (categories.length -2 )) + 2]; // Evitar opening/closing

  scheduleData.push({
    id: `sch${i}`,
    titleKey: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
    shortDescriptionKey: sampleShortDescs[Math.floor(Math.random() * sampleShortDescs.length)],
    longDescriptionKey: Math.random() > 0.5 ? sampleLongDescs[Math.floor(Math.random() * sampleLongDescs.length)] : undefined,
    imageUrl: `https://placehold.co/400x250/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?Text=Actividad+${i}`,
    date: date,
    startTime: startTime,
    duration: duration,
    // multiDayDates: Math.random() > 0.8 ? [{date, startTime, duration}] : undefined, // Ejemplo si quisieras multi-día
    locationKey: locations[Math.floor(Math.random() * locations.length)],
    categoryKey: category,
    typeKey: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    tags: [category.split('.').pop() || 'evento', Math.random() > 0.5 ? 'popular' : 'nuevo'],
    speakerKeys: Math.random() > 0.6 ? [speakerNames[Math.floor(Math.random() * speakerNames.length)]] : undefined,
    targetAudienceKey: targetAudiences[Math.floor(Math.random() * targetAudiences.length)],
    requiresRegistration: Math.random() > 0.7,
    registrationLink: Math.random() > 0.7 ? '#' : undefined,
    capacity: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 20 : undefined,
  });
}

// --- Evento de Clausura ---
scheduleData.push({
  id: 'sch-closing',
  titleKey: 'calendar.eventClosing.title',
  shortDescriptionKey: 'calendar.eventClosing.description',
  longDescriptionKey: 'calendar.eventClosing.longDescription', // Crear esta clave
  imageUrl: 'https://placehold.co/600x300/F44336/FFFFFF?Text=Clausura+Feria',
  date: '2025-08-17',
  startTime: '18:00',
  duration: { hours: 1 },
  locationKey: 'calendar.locations.mainStage',
  categoryKey: 'calendar.categories.closing',
  typeKey: 'activityTypes.ceremony',
  targetAudienceKey: 'audience.generalPublic',
  tags: ['clausura', 'despedida', 'agradecimientos'],
});

// Ordenar por fecha y hora (CalendarView y otros componentes podrían hacerlo también)
scheduleData.sort((a, b) => {
  const dateA = new Date(`${a.date}T${a.startTime}`);
  const dateB = new Date(`${b.date}T${b.startTime}`);
  return dateA.getTime() - dateB.getTime();
});