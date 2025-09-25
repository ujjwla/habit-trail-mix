import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HabitCategory, HABIT_CATEGORIES } from '@/types/habit';
import { cn } from '@/lib/utils';

interface AddHabitDialogProps {
  onAddHabit: (habit: { name: string; category: HabitCategory; icon: string }) => void;
}

const CATEGORY_ICONS = {
  health: ['💪', '🏃', '🥗', '💊', '🧘', '💤'],
  productivity: ['💻', '📚', '✍️', '📊', '🎯', '⏰'],
  wellness: ['🧠', '❤️', '🌱', '☀️', '🎨', '🎵'],
  learning: ['📖', '🎓', '🔬', '🎯', '💡', '🌟']
};

export function AddHabitDialog({ onAddHabit }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('health');
  const [icon, setIcon] = useState('💪');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddHabit({ name: name.trim(), category, icon });
    setName('');
    setCategory('health');
    setIcon('💪');
    setOpen(false);
  };

  const handleCategoryChange = (newCategory: HabitCategory) => {
    setCategory(newCategory);
    setIcon(CATEGORY_ICONS[newCategory][0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-medium">
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
          <DialogDescription>
            Add a new habit to track your daily progress and build consistency.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(HABIT_CATEGORIES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Choose an Icon</Label>
            <div className="grid grid-cols-6 gap-2">
              {CATEGORY_ICONS[category].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={cn(
                    "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl transition-all",
                    icon === emoji 
                      ? "border-primary bg-primary/10 scale-110" 
                      : "border-border hover:border-primary/50 hover:scale-105"
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
              Create Habit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}