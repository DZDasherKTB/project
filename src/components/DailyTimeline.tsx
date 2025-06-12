import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInSection from './ui/FadeInSection';
import { Brain, Cloud, Code, FileText, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Activity } from '../types/supabase';
import * as Icons from 'lucide-react';

interface ActivityLogProps {
  activity?: Activity;          // single activity
  activities?: Activity[];      // multiple activities
  onClose: () => void;
}


function ActivityIcon({ iconName }: { iconName: string }) {
  // Convert e.g. 'brain' to 'Brain', 'file-text' to 'FileText'
  const pascalCaseName = iconName
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const Icon = Icons[pascalCaseName];
  return Icon ? <Icon className="h-5 w-5 text-primary" /> : <span className="text-text-secondary">?</span>;
}


const ActivityLog: React.FC<ActivityLogProps> = ({ activity, activities, onClose }) => {
  // Normalize to an array for rendering
  const activityList = activity ? [activity] : (activities ?? []).slice().reverse();

  if (activityList.length === 0) return null; // nothing to show

  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-6 items-center justify-center w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {activityList.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="bg-surface border-2 border-primary rounded-lg p-6 w-full shadow-[0_0_30px_rgba(176,38,255,0.3)]"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <ActivityIcon iconName={activity.icon} />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">{activity.title}</h3>
                <p className="text-text-tertiary text-sm">
                  {activity.date} • {activity.category}
                </p>
              </div>
            </div>

            <p className="text-text-secondary mb-4">{activity.description}</p>

            {index === activityList.length - 1 && (
              <div className="pt-4 border-t border-surface-light">
                <button className="cyberpunk-button w-full" onClick={onClose}>
                  Close
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


const DailyTimeline: React.FC = () => {
  const [selectedActivities, setSelectedActivities] = useState<Activity[] | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, activities.length));
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, []);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  // Group activities by date for calendar view
  const activityDates = activities.reduce<Record<string, Activity>>((acc, activity) => {
    acc[activity.date] = activity;
    return acc;
  }, {});

  // Format date to YYYY-MM-DD
  function formatDateToLocalYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    
    // Generate days for current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = formatDateToLocalYYYYMMDD(date);
      const activity = activityDates[dateString];
      const hasActivity = activityDates[dateString] !== undefined;
      days.push({
        day: i,
        date: dateString,
        hasActivity,
        activity: hasActivity ? activityDates[dateString] : null,
        isToday: date.toDateString() === today.toDateString(),
        isHoliday: hasActivity ? activity.holiday === true : false  // <-- NEW LINE
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  return (
    <section id="timeline" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Activity Log</h2>
      </FadeInSection>
      
      <FadeInSection delay={0.2}>
        <div className="mt-12 bg-surface rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-display font-bold">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <button 
                  className="p-2 bg-surface-light rounded hover:bg-primary/20 transition-colors"
                  onClick={goToPreviousMonth}
                >
                  {/* Left Arrow */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                <button 
                  className="p-2 bg-surface-light rounded hover:bg-primary/20 transition-colors"
                  onClick={goToNextMonth}
                >
                  {/* Right Arrow */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-text-tertiary text-sm py-2">
                {day}
              </div>
            ))}
            
            {/* Empty slots for days before the month starts */}
            {Array(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-lg" />
            ))}
            
            {calendarDays.map((day) => (
              <motion.div
                key={day.date}
                className={`aspect-square rounded-lg
                ${day.isHoliday ? 'bg-[#4a00008f] hover:bg-[#4a0000d9]': day.hasActivity 
                  ? 'bg-primary/20 cursor-pointer hover:bg-primary/30' 
                  : 'bg-surface-light'
                } ${
                  day.isToday ? 'border-2 border-primary' : ''
                } flex items-center justify-center relative group transition-all duration-300`}
                whileHover={
                  day.isHoliday
                    ? {
                        scale: 1.02,
                        boxShadow: '0 0 15px rgba(74, 0, 0, 0.80)',
                      }
                    : day.hasActivity
                    ? {
                        scale: 1.05,
                        boxShadow: '0 0 15px rgba(176, 38, 255, 0.3)',
                      }
                    : undefined
                }                
                onClick={() => setSelectedActivities(activities.filter(a => a.date === day.date))}
                >
                <span className={`
                  ${day.hasActivity ? 'text-primary font-bold' : '' }
                  group-hover:${day.hasActivity ? 'scale-110' : ''}
                  ${day.isHoliday ? 'text-red-700': ''}
                  transition-transform duration-300
                `}>
                  {day.day}
                </span>
                {day.hasActivity && (
                  <div className={`absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse ${day.isHoliday ? 'bg-red-700': 'bg-primary'
                }`} />
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 border-t border-surface-light pt-6">
            <h4 className="text-xl font-display font-bold mb-4">Recent Activities</h4>
            <div className="space-y-3">
              {activities.filter(activity => !activity.holiday).slice(0, visibleCount).map((activity) => (
                <motion.div
                  key={activity.id}
                  className="flex gap-3 p-3 bg-surface-light rounded-lg cursor-pointer hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedActivity(activity);
                  }}
                >
                  <div className="bg-primary/20 p-2 rounded-lg text-primary self-start">
                  <ActivityIcon iconName={activity.icon} />
                  </div>
                  <div>
                    <h5 className="font-display font-bold">{activity.title}</h5>
                    <p className="text-text-tertiary text-sm">
                      {activity.date} • {activity.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {visibleCount < activities.length && (
              <button
                className="cyberpunk-button w-full mt-4"
                onClick={showMore}
              >
                View More Activities
              </button>
            )}
          </div>
        </div>
      </FadeInSection>
      
      <AnimatePresence>
      {selectedActivity && (
        <ActivityLog 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}
      {selectedActivities && (
        <ActivityLog 
          activities={selectedActivities} 
          onClose={() => setSelectedActivities(null)} 
        />
      )}
      </AnimatePresence>

    </section>
  );
};

export default DailyTimeline;