// src/components/sections/Activities/ActivityFilters.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFilter, FaCalendarDay, FaTags, FaUserFriends } from 'react-icons/fa';

import type { ScheduleItem } from '../../../data/masterScheduleData';

export interface FilterValues {
    category: string;
    day: string;
    type?: string; // Nuevo filtro por tipo
    audience?: string; // Nuevo filtro por audiencia
    // searchTerm?: string;
}

interface ActivityFiltersProps {
    currentFilters: FilterValues;
    onFilterChange: (filters: FilterValues) => void;
    allActivities: ScheduleItem[]; // Para extraer categorías y días disponibles
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({ currentFilters, onFilterChange, allActivities }) => {
    const { t, i18n } = useTranslation();

    const categories = React.useMemo(() => {
        const unique = new Set<string>();
        allActivities.forEach(act => { if (act.categoryKey) unique.add(act.categoryKey) });
        return Array.from(unique).sort((a, b) => t(a).localeCompare(t(b)));
    }, [allActivities, t]);


    const days = React.useMemo(() => {
        const unique = new Set<string>();
        allActivities.forEach(act => {
            if (act.multiDayDates && act.multiDayDates.length > 0) {
                act.multiDayDates.forEach(d => unique.add(d.date));
            } else {
                unique.add(act.date);
            }
        });
        return Array.from(unique).sort();
    }, [allActivities]);


    const activityTypes = React.useMemo(() => {
        const unique = new Set<string>();
        allActivities.forEach(act => { if (act.typeKey) unique.add(act.typeKey) });
        return Array.from(unique).sort((a, b) => t(a).localeCompare(t(b)));
    }, [allActivities, t]);

    const targetAudiences = React.useMemo(() => {
        const unique = new Set<string>();
        allActivities.forEach(act => { if (act.targetAudienceKey) unique.add(act.targetAudienceKey) });
        return Array.from(unique).sort((a, b) => t(a).localeCompare(t(b)));
    }, [allActivities, t]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ ...currentFilters, [e.target.name]: e.target.value });
    };

    const formatDateForDisplay = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00Z');
        return date.toLocaleDateString(i18n.language, { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
    };


    return (
        <div className="mb-8 p-4 md:p-6 bg-gray-100 rounded-lg shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Filtro por Categoría */}
                <div className="flex flex-col">
                    <label htmlFor="filter-category" className="mb-1 text-sm font-medium text-gray-700 flex items-center">
                        <FaTags className="mr-2 text-fair-primary" /> {t('activities.filterByCategory', 'Categoría:')}
                    </label>
                    <select
                        id="filter-category"
                        name="category" // importante para handleChange
                        value={currentFilters.category}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-fair-secondary focus:border-fair-secondary bg-white"
                    >
                        <option value="all">{t('activities.allCategories', 'Todas')}</option>
                        {categories.map(catKey => (
                            <option key={catKey} value={catKey}>{t(catKey)}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Día */}
                <div className="flex flex-col">
                    <label htmlFor="filter-day" className="mb-1 text-sm font-medium text-gray-700 flex items-center">
                        <FaCalendarDay className="mr-2 text-fair-primary" /> {t('activities.filterByDay', 'Día:')}
                    </label>
                    <select
                        id="filter-day"
                        name="day" // importante para handleChange
                        value={currentFilters.day}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-fair-secondary focus:border-fair-secondary bg-white"
                    >
                        <option value="all">{t('activities.allDays', 'Todos')}</option>
                        {days.map(day => (
                            <option key={day} value={day}>{formatDateForDisplay(day)}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Tipo de Actividad */}
                <div className="flex flex-col">
                    <label htmlFor="filter-type" className="mb-1 text-sm font-medium text-gray-700 flex items-center">
                        <FaFilter className="mr-2 text-fair-primary" /> {t('activities.filterByType', 'Tipo:')}
                    </label>
                    <select
                        id="filter-type"
                        name="type" // importante para handleChange
                        value={currentFilters.type || 'all'}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-fair-secondary focus:border-fair-secondary bg-white"
                    >
                        <option value="all">{t('activities.allTypes', 'Todos')}</option>
                        {activityTypes.map(typeKey => (
                            <option key={typeKey} value={typeKey}>{t(typeKey)}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Audiencia */}
                <div className="flex flex-col">
                    <label htmlFor="filter-audience" className="mb-1 text-sm font-medium text-gray-700 flex items-center">
                        <FaUserFriends className="mr-2 text-fair-primary" /> {t('activities.filterByAudience', 'Público:')}
                    </label>
                    <select
                        id="filter-audience"
                        name="audience" // importante para handleChange
                        value={currentFilters.audience || 'all'}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-fair-secondary focus:border-fair-secondary bg-white"
                    >
                        <option value="all">{t('activities.allAudiences', 'Todos')}</option>
                        {targetAudiences.map(audKey => (
                            <option key={audKey} value={audKey}>{t(audKey)}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ActivityFilters;