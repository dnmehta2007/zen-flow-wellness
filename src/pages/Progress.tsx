import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, Flame, Clock, Calendar, TrendingUp, Award
} from 'lucide-react';
import { getProgress } from '@/lib/store';
import { cn } from '@/lib/utils';
import SessionCharts from '@/components/ui/session-charts';

const Progress = () => {
  const navigate = useNavigate();
  const progress = getProgress();

  // Generate last 30 days
  const getLast30Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const hasSession = progress.sessions.some(s => 
        new Date(s.date).toDateString() === date.toDateString()
      );
      days.push({
        date,
        hasSession,
        isToday: i === 0,
      });
    }
    return days;
  };

  const last30Days = getLast30Days();
  const sessionsThisWeek = progress.sessions.filter(s => {
    const sessionDate = new Date(s.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-display font-bold">Your Progress</h1>
      </div>

      <div className="px-4 pb-8 space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Flame className={cn(
                'w-8 h-8 mx-auto mb-2',
                progress.currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'
              )} />
              <p className="text-3xl font-bold">{progress.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-3xl font-bold">{progress.longestStreak}</p>
              <p className="text-sm text-muted-foreground">Best Streak</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-zen-sage" />
              <p className="text-3xl font-bold">{progress.sessionsCompleted}</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-zen-lavender" />
              <p className="text-3xl font-bold">{progress.totalMinutes}</p>
              <p className="text-sm text-muted-foreground">Total Minutes</p>
            </CardContent>
          </Card>
        </div>

        {/* This week */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">This Week</h3>
              <span className="text-sm text-muted-foreground">{sessionsThisWeek} sessions</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="h-full bg-gradient-zen rounded-full transition-all duration-500"
                style={{ width: `${Math.min((sessionsThisWeek / progress.weeklyGoal) * 100, 100)}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Goal: {sessionsThisWeek}/{progress.weeklyGoal} sessions
            </p>
          </CardContent>
        </Card>

        {/* 30-day calendar */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <h3 className="font-display font-bold mb-4">Last 30 Days</h3>
            <div className="grid grid-cols-7 gap-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-muted-foreground pb-2">
                  {day}
                </div>
              ))}
              {/* Empty cells for alignment */}
              {Array.from({ length: last30Days[0].date.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {last30Days.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    'aspect-square rounded-md flex items-center justify-center text-xs',
                    day.hasSession && 'bg-zen-sage text-secondary-foreground',
                    day.isToday && !day.hasSession && 'border-2 border-primary',
                    !day.hasSession && !day.isToday && 'bg-muted/50'
                  )}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div>
          {/* Session charts: time and count (weekly/monthly) */}
          {
            // Lazy-load the chart component
          }
          <React.Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading charts…</div>}>
            {/* @ts-ignore */}
            <SessionCharts />
          </React.Suspense>
        </div>

        {/* Recent sessions */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <h3 className="font-display font-bold mb-4">Recent Sessions</h3>
            {progress.sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No sessions yet. Start your first session today!
              </p>
            ) : (
              <div className="space-y-3">
                {progress.sessions.slice(-5).reverse().map((session, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        session.type === 'meditation' ? 'bg-zen-lavender/30' : 'bg-zen-sage/30'
                      )}>
                        {session.type === 'meditation' ? '🧘' : '🌿'}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{session.goal}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{session.duration} min</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
