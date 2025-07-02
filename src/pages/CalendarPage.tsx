import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CalendarView from '../components/sections/Calendar/CalendarView'; // Vista de Lista
import FullCalendarView from '../components/sections/Calendar/FullCalendarView'; // Vista de FullCalendar
import { FaFilter, FaListUl, FaCalendarAlt } from 'react-icons/fa';
import { scheduleData, } from '../data/masterScheduleData';

import aboutBannerImage from '../assets/images/highlights/agro-highlight.jpg'; // Necesitarás esta imagen
import PageBanner from '../components/common/PageBanner';

type ViewMode = 'list' | 'calendar';

const FAIR_START_DATE_STR = '2025-08-13';
const FAIR_END_DATE_STR = '2025-08-17'; // FullCalendar necesita un día DESPUÉS del último día para incluirlo,
// o ajustar validRange. Usaremos el mismo y veremos si lo incluye.
// Para incluir el 17, a veces se pone el 18 como end.

const CalendarPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list'); // 'list' o 'calendar'

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    scheduleData.forEach(event => { // CAMBIO: Usar scheduleData
      if (event.categoryKey) uniqueCategories.add(event.categoryKey);
    });
    return Array.from(uniqueCategories).sort((a, b) => t(a).localeCompare(t(b)));
  }, [t]);

  // Los eventos filtrados se pueden pasar a FullCalendar también si quieres que el filtro aplique allí
  // o puedes dejar que FullCalendar maneje su propia representación de todos los eventos.
  // Por simplicidad, FullCalendar mostrará todos los eventos aquí.
  const filteredEventsForListView = useMemo(() => {
    const dataToFilter = scheduleData; // CAMBIO: Usar scheduleData
    if (selectedCategory === 'all') return dataToFilter;
    return dataToFilter.filter(event => event.categoryKey === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 md:space-y-16 lg:space-y-20"
    >

      <PageBanner
        imageUrl={aboutBannerImage}
        title={t('calendar.titlePage', 'Conoce Nuestra Feria')}
        subtitle={t('about.pageSubtitle', 'Impulsando el futuro agropecuario, ganadero, empresarial y de emprendimientos en Panamá Este.')}
      />

      <section className="container mx-auto px-4">

        {/* Controles: Filtro y Toggle de Vista */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Filtro de Categorías */}
          {categories.length > 0 && viewMode === 'list' && ( // Mostrar filtro solo en vista de lista
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <label htmlFor="category-filter" className="text-md font-semibold text-gray-700">
                <FaFilter className="inline mr-1 mb-0.5" />
                {t('calendar.filterByCategory')}
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-fair-secondary focus:border-fair-secondary"
              >
                <option value="all">{t('calendar.allCategories')}</option>
                {categories.map(categoryKey => (
                  <option key={categoryKey} value={categoryKey}>
                    {t(categoryKey)}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Spacer para alinear el toggle a la derecha cuando el filtro no está */}
          {(categories.length === 0 || viewMode !== 'list') && <div className="flex-grow md:block hidden"></div>}


          {/* Toggle de Vista */}
          <div className="flex border border-gray-300 rounded-md p-0.5 bg-gray-100">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center transition-colors
                        ${viewMode === 'list' ? 'bg-fair-primary text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              title={t('calendar.viewToggle.list')}
            >
              <FaListUl className="mr-2" /> {t('calendar.viewToggle.list')}
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center transition-colors
                        ${viewMode === 'calendar' ? 'bg-fair-primary text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              title={t('calendar.viewToggle.calendar')}
            >
              <FaCalendarAlt className="mr-2" /> {t('calendar.viewToggle.calendar')}
            </button>
          </div>
        </div>


        {/* Renderizar la vista seleccionada */}
        {viewMode === 'list' ? (
          <CalendarView events={filteredEventsForListView} selectedCategory={selectedCategory} />
        ) : (
          <FullCalendarView
            events={scheduleData} // CAMBIO: pasar scheduleData
            initialDate={FAIR_START_DATE_STR}
            validRange={{ start: FAIR_START_DATE_STR, end: '2025-08-18' }}
          />
        )}
      </section>
    </motion.div>
  );
};

export default CalendarPage;