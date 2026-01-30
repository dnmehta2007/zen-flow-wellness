import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, User, Sparkles } from 'lucide-react';
import { saveUserProfile, getUserProfile } from '@/lib/store';

const SetupBasics = () => {
  const navigate = useNavigate();
  const existingProfile = getUserProfile();
  
  const [name, setName] = useState(existingProfile.name || '');
  const [age, setAge] = useState(existingProfile.age ? String(existingProfile.age) : '');
  const [gender, setGender] = useState(existingProfile.gender || '');

  const handleNext = () => {
    saveUserProfile({
      name: name.trim(),
      age: parseInt(age) || 0,
      gender,
    });
    navigate('/setup/goals');
  };

  const handleSkip = () => {
    saveUserProfile({
      name: '',
      age: 0,
      gender: '',
    });
    navigate('/setup/goals');
  };

  const isValidAge = age === '' || (parseInt(age) > 0 && parseInt(age) < 120);

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <Card className="w-full max-w-md glass-card animate-slide-up">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display">Let's Get Started</CardTitle>
          <CardDescription>Tell us a bit about yourself</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Name input */}
          <div className="space-y-2">
            <Label htmlFor="name">What should we call you?</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          </div>
          
          {/* Age input */}
          <div className="space-y-2">
            <Label htmlFor="age">Your age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={1}
              max={120}
              className={`bg-background/50 border-border/50 focus:border-primary ${!isValidAge ? 'border-destructive' : ''}`}
            />
            {!isValidAge && (
              <p className="text-sm text-destructive">Please enter a valid age</p>
            )}
          </div>
          
          {/* Gender select */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender (optional)</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 py-4">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-muted" />
            <div className="w-3 h-3 rounded-full bg-muted" />
            <div className="w-3 h-3 rounded-full bg-muted" />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleNext}
              disabled={!isValidAge}
              className="w-full bg-gradient-zen text-primary-foreground hover:opacity-90 shadow-zen"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Continue without name
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupBasics;
