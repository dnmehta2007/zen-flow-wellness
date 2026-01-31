import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { getProgress } from '@/lib/store';

const formatLabel = (date: Date, isWeekly: boolean) => {
  if (isWeekly) return date.toLocaleDateString('en', { weekday: 'short' }).charAt(0);
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
};

const buildSeries = (sessions: any[], days: number) => {
  const today = new Date();
  const data: { dateKey: string; label: string; minutes: number; sessions: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toDateString();
    const label = formatLabel(date, days <= 7);
    const daySessions = sessions.filter(s => new Date(s.date).toDateString() === key);
    const minutes = daySessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    data.push({ dateKey: key, label, minutes, sessions: daySessions.length });
  }

  return data;
};

const SessionCharts: React.FC = () => {
  const progress = getProgress();
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  const days = view === 'weekly' ? 7 : 30;

  const series = useMemo(() => buildSeries(progress.sessions || [], days), [progress.sessions, days]);

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold">Session Insights</h3>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md text-sm ${view === 'weekly' ? 'bg-zen-sage/20' : 'bg-muted/20'}`}
              onClick={() => setView('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${view === 'monthly' ? 'bg-zen-lavender/20' : 'bg-muted/20'}`}
              onClick={() => setView('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Time Spent Chart */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Time Spent (minutes)</p>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                  <XAxis dataKey="label" tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessions Count Chart */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Sessions Completed</p>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                  <XAxis dataKey="label" tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fill: 'var(--muted-foreground)' }} allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCharts;
