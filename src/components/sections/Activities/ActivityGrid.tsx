// src/components/sections/Activities/ActivityGrid.tsx
import React from 'react';
import ActivityCard from './ActivityCard';
import type { ScheduleItem } from '../../../data/masterScheduleData';

interface ActivityGridProps {
  activities: ScheduleItem[];
  onViewDetails?: (activity: ScheduleItem) => void;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ activities, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ActivityGrid;