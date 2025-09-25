import { useState } from 'react';
import { Check, Flame, MoreHorizontal, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Habit, HABIT_CATEGORIES } from '@/types/habit';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitCard({ habit, onToggleCompletion, onDelete }: HabitCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  const category = HABIT_CATEGORIES[habit.category];

  const handleToggleCompletion = () => {
    setIsCompleting(true);
    onToggleCompletion(habit.id, today);
    
    // Add celebration animation delay
    setTimeout(() => {
      setIsCompleting(false);
    }, 600);
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-medium">
      {/* Category gradient background */}
      <div className={cn(
        "absolute inset-0 opacity-5 bg-gradient-to-br",
        `from-${category.color} to-${category.color}/50`
      )} />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-medium text-white shadow-soft",
              `bg-${category.color}`
            )}>
              {habit.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{habit.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {category.label}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onDelete(habit.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete habit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Streak display */}
        {habit.streak > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-success rounded-lg text-white">
            <Flame className="h-5 w-5" />
            <span className="font-semibold">
              {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak!
            </span>
          </div>
        )}

        {/* Completion button */}
        <Button
          onClick={handleToggleCompletion}
          variant={isCompletedToday ? "default" : "outline"}
          className={cn(
            "w-full transition-all duration-300",
            isCompletedToday && "bg-success hover:bg-success/90 animate-pulse-success",
            isCompleting && "animate-celebration",
            !isCompletedToday && "hover:border-success hover:text-success"
          )}
        >
          <Check className={cn(
            "h-4 w-4 mr-2 transition-transform",
            isCompletedToday && "scale-110"
          )} />
          {isCompletedToday ? 'Completed Today!' : 'Mark Complete'}
        </Button>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{habit.streak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{habit.bestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </div>
        </div>
      </div>
    </Card>
  );
}