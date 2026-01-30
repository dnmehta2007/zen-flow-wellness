import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, HeartPulse, Leaf, Drumstick } from 'lucide-react';
import { saveUserProfile, getUserProfile } from '@/lib/store';
import { cn } from '@/lib/utils';

const healthIssues = [
  { id: 'back-pain', label: 'Back Pain' },
  { id: 'knee-issues', label: 'Knee Issues' },
  { id: 'neck-tension', label: 'Neck Tension' },
  { id: 'joint-pain', label: 'Joint Pain' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'insomnia', label: 'Insomnia' },
  { id: 'high-blood-pressure', label: 'High Blood Pressure' },
  { id: 'pregnancy', label: 'Pregnancy' },
  { id: 'none', label: 'None of these' },
];

const SetupHealth = () => {
  const navigate = useNavigate();
  const existingProfile = getUserProfile();
  
  const [selectedIssues, setSelectedIssues] = useState<string[]>(existingProfile.healthIssues || []);
  const [diet, setDiet] = useState(existingProfile.diet || 'vegetarian');

  const toggleIssue = (id: string) => {
    if (id === 'none') {
      setSelectedIssues(['none']);
    } else {
      setSelectedIssues(prev => {
        const filtered = prev.filter(i => i !== 'none');
        if (filtered.includes(id)) {
          return filtered.filter(i => i !== id);
        }
        return [...filtered, id];
      });
    }
  };

  const handleNext = () => {
    saveUserProfile({ 
      healthIssues: selectedIssues,
      diet 
    });
    navigate('/setup/preferences');
  };

  const handleBack = () => {
    navigate('/setup/goals');
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <Card className="w-full max-w-md glass-card animate-slide-up">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zen-rose-light mx-auto mb-4">
            <HeartPulse className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display">Health & Diet</CardTitle>
          <CardDescription>Help us customize your experience</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Health Issues */}
          <div className="space-y-3">
            <Label>Any health considerations?</Label>
            <div className="flex flex-wrap gap-2">
              {healthIssues.map((issue) => {
                const isSelected = selectedIssues.includes(issue.id);
                return (
                  <button
                    key={issue.id}
                    onClick={() => toggleIssue(issue.id)}
                    className={cn(
                      'px-3 py-2 rounded-full text-sm border transition-all duration-200',
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background/50 border-border hover:border-primary/50'
                    )}
                  >
                    {issue.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Diet preference */}
          <div className="space-y-3">
            <Label>Diet Preference</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDiet('vegetarian')}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200',
                  'bg-zen-sage-light border-zen-sage hover:bg-zen-sage/30',
                  diet === 'vegetarian' && 'ring-2 ring-primary ring-offset-2'
                )}
              >
                <Leaf className={cn('w-8 h-8 mb-2', diet === 'vegetarian' ? 'text-primary' : 'text-zen-sage')} />
                <span className="text-sm font-medium">Vegetarian</span>
              </button>
              
              <button
                onClick={() => setDiet('non-vegetarian')}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200',
                  'bg-zen-peach/20 border-zen-peach hover:bg-zen-peach/30',
                  diet === 'non-vegetarian' && 'ring-2 ring-primary ring-offset-2'
                )}
              >
                <Drumstick className={cn('w-8 h-8 mb-2', diet === 'non-vegetarian' ? 'text-primary' : 'text-zen-peach')} />
                <span className="text-sm font-medium">Non-Vegetarian</span>
              </button>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 py-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
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

export default SetupHealth;
