import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Settings, Clock, Volume2, Brain, Sparkles } from 'lucide-react';
import { saveUserProfile, getUserProfile } from '@/lib/store';
import { cn } from '@/lib/utils';

const durations = [
  { value: 5, label: '5 min', desc: 'Quick break' },
  { value: 10, label: '10 min', desc: 'Daily practice' },
  { value: 30, label: '30 min', desc: 'Deep session' },
  { value: 60, label: '60 min', desc: 'Full practice' },
];

const SetupPreferences = () => {
  const navigate = useNavigate();
  const existingProfile = getUserProfile();
  
  const [duration, setDuration] = useState(existingProfile.preferredDuration || 10);
  const [soundscapes, setSoundscapes] = useState(existingProfile.soundscapesEnabled ?? true);
  const [meditationPrompt, setMeditationPrompt] = useState(existingProfile.meditationPromptEnabled ?? true);

  const handleComplete = () => {
    saveUserProfile({ 
      preferredDuration: duration,
      soundscapesEnabled: soundscapes,
      meditationPromptEnabled: meditationPrompt,
      setupComplete: true,
    });
    navigate('/home');
  };

  const handleBack = () => {
    navigate('/setup/health');
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <Card className="w-full max-w-md glass-card animate-slide-up">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zen-lavender/30 mx-auto mb-4">
            <Settings className="w-8 h-8 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-display">Your Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Duration preference */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Preferred Workout Duration
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {durations.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d.value)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200',
                    duration === d.value 
                      ? 'bg-primary/10 border-primary ring-2 ring-primary ring-offset-1' 
                      : 'bg-background/50 border-border hover:border-primary/50'
                  )}
                >
                  <span className={cn('text-lg font-bold', duration === d.value && 'text-primary')}>
                    {d.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Soundscapes toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-zen-sage" />
              <div>
                <Label htmlFor="soundscapes" className="font-medium">Soundscapes</Label>
                <p className="text-sm text-muted-foreground">Ambient sounds during sessions</p>
              </div>
            </div>
            <Switch
              id="soundscapes"
              checked={soundscapes}
              onCheckedChange={setSoundscapes}
            />
          </div>
          
          {/* Meditation prompt toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-zen-lavender" />
              <div>
                <Label htmlFor="meditation-prompt" className="font-medium">Meditation Prompt</Label>
                <p className="text-sm text-muted-foreground">Show suggestion on home page</p>
              </div>
            </div>
            <Switch
              id="meditation-prompt"
              checked={meditationPrompt}
              onCheckedChange={setMeditationPrompt}
            />
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 py-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
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
              onClick={handleComplete}
              className="flex-1 bg-gradient-zen text-primary-foreground hover:opacity-90 shadow-zen"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupPreferences;
