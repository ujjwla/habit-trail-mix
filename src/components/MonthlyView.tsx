import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Habit, HABIT_CATEGORIES } from '@/types/habit';
import { cn } from '@/lib/utils';

interface MonthlyViewProps {
  habits: Habit[];
}

export function MonthlyView({ habits }: MonthlyViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDayCompletions = (day: number) => {
    const dateString = new Date(year, month, day).toISOString().split('T')[0];
    return habits.filter(habit => habit.completedDates.includes(dateString));
  };

  const getCompletionRate = () => {
    if (habits.length === 0) return 0;
    
    let totalPossible = 0;
    let totalCompleted = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(year, month, day).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      // Only count days up to today
      if (dateString <= today) {
        totalPossible += habits.length;
        totalCompleted += habits.filter(habit => 
          habit.completedDates.includes(dateString)
        ).length;
      }
    }
    
    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
  };

  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const today = new Date();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{monthNames[month]} {year}</h2>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="secondary" className="bg-gradient-success text-white">
              {getCompletionRate()}% Complete
            </Badge>
            <span className="text-sm text-muted-foreground">
              {habits.length} habit{habits.length !== 1 ? 's' : ''} tracked
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={index} className="p-2 h-16" />;
          }

          const completions = getDayCompletions(day);
          const isToday = isCurrentMonth && day === today.getDate();
          const completionRate = habits.length > 0 ? (completions.length / habits.length) * 100 : 0;

          return (
            <div
              key={day}
              className={cn(
                "p-2 h-16 border rounded-lg transition-all hover:shadow-soft",
                isToday && "border-primary bg-primary/5",
                completionRate === 100 && "bg-gradient-success text-white border-transparent",
                completionRate > 0 && completionRate < 100 && "bg-gradient-to-br from-success/20 to-transparent border-success/30"
              )}
            >
              <div className="flex flex-col h-full">
                <span className={cn(
                  "text-sm font-medium",
                  completionRate === 100 ? "text-white" : "text-foreground"
                )}>
                  {day}
                </span>
                
                {completions.length > 0 && (
                  <div className="flex-1 flex items-end">
                    <div className="flex flex-wrap gap-1">
                      {completions.slice(0, 3).map((habit, i) => {
                        const category = HABIT_CATEGORIES[habit.category];
                        return (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              completionRate === 100 ? "bg-white/80" : `bg-${category.color}`
                            )}
                            title={habit.name}
                          />
                        );
                      })}
                      {completions.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{completions.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {habits.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-sm font-medium mb-3">Habit Categories</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(HABIT_CATEGORIES).map(([key, { label, color }]) => {
              const categoryHabits = habits.filter(h => h.category === key);
              if (categoryHabits.length === 0) return null;
              
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", `bg-${color}`)} />
                  <span className="text-sm text-muted-foreground">
                    {label} ({categoryHabits.length})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}