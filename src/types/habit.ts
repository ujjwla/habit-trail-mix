export type HabitCategory = 'health' | 'productivity' | 'wellness' | 'learning';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  icon: string;
  createdAt: Date;
  completedDates: string[]; // ISO date strings
  streak: number;
  bestStreak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  unlockedAt?: Date;
  category?: 'streak' | 'completion' | 'consistency';
}

export const HABIT_CATEGORIES: Record<HabitCategory, { label: string; color: string; gradient: string }> = {
  health: {
    label: 'Health',
    color: 'category-health',
    gradient: 'gradient-category-health'
  },
  productivity: {
    label: 'Productivity', 
    color: 'category-productivity',
    gradient: 'gradient-category-productivity'
  },
  wellness: {
    label: 'Wellness',
    color: 'category-wellness', 
    gradient: 'gradient-category-wellness'
  },
  learning: {
    label: 'Learning',
    color: 'category-learning',
    gradient: 'gradient-category-learning'
  }
};