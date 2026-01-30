import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Trophy, Clock, Target, CheckCircle, Home, Flame, Sparkles 
} from 'lucide-react';
import { recordSession, getProgress } from '@/lib/store';
import confetti from '@/lib/confetti';

interface SessionSummary {
  duration: number;
  goal: string;
  posesCompleted: number;
  totalPoses: number;
  type: 'yoga' | 'meditation';
}

const SessionSummary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem('sessionSummary');
    if (stored) {
      const data: SessionSummary = JSON.parse(stored);
      setSummary(data);
      
      // Record the session
      recordSession({
        date: new Date().toISOString(),
        duration: data.duration,
        goal: data.goal,
        type: data.type,
        posesCompleted: data.posesCompleted,
        totalPoses: data.totalPoses,
      });
      
      // Get updated streak
      const progress = getProgress();
      setStreak(progress.currentStreak);
      
      // Trigger confetti
      confetti();
      
      // Cleanup
      sessionStorage.removeItem('sessionSummary');
      sessionStorage.removeItem('currentSession');
    } else {
      navigate('/home');
    }
  }, [navigate]);

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const completionRate = summary.totalPoses > 0 
    ? Math.round((summary.posesCompleted / summary.totalPoses) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md animate-slide-up">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zen-sage/20 mb-4 animate-breathe">
            <Trophy className="w-12 h-12 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">
            {summary.type === 'meditation' ? 'Mindful Moment' : 'Session Complete!'}
          </h1>
          <p className="text-muted-foreground">
            Great job staying committed to your practice!
          </p>
        </div>

        {/* Streak celebration */}
        {streak > 0 && (
          <Card className="glass-card mb-6 overflow-hidden">
            <CardContent className="p-4 text-center bg-gradient-to-r from-orange-100 to-yellow-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-6 h-6 text-orange-500 animate-fire" />
                <span className="text-2xl font-bold">{streak} Day Streak!</span>
                <Flame className="w-6 h-6 text-orange-500 animate-fire" />
              </div>
              <p className="text-sm text-muted-foreground">Keep up the amazing work!</p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Duration</span>
              </div>
              <span className="font-bold">{summary.duration} min</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Focus</span>
              </div>
              <span className="font-bold">{summary.goal}</span>
            </div>
            
            {summary.type === 'yoga' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Poses</span>
                </div>
                <span className="font-bold">
                  {summary.posesCompleted}/{summary.totalPoses}
                  <span className="text-sm text-muted-foreground ml-1">({completionRate}%)</span>
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Encouragement */}
        <div className="p-4 rounded-xl bg-zen-lavender-light border border-zen-lavender/30 mb-6 text-center">
          <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-sm">
            {completionRate === 100 
              ? "Perfect session! You're building a powerful habit."
              : "Every minute counts. You showed up for yourself today!"}
          </p>
        </div>

        {/* Return home button */}
        <Button
          onClick={() => navigate('/home')}
          className="w-full h-14 bg-gradient-zen text-primary-foreground shadow-zen-lg hover:shadow-zen-glow transition-all duration-300 rounded-xl text-lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default SessionSummary;
