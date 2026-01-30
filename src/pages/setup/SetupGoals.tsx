import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Target, Dumbbell, MoveHorizontal, Scale, Heart, Zap, Moon } from 'lucide-react';
import { saveUserProfile, getUserProfile } from '@/lib/store';
import { cn } from '@/lib/utils';

const goals = [
  { id: 'Overall Fitness', label: 'Overall Fitness', icon: Dumbbell, color: 'bg-zen-sage/20 border-zen-sage hover:bg-zen-sage/30' },
  { id: 'Flexibility', label: 'Flexibility', icon: MoveHorizontal, color: 'bg-zen-lavender/20 border-zen-lavender hover:bg-zen-lavender/30' },
  { id: 'Weight Loss', label: 'Weight Loss', icon: Scale, color: 'bg-zen-peach/20 border-zen-peach hover:bg-zen-peach/30' },
  { id: 'Stress Relief', label: 'Stress Relief', icon: Heart, color: 'bg-zen-rose-light border-primary hover:bg-primary/20' },
  { id: 'Energy Boost', label: 'Energy Boost', icon: Zap, color: 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200' },
  { id: 'Sleep / Wind-down', label: 'Sleep / Wind-down', icon: Moon, color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200' },
];

const SetupGoals = () => {
  const navigate = useNavigate();
  const existingProfile = getUserProfile();
  
  const [selectedGoal, setSelectedGoal] = useState(existingProfile.primaryGoal || '');

  const handleNext = () => {
    saveUserProfile({ primaryGoal: selectedGoal });
    navigate('/setup/health');
  };

  const handleBack = () => {
    navigate('/setup/basics');
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <Card className="w-full max-w-md glass-card animate-slide-up">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zen-sage/20 mx-auto mb-4">
            <Target className="w-8 h-8 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl font-display">Your Primary Goal</CardTitle>
          <CardDescription>What would you like to focus on?</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Goal cards */}
          <div className="grid grid-cols-2 gap-3">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;
              
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200',
                    goal.color,
                    isSelected && 'ring-2 ring-primary ring-offset-2 scale-105'
                  )}
                >
                  <Icon className={cn('w-8 h-8 mb-2', isSelected ? 'text-primary' : 'text-foreground/70')} />
                  <span className={cn('text-sm font-medium text-center', isSelected && 'text-primary')}>
                    {goal.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 py-4">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-muted" />
            <div className="w-3 h-3 rounded-full bg-muted" />
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedGoal}
              className="flex-1 bg-gradient-zen text-primary-foreground hover:opacity-90 shadow-zen"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupGoals;
