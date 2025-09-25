import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Habit, HABIT_CATEGORIES } from '@/types/habit';

interface ProgressInsightsProps {
  habits: Habit[];
}

export function ProgressInsights({ habits }: ProgressInsightsProps) {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Calculate today's completion rate
  const todayCompleted = habits.filter(habit => 
    habit.completedDates.includes(today)
  ).length;
  const todayCompletionRate = habits.length > 0 ? (todayCompleted / habits.length) * 100 : 0;

  // Calculate this month's completion rate
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let monthlyTotal = 0;
  let monthlyCompleted = 0;

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dateString = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    if (dateString <= today) {
      monthlyTotal += habits.length;
      monthlyCompleted += habits.filter(habit => 
        habit.completedDates.includes(dateString)
      ).length;
    }
  }

  const monthlyCompletionRate = monthlyTotal > 0 ? (monthlyCompleted / monthlyTotal) * 100 : 0;

  // Get current streaks
  const activeStreaks = habits.filter(habit => habit.streak > 0).length;
  const totalStreakDays = habits.reduce((sum, habit) => sum + habit.streak, 0);

  // Calculate category performance
  const categoryStats = Object.entries(HABIT_CATEGORIES).map(([key, category]) => {
    const categoryHabits = habits.filter(h => h.category === key);
    if (categoryHabits.length === 0) return null;

    const categoryCompleted = categoryHabits.filter(habit => 
      habit.completedDates.includes(today)
    ).length;
    const categoryRate = (categoryCompleted / categoryHabits.length) * 100;

    return {
      key,
      category,
      totalHabits: categoryHabits.length,
      completedToday: categoryCompleted,
      completionRate: categoryRate
    };
  }).filter(Boolean);

  const insights = [
    {
      title: "Today's Progress",
      value: `${todayCompleted}/${habits.length}`,
      percentage: todayCompletionRate,
      icon: Target,
      description: "habits completed today",
      color: todayCompletionRate === 100 ? "success" : "primary"
    },
    {
      title: "Monthly Average",
      value: `${Math.round(monthlyCompletionRate)}%`,
      percentage: monthlyCompletionRate,
      icon: Calendar,
      description: "completion rate this month",
      color: monthlyCompletionRate >= 80 ? "success" : monthlyCompletionRate >= 50 ? "primary" : "muted"
    },
    {
      title: "Active Streaks",
      value: activeStreaks.toString(),
      percentage: habits.length > 0 ? (activeStreaks / habits.length) * 100 : 0,
      icon: TrendingUp,
      description: `${totalStreakDays} total streak days`,
      color: activeStreaks > 0 ? "success" : "muted"
    }
  ];

  if (habits.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Start Your Journey</h3>
        <p className="text-muted-foreground">
          Add your first habit to see progress insights and track your growth over time.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${insight.color}/10`}>
                  <insight.icon className={`h-5 w-5 text-${insight.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">{insight.value}</div>
            </div>
            <Progress 
              value={insight.percentage} 
              className="h-2"
            />
          </Card>
        ))}
      </div>

      {/* Category Breakdown */}
      {categoryStats.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat!.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-${stat!.category.color}`} />
                  <span className="font-medium">{stat!.category.label}</span>
                  <Badge variant="secondary">
                    {stat!.completedToday}/{stat!.totalHabits}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Progress value={stat!.completionRate} className="h-2" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-12">
                    {Math.round(stat!.completionRate)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}