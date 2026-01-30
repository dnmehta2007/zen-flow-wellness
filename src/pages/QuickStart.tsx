import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Play, Target, Clock, Gauge } from 'lucide-react';
import { getUserProfile } from '@/lib/store';
import { goals, durations, generateSession } from '@/lib/poses';
import { cn } from '@/lib/utils';

const difficultyLevels = [
  { id: 'beginner', label: 'Beginner', desc: 'Gentle & accessible' },
  { id: 'intermediate', label: 'Intermediate', desc: 'More challenging' },
  { id: 'advanced', label: 'Advanced', desc: 'Intense practice' },
];

const QuickStart = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  
  const [selectedGoal, setSelectedGoal] = useState(profile.primaryGoal);
  const [selectedDuration, setSelectedDuration] = useState(profile.preferredDuration);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');

  const handleGenerateSession = () => {
    const sessionPoses = generateSession(selectedDuration, selectedGoal, selectedDifficulty);
    // Store session config in sessionStorage for the session page
    sessionStorage.setItem('currentSession', JSON.stringify({
      poses: sessionPoses.map(p => p.id),
      goal: selectedGoal,
      duration: selectedDuration,
      difficulty: selectedDifficulty,
    }));
    navigate('/session');
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold">Quick Start</h1>
          <p className="text-sm text-muted-foreground">Configure your session</p>
        </div>
      </div>

      <div className="px-6 space-y-6 pb-8">
        {/* Goal Selection */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm border transition-all duration-200',
                    selectedGoal === goal 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background/50 border-border hover:border-primary/50'
                  )}
                >
                  {goal}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Duration Selection */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-zen-sage" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200',
                    selectedDuration === duration 
                      ? 'bg-zen-sage/20 border-zen-sage ring-2 ring-zen-sage ring-offset-1' 
                      : 'bg-background/50 border-border hover:border-zen-sage/50'
                  )}
                >
                  <span className={cn('text-xl font-bold', selectedDuration === duration && 'text-secondary-foreground')}>
                    {duration}
                  </span>
                  <span className="text-xs text-muted-foreground">min</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Selection */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="w-5 h-5 text-zen-lavender" />
              Flexibility Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {difficultyLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedDifficulty(level.id)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200',
                    selectedDifficulty === level.id 
                      ? 'bg-zen-lavender/20 border-zen-lavender ring-2 ring-zen-lavender ring-offset-1' 
                      : 'bg-background/50 border-border hover:border-zen-lavender/50'
                  )}
                >
                  <span className={cn('text-sm font-medium', selectedDifficulty === level.id && 'text-foreground')}>
                    {level.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{level.desc}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerateSession}
          className="w-full h-16 bg-gradient-zen text-primary-foreground shadow-zen-lg hover:shadow-zen-glow transition-all duration-300 rounded-2xl text-lg"
        >
          <Play className="w-6 h-6 mr-3" />
          Generate Session
        </Button>
      </div>
    </div>
  );
};

export default QuickStart;
