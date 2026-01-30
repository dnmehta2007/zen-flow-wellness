import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Flame, Play, BookOpen, Brain, TrendingUp, Utensils, 
  ChevronRight, Calendar, Clock, Sparkles
} from 'lucide-react';
import { getUserProfile, getProgress, isSetupComplete } from '@/lib/store';
import { motivationalQuotes } from '@/lib/diet';
import { cn } from '@/lib/utils';

const Home = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  const progress = getProgress();
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const [showMeditationPrompt, setShowMeditationPrompt] = useState(profile.meditationPromptEnabled);

  useEffect(() => {
    if (!isSetupComplete()) {
      navigate('/');
      return;
    }
    // Random quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, [navigate]);

  // Generate week calendar
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }).charAt(0),
        date: date.getDate(),
        isToday: i === 0,
        hasSession: progress.sessions.some(s => 
          new Date(s.date).toDateString() === date.toDateString()
        ),
      });
    }
    return days;
  };

  const weekDays = getWeekDays();
  const greeting = profile.name ? `Welcome back, ${profile.name}!` : 'Welcome back!';

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">{greeting}</h1>
        <p className="text-muted-foreground">Ready to find your zen?</p>
      </div>

      {/* Streak & Calendar Section */}
      <div className="px-6 mb-6">
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Flame className={cn(
                    'w-6 h-6',
                    progress.currentStreak > 0 ? 'text-orange-500 animate-fire' : 'text-muted-foreground'
                  )} />
                  <span className="text-2xl font-bold">{progress.currentStreak}</span>
                </div>
                <span className="text-sm text-muted-foreground">day streak</span>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <span>{progress.sessionsCompleted} sessions</span>
              </div>
            </div>
            
            {/* Mini calendar */}
            <div className="flex justify-between gap-1">
              {weekDays.map((day, i) => (
                <div 
                  key={i}
                  className={cn(
                    'flex flex-col items-center p-2 rounded-lg flex-1 transition-all',
                    day.isToday && 'bg-primary/10',
                    day.hasSession && 'bg-zen-sage/20'
                  )}
                >
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <span className={cn(
                    'text-sm font-medium',
                    day.isToday && 'text-primary',
                    day.hasSession && 'text-secondary-foreground'
                  )}>
                    {day.date}
                  </span>
                  {day.hasSession && (
                    <div className="w-1.5 h-1.5 rounded-full bg-zen-sage mt-1" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Quote */}
      <div className="px-6 mb-6">
        <div className="p-4 rounded-xl bg-zen-lavender-light border border-zen-lavender/30">
          <p className="text-sm italic text-foreground/80">"{quote.quote}"</p>
          <p className="text-xs text-muted-foreground mt-1">— {quote.author}</p>
        </div>
      </div>

      {/* Meditation Prompt */}
      {showMeditationPrompt && (
        <div className="px-6 mb-6 animate-fade-in">
          <Card className="bg-gradient-to-r from-zen-lavender/30 to-zen-rose-light border-zen-lavender/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Try a 5-minute breathing session?</p>
                    <p className="text-sm text-muted-foreground">Start your day mindfully</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowMeditationPrompt(false)}
                  >
                    Later
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate('/meditation')}
                    className="bg-gradient-zen text-primary-foreground"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Start - Primary CTA */}
      <div className="px-6 mb-6">
        <Button
          onClick={() => navigate('/quick-start')}
          className="w-full h-20 bg-gradient-zen text-primary-foreground shadow-zen-lg hover:shadow-zen-glow transition-all duration-300 rounded-2xl text-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-bold">Quick Start</span>
              <span className="block text-sm opacity-80">{profile.preferredDuration} min · {profile.primaryGoal}</span>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto" />
        </Button>
      </div>

      {/* Secondary Actions Grid */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/routines')}
            className="h-24 flex-col gap-2 bg-card/80 hover:bg-zen-sage-light border-zen-sage/30"
          >
            <BookOpen className="w-6 h-6 text-secondary-foreground" />
            <span className="font-medium">Routines</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/meditation')}
            className="h-24 flex-col gap-2 bg-card/80 hover:bg-zen-lavender-light border-zen-lavender/30"
          >
            <Brain className="w-6 h-6 text-foreground" />
            <span className="font-medium">Meditation</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/progress')}
            className="h-24 flex-col gap-2 bg-card/80 hover:bg-zen-peach/20 border-zen-peach/30"
          >
            <TrendingUp className="w-6 h-6 text-accent-foreground" />
            <span className="font-medium">Progress</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/diet')}
            className="h-24 flex-col gap-2 bg-card/80 hover:bg-zen-rose-light border-primary/30"
          >
            <Utensils className="w-6 h-6 text-primary" />
            <span className="font-medium">Diet Plan</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 pb-8">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-around text-center">
              <div>
                <Calendar className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-2xl font-bold">{progress.sessionsCompleted}</p>
                <p className="text-xs text-muted-foreground">Sessions</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-2xl font-bold">{progress.totalMinutes}</p>
                <p className="text-xs text-muted-foreground">Minutes</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <Sparkles className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-2xl font-bold">{progress.longestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
