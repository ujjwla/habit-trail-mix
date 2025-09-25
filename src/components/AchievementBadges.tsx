import { Trophy, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/types/habit';
import { cn } from '@/lib/utils';

interface AchievementBadgesProps {
  achievements: Achievement[];
}

export function AchievementBadges({ achievements }: AchievementBadgesProps) {
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  if (achievements.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Achievements</h3>
        <Badge variant="secondary">
          {unlockedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Unlocked achievements first */}
        {unlockedAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "relative p-4 rounded-lg border-2 transition-all duration-300",
              "bg-gradient-success border-success text-white animate-celebration"
            )}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold mb-1">{achievement.title}</h4>
              <p className="text-sm opacity-90 mb-2">{achievement.description}</p>
              {achievement.unlockedAt && (
                <p className="text-xs opacity-75">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Locked achievements */}
        {lockedAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "relative p-4 rounded-lg border-2 transition-all duration-300",
              "bg-muted/50 border-border text-muted-foreground"
            )}
          >
            <div className="text-center">
              <div className="relative">
                <div className="text-3xl mb-2 filter grayscale opacity-50">
                  {achievement.icon}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">{achievement.title}</h4>
              <p className="text-sm mb-2">{achievement.description}</p>
              <div className="flex items-center justify-center gap-1">
                <Badge variant="outline" className="text-xs">
                  {achievement.category}
                </Badge>
                {achievement.requirement && (
                  <Badge variant="outline" className="text-xs">
                    {achievement.requirement}+
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {unlockedAchievements.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-lg font-semibold mb-2">No Achievements Yet</h4>
          <p className="text-muted-foreground">
            Complete habits consistently to unlock your first achievement!
          </p>
        </div>
      )}
    </Card>
  );
}