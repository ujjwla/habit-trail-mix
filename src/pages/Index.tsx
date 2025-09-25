import { useState } from 'react';
import { Calendar, BarChart3, Trophy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHabits } from '@/hooks/useHabits';
import { HabitCard } from '@/components/HabitCard';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { MonthlyView } from '@/components/MonthlyView';
import { ProgressInsights } from '@/components/ProgressInsights';
import { AchievementBadges } from '@/components/AchievementBadges';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { habits, achievements, addHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const { toast } = useToast();

  const handleAddHabit = (habitData: { name: string; category: any; icon: string }) => {
    addHabit(habitData);
    toast({
      title: "Habit created!",
      description: `"${habitData.name}" has been added to your habits.`,
    });
  };

  const handleDeleteHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    deleteHabit(habitId);
    toast({
      title: "Habit deleted",
      description: `"${habit?.name}" has been removed from your habits.`,
      variant: "destructive",
    });
  };

  const handleToggleCompletion = (habitId: string, date: string) => {
    const habit = habits.find(h => h.id === habitId);
    const isCompleting = !habit?.completedDates.includes(date);
    
    toggleHabitCompletion(habitId, date);
    
    if (isCompleting) {
      toast({
        title: "Great job! 🎉",
        description: `You completed "${habit?.name}" today!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Habit Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Build consistency, track progress, unlock achievements
              </p>
            </div>
            <AddHabitDialog onAddHabit={handleAddHabit} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Today's Habits</h2>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            {habits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold mb-2">Start Your Journey</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first habit and begin building the consistency that leads to lasting change.
                </p>
                <AddHabitDialog onAddHabit={handleAddHabit} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggleCompletion={handleToggleCompletion}
                    onDelete={handleDeleteHabit}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="monthly">
            <MonthlyView habits={habits} />
          </TabsContent>

          <TabsContent value="insights">
            <ProgressInsights habits={habits} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementBadges achievements={achievements} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
