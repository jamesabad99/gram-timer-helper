
import { useState, useEffect } from 'react';
import { 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '@/lib/types';
import useStore from '@/lib/store';
import { motion } from 'framer-motion';

interface CalendarViewProps {
  onSelectDay?: (date: Date) => void;
}

const CalendarView = ({ onSelectDay }: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const { getPostsByDate } = useStore();
  
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    if (onSelectDay) {
      onSelectDay(day);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-full hover:bg-secondary/80 transition-apple"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-full hover:bg-secondary/80 transition-apple"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="h-12 flex items-center justify-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    let formattedDays = days.map(day => {
      return {
        date: day,
        posts: getPostsByDate(day),
        isCurrentMonth: isSameMonth(day, monthStart),
        isToday: isSameDay(day, new Date()),
      };
    });

    let i = 0;
    while (i < formattedDays.length) {
      rows.push(formattedDays.slice(i, i + 7));
      i += 7;
    }

    return (
      <div className="bg-card rounded-xl overflow-hidden border border-border/50">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-7">
            {row.map((day, idx) => (
              <div
                key={idx}
                className={`calendar-day ${
                  !day.isCurrentMonth
                    ? 'text-muted-foreground/40 bg-secondary/30'
                    : ''
                } ${
                  isSameDay(day.date, selectedDate)
                    ? 'bg-primary/10 border-primary/30'
                    : ''
                }`}
                onClick={() => onDateClick(day.date)}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-sm font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
                      day.isToday
                        ? 'bg-primary text-white'
                        : ''
                    }`}
                  >
                    {format(day.date, dateFormat)}
                  </span>
                  
                  {day.posts.length > 0 && (
                    <div className="flex -space-x-1">
                      {day.posts.length === 1 ? (
                        <div className="w-4 h-4 rounded-full bg-primary/80"></div>
                      ) : (
                        <>
                          <div className="w-4 h-4 rounded-full bg-primary/80"></div>
                          <div className="w-4 h-4 rounded-full bg-primary/60"></div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="calendar-day-content mt-1">
                  {day.posts.slice(0, 1).map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs line-clamp-3 text-left"
                    >
                      {post.caption}
                    </motion.div>
                  ))}
                  {day.posts.length > 1 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      +{day.posts.length - 1} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CalendarView;
