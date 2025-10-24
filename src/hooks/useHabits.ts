import { useState, useEffect } from 'react';
import { Habit, Achievement } from '@/types/habit';

const STORAGE_KEY = 'habit-tracker-data';

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-habit',
    title: 'Getting Started',
    description: 'Create your first habit',
    icon: '🌱',
    requirement: 1,
    category: 'completion'
  },
  {
    id: 'streak-3',
    title: '3-Day Streak',
    description: 'Complete a habit for 3 days in a row',
    icon: '🔥',
    requirement: 3,
    category: 'streak'
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Complete a habit for 7 days in a row',
    icon: '⭐',
    requirement: 7,
    category: 'streak'
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: 'Complete a habit for 30 days in a row',
    icon: '👑',
    requirement: 30,
    category: 'streak'
  },
  {
    id: 'consistency-90',
    title: 'Consistency Champion',
    description: 'Maintain 90% completion rate for a month',
    icon: '💎',
    requirement: 90,
    category: 'consistency'
  }
];

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS);

const generateId = () => {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
  } catch (_) {}
  // RFC4122 v4 fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setHabits(Array.isArray(data?.habits) ? data.habits : []);
        setAchievements(Array.isArray(data?.achievements) ? data.achievements : DEFAULT_ACHIEVEMENTS);
      }
    } catch (_) {
      // If storage is corrupted, reset in-memory state; next save will overwrite
      setHabits([]);
      setAchievements(DEFAULT_ACHIEVEMENTS);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits, achievements }));
    } catch (_) {
      // Ignore quota/serialization errors
    }
  }, [habits, achievements]);

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'bestStreak'>) => {
    const newHabit: Habit = {
      ...habit,
      id: generateId(),
      createdAt: new Date(),
      completedDates: [],
      streak: 0,
      bestStreak: 0
    };
    
    setHabits(prev => [...prev, newHabit]);
    
    // Check for first habit achievement
    if (habits.length === 0) {
      setAchievements(prev => 
        prev.map(achievement => 
          achievement.id === 'first-habit' 
            ? { ...achievement, unlockedAt: new Date() }
            : achievement
        )
      );
    }
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== habitId) return habit;

      const completedDates = habit.completedDates.includes(date)
        ? habit.completedDates.filter(d => d !== date)
        : [...habit.completedDates, date].sort();

      const { streak, bestStreak } = calculateStreak(completedDates);

      // Check for streak achievements
      const newStreak = streak;
      if (newStreak >= 3 && !achievements.find(a => a.id === 'streak-3')?.unlockedAt) {
        setAchievements(prev => 
          prev.map(achievement => 
            achievement.id === 'streak-3' 
              ? { ...achievement, unlockedAt: new Date() }
              : achievement
          )
        );
      }
      if (newStreak >= 7 && !achievements.find(a => a.id === 'streak-7')?.unlockedAt) {
        setAchievements(prev => 
          prev.map(achievement => 
            achievement.id === 'streak-7' 
              ? { ...achievement, unlockedAt: new Date() }
              : achievement
          )
        );
      }
      if (newStreak >= 30 && !achievements.find(a => a.id === 'streak-30')?.unlockedAt) {
        setAchievements(prev => 
          prev.map(achievement => 
            achievement.id === 'streak-30' 
              ? { ...achievement, unlockedAt: new Date() }
              : achievement
          )
        );
      }

      return {
        ...habit,
        completedDates,
        streak,
        bestStreak: Math.max(bestStreak, habit.bestStreak)
      };
    }));
  };

  const calculateStreak = (completedDates: string[]): { streak: number; bestStreak: number } => {
    if (completedDates.length === 0) return { streak: 0, bestStreak: 0 };

    const sortedDates = completedDates.sort();
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 1;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Calculate best streak
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const previousDate = new Date(sortedDates[i - 1]);
      const diffDays = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        bestStreak = Math.max(bestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak);

    // Calculate current streak
    if (sortedDates.includes(today) || sortedDates.includes(yesterday)) {
      currentStreak = 1;
      for (let i = sortedDates.length - 2; i >= 0; i--) {
        const currentDate = new Date(sortedDates[i + 1]);
        const previousDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    return { streak: currentStreak, bestStreak };
  };

  return {
    habits,
    achievements,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion
  };
}