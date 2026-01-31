import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ArrowLeft, Play, Pause, SkipForward, SkipBack, X, 
  Volume2, VolumeX, Camera, Box, Cloud, Waves, Music, Bell
} from 'lucide-react';
import { poses, Pose, get3DModelPath } from '@/lib/poses';
import { getUserProfile } from '@/lib/store';
import { cn } from '@/lib/utils';
import CameraFeedback from '@/components/CameraFeedback';
import VoiceCoach from '@/components/VoiceCoach';
import AutoRotateModel from '@/components/AutoRotateModel';
import { PostureFeedback } from '@/lib/posture';

const soundscapes = [
  { id: 'rain', label: 'Rain', icon: Cloud, file: '/audio/calming-rain.mp3' },
  { id: 'piano', label: 'Piano', icon: Music, file: '/audio/calming-piano.mp3' },
  { id: 'peaceful', label: 'Peaceful', icon: Waves, file: '/audio/peaceful.mp3' },
  { id: 'bells', label: 'Bells', icon: Bell, file: '/audio/calming-bells.mp3' },
  { id: 'zen', label: 'Zen', icon: Cloud, file: '/audio/zen.mp3' },
  { id: 'relaxing-beat', label: 'Relaxing Beat', icon: Music, file: '/audio/relaxing beat.mp3' },
  { id: 'crickets', label: 'Nature Sounds', icon: Waves, file: '/audio/crickets and insects.wav' },
];

interface SessionConfig {
  poses: string[];
  goal: string;
  duration: number;
  difficulty: string;
}

const Session = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [sessionPoses, setSessionPoses] = useState<Pose[]>([]);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(profile.soundscapesEnabled);
<<<<<<< HEAD
  const [selectedSound, setSelectedSound] = useState(soundscapes[2]); // Peaceful by default
  const [showCamera, setShowCamera] = useState(false);
=======
  const [showCamera, setShowCamera] = useState(profile.cameraFeedbackEnabled ?? false);
  const [cameraEnabled] = useState(profile.cameraFeedbackEnabled ?? false);
>>>>>>> refs/remotes/origin/main
  const [show3D, setShow3D] = useState(false);
  const [postureFeedback, setPostureFeedback] = useState<PostureFeedback | null>(null);
  const [cueKey, setCueKey] = useState(0);

  // Load session config
  useEffect(() => {
    const stored = sessionStorage.getItem('currentSession');
    if (stored) {
      const config: SessionConfig = JSON.parse(stored);
      setSessionConfig(config);
      const loadedPoses = config.poses
        .map(id => poses.find(p => p.id === id))
        .filter((p): p is Pose => p !== undefined);
      setSessionPoses(loadedPoses);
      if (loadedPoses.length > 0) {
        setTimeRemaining(loadedPoses[0].duration);
      }
    } else {
      navigate('/quick-start');
    }
  }, [navigate]);

  // Audio setup
  useEffect(() => {
    if (soundEnabled) {
      audioRef.current = new Audio(selectedSound.file);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundEnabled]);

  // Timer logic
  useEffect(() => {
    if (!isPlaying || sessionPoses.length === 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Move to next pose or break
          if (isBreak) {
            setIsBreak(false);
            if (currentPoseIndex < sessionPoses.length - 1) {
              const nextIndex = currentPoseIndex + 1;
              setCurrentPoseIndex(nextIndex);
              return sessionPoses[nextIndex].duration;
            } else {
              // Session complete
              handleEndSession();
              return 0;
            }
          } else {
            // Start break
            if (currentPoseIndex < sessionPoses.length - 1) {
              setIsBreak(true);
              // Play bell sound
              const bell = new Audio('/audio/calming-bells.mp3');
              bell.volume = 0.5;
              bell.play().catch(() => {});
              return 7; // 7 second break
            } else {
              handleEndSession();
              return 0;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentPoseIndex, isBreak, sessionPoses]);

  const handleEndSession = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    // Save session data
    const totalDuration = sessionPoses.reduce((acc, p) => acc + p.duration, 0) / 60;
    sessionStorage.setItem('sessionSummary', JSON.stringify({
      duration: Math.round(totalDuration),
      goal: sessionConfig?.goal || 'General',
      posesCompleted: currentPoseIndex + 1,
      totalPoses: sessionPoses.length,
      type: 'yoga',
    }));
    navigate('/session-summary');
  }, [sessionPoses, sessionConfig, currentPoseIndex, navigate]);

  const handleNextPose = () => {
    if (currentPoseIndex < sessionPoses.length - 1) {
      const nextIndex = currentPoseIndex + 1;
      setCurrentPoseIndex(nextIndex);
      setTimeRemaining(sessionPoses[nextIndex].duration);
      setIsBreak(false);
    } else {
      handleEndSession();
    }
  };

  const handlePrevPose = () => {
    if (currentPoseIndex > 0) {
      const prevIndex = currentPoseIndex - 1;
      setCurrentPoseIndex(prevIndex);
      setTimeRemaining(sessionPoses[prevIndex].duration);
      setIsBreak(false);
    }
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

  const currentPose = sessionPoses[currentPoseIndex];
  const progress = sessionPoses.length > 0 
    ? ((currentPoseIndex + 1) / sessionPoses.length) * 100 
    : 0;

  if (!currentPose) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <p className="text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentPoseIndex + 1} / {sessionPoses.length}
        </span>
        <Button variant="ghost" size="icon" onClick={handleEndSession}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-zen transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        {isBreak ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
            <div className="text-6xl font-bold text-primary mb-4">{timeRemaining}</div>
            <p className="text-xl text-muted-foreground">Take a breath...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Next: {sessionPoses[currentPoseIndex + 1]?.name || 'Complete!'}
            </p>
          </div>
        ) : (
          <>
            {/* Camera Feedback - Shows above pose image if enabled */}
            {cameraEnabled && showCamera && (
              <CameraFeedback 
                isActive={!isBreak && showCamera}
                poseName={currentPose.name}
                onFeedback={setPostureFeedback}
              />
            )}

            {/* Pose image */}
            <Card className="glass-card overflow-hidden mb-4 flex-shrink-0">
              <div className="aspect-video relative">
<<<<<<< HEAD
                {show3D && get3DModelPath(currentPose.id) ? (
                  <video 
                    src={get3DModelPath(currentPose.id)!} 
                    autoPlay 
                    loop 
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {currentPose.image.endsWith('.mp4') || currentPose.image.endsWith('.webm') ? (
                      <video 
                        src={currentPose.image} 
                        autoPlay 
                        loop 
                        muted
                        className="w-full h-full object-cover bg-black"
                      />
                    ) : (
                      <img 
                        src={currentPose.image} 
                        alt={currentPose.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {show3D && !get3DModelPath(currentPose.id) && (
                      <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center">
                        <div className="text-center text-primary-foreground">
                          <Box className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-lg font-medium">More 3D Models Coming Soon!</p>
                          <p className="text-sm opacity-70 mt-1">Currently available: Downward Dog, Reverse Warrior</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {showCamera && (
                  <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center">
                    <div className="text-center text-primary-foreground">
                      <Camera className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-medium">Camera Feature Coming Soon</p>
                      <p className="text-sm opacity-70">Corrective measures will be available</p>
                    </div>
=======
                <img 
                  src={currentPose.image} 
                  alt={currentPose.name}
                  className="w-full h-full object-cover"
                />
                {show3D && (
                  <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center">
                    <AutoRotateModel active={show3D} cueKey={cueKey} />
>>>>>>> refs/remotes/origin/main
                  </div>
                )}
              </div>
            </Card>

            {/* Voice coach: provides audible corrections when camera detects issues */}
            <VoiceCoach
              feedback={postureFeedback}
              enabled={cameraEnabled && showCamera && (profile.voiceCoachEnabled ?? false)}
              onSpeak={() => setCueKey((k) => k + 1)}
              cooldownMs={profile.voiceCooldown ?? 3000}
              volume={profile.voiceVolume ?? 0.9}
              lang={profile.voiceLang ?? 'en-US'}
            />

            {/* Timer */}
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-primary animate-breathe">
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Pose info */}
            <Card className="glass-card mb-4 flex-1 overflow-y-auto">
              <CardContent className="p-4">
                <h2 className="text-xl font-display font-bold mb-1">{currentPose.name}</h2>
                <p className="text-sm text-muted-foreground italic mb-3">{currentPose.sanskritName}</p>
                <p className="text-sm text-foreground/80 mb-4">{currentPose.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Stretches</p>
                    <div className="flex flex-wrap gap-1">
                      {currentPose.stretches.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-zen-sage-light text-xs rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Benefits</p>
                    <div className="flex flex-wrap gap-1">
                      {currentPose.benefits.map((b, i) => (
                        <span key={i} className="px-2 py-1 bg-zen-lavender-light text-xs rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Controls */}
        <div className="space-y-4">
          {/* Playback controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPose}
              disabled={currentPoseIndex === 0}
              className="w-12 h-12 rounded-full"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-zen text-primary-foreground shadow-zen-lg"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPose}
              className="w-12 h-12 rounded-full"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Toggle options */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-toggle">Sound</Label>
                    <Switch
                      id="sound-toggle"
                      checked={soundEnabled}
                      onCheckedChange={setSoundEnabled}
                    />
                  </div>
                  {soundEnabled && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Soundscape</p>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {soundscapes.map((sound) => {
                          const Icon = sound.icon;
                          const isSelected = selectedSound.id === sound.id;
                          return (
                            <button
                              key={sound.id}
                              onClick={() => setSelectedSound(sound)}
                              className={cn(
                                'flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200',
                                isSelected
                                  ? 'bg-primary/20 border-primary'
                                  : 'bg-background/50 border-border hover:border-primary/50'
                              )}
                            >
                              <Icon className="w-5 h-5 mb-1" />
                              <span className="text-xs text-center">{sound.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center gap-2">
              <Switch
                id="3d-toggle"
                checked={show3D}
                onCheckedChange={setShow3D}
              />
              <Label htmlFor="3d-toggle" className="text-xs">3D</Label>
            </div>
            
            {cameraEnabled && (
              <div className="flex items-center gap-2">
                <Switch
                  id="camera-toggle"
                  checked={showCamera}
                  onCheckedChange={setShowCamera}
                />
                <Label htmlFor="camera-toggle" className="text-xs">Camera</Label>
              </div>
            )}
          </div>

          {/* End session button */}
          <Button
            variant="outline"
            onClick={handleEndSession}
            className="w-full"
          >
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Session;
