import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, Play, Pause, X, Volume2, VolumeX, 
  Cloud, Waves, Music, Bell
} from 'lucide-react';
import { getUserProfile } from '@/lib/store';
import { cn } from '@/lib/utils';

const soundscapes = [
  { id: 'rain', label: 'Rain', icon: Cloud, file: '/audio/calming-rain.mp3' },
  { id: 'piano', label: 'Piano', icon: Music, file: '/audio/calming-piano.mp3' },
  { id: 'peaceful', label: 'Peaceful', icon: Waves, file: '/audio/peaceful.mp3' },
  { id: 'bells', label: 'Bells', icon: Bell, file: '/audio/calming-bells.mp3' },
];

const durations = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
];

const Meditation = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const [selectedSound, setSelectedSound] = useState(soundscapes[0]);
  const [soundEnabled, setSoundEnabled] = useState(profile.soundscapesEnabled);

  // Audio setup
  useEffect(() => {
    if (isStarted && soundEnabled) {
      audioRef.current = new Audio(selectedSound.file);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isStarted, soundEnabled, selectedSound]);

  // Timer
  useEffect(() => {
    if (!isStarted || !isPlaying) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isPlaying]);

  const handleStart = () => {
    setTimeRemaining(selectedDuration * 60);
    setIsStarted(true);
    setIsPlaying(true);
  };

  const handleEnd = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    // Play bell at end
    const bell = new Audio('/audio/calming-bells.mp3');
    bell.volume = 0.5;
    bell.play().catch(() => {});
    
    sessionStorage.setItem('sessionSummary', JSON.stringify({
      duration: selectedDuration,
      goal: 'Mindfulness',
      posesCompleted: 0,
      totalPoses: 0,
      type: 'meditation',
    }));
    navigate('/session-summary');
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration * 60 - timeRemaining) / (selectedDuration * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display font-bold">Meditation</h1>
        {isStarted ? (
          <Button variant="ghost" size="icon" onClick={handleEnd}>
            <X className="w-5 h-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {isStarted ? (
        <>
          {/* Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-zen-lavender/30 via-zen-peach/20 to-zen-rose-light/30 opacity-60" />
            <div className="absolute w-96 h-96 rounded-full bg-zen-lavender/10 blur-3xl top-1/4 left-1/4 animate-pulse" />
            <div className="absolute w-96 h-96 rounded-full bg-zen-rose-light/10 blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Progress bar */}
          <div className="px-4 mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-zen transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timer display */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            {/* Breathing circle */}
            <div className="relative mb-8">
              <div className="w-48 h-48 rounded-full bg-zen-lavender/20 flex items-center justify-center animate-breathe">
                <div className="w-36 h-36 rounded-full bg-zen-lavender/30 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-zen-lavender/40" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              Breathe in... Breathe out...
            </p>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="w-12 h-12"
              >
                {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </Button>
              
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-gradient-zen text-primary-foreground shadow-zen-lg"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
              </Button>
              
              <div className="w-12" />
            </div>
          </div>

          {/* End button */}
          <div className="p-6">
            <Button variant="outline" onClick={handleEnd} className="w-full">
              End Session
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 px-6 pb-8 space-y-6">
          {/* Duration selection */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-3">Duration</p>
              <div className="grid grid-cols-4 gap-2">
                {durations.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDuration(d.value)}
                    className={cn(
                      'py-3 rounded-xl border-2 transition-all duration-200',
                      selectedDuration === d.value 
                        ? 'bg-zen-lavender/20 border-zen-lavender' 
                        : 'bg-background/50 border-border hover:border-zen-lavender/50'
                    )}
                  >
                    <span className={cn(
                      'text-sm font-medium',
                      selectedDuration === d.value && 'text-foreground'
                    )}>
                      {d.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Soundscape selection */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-3">Soundscape</p>
              <div className="grid grid-cols-2 gap-3">
                {soundscapes.map((sound) => {
                  const Icon = sound.icon;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => setSelectedSound(sound)}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200',
                        selectedSound.id === sound.id 
                          ? 'bg-zen-sage/20 border-zen-sage' 
                          : 'bg-background/50 border-border hover:border-zen-sage/50'
                      )}
                    >
                      <Icon className={cn(
                        'w-6 h-6',
                        selectedSound.id === sound.id ? 'text-secondary-foreground' : 'text-muted-foreground'
                      )} />
                      <span className="font-medium">{sound.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Start button */}
          <Button
            onClick={handleStart}
            className="w-full h-16 bg-gradient-zen text-primary-foreground shadow-zen-lg hover:shadow-zen-glow transition-all duration-300 rounded-2xl text-lg"
          >
            <Play className="w-6 h-6 mr-3" />
            Begin Meditation
          </Button>
        </div>
      )}
    </div>
  );
};

export default Meditation;
