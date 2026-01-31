import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraFeedbackProps {
  isActive: boolean;
  poseName: string;
  onFeedback?: (feedback: any) => void;
}

const CameraFeedback = ({ isActive, poseName, onFeedback }: CameraFeedbackProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alignmentScore, setAlignmentScore] = useState(0);
  const [feedback, setFeedback] = useState('Analyzing...');

  // Request camera access
  useEffect(() => {
    if (!isActive) return;

    const initCamera = async () => {
      try {
        setError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 }
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCameraPermission('granted');
          setIsAnalyzing(true);
        }
      } catch (err) {
        setCameraPermission('denied');
        if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError') {
            setError('Camera permission denied. Please enable camera access in your browser settings.');
          } else if (err.name === 'NotFoundError') {
            setError('No camera found on this device.');
          } else {
            setError('Unable to access camera.');
          }
        }
        setIsAnalyzing(false);
      }
    };

    if (isActive && cameraPermission === 'pending') {
      initCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive, cameraPermission]);

  // Analyze and draw on canvas periodically
  useEffect(() => {
    if (!isAnalyzing || !videoRef.current || !canvasRef.current) return;

    const analyzeFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw video frame on canvas (mirrored for selfie view)
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();

      // Generate dummy alignment score (changes slightly each frame)
      const newScore = Math.max(0, Math.min(100, 65 + Math.random() * 30 - 15));
      setAlignmentScore(Math.round(newScore));

      // Set feedback based on score
      if (newScore > 75) {
        setFeedback('Perfect! Keep it up');
      } else if (newScore > 55) {
        setFeedback('Good, adjust slightly');
      } else {
        setFeedback('Realign your body');
      }

      // Draw overlay UI on canvas
      drawOverlay(ctx, canvas, Math.round(newScore));
    };

    analysisIntervalRef.current = setInterval(analyzeFrame, 500);

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [isAnalyzing]);

  // Draw overlay info on canvas
  const drawOverlay = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    score: number
  ) => {
    // Draw semi-transparent overlay for text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, 60);

    // Draw alignment score text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`Alignment: ${score}%`, 15, 40);

    // Draw colored border based on alignment
    const borderColor = score > 75 ? '#22c55e' : score > 55 ? '#eab308' : '#ef4444';
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  };

  if (cameraPermission === 'denied' || error) {
    return (
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Camera Access Required</p>
              <p className="text-sm text-muted-foreground mt-1">
                {error || 'Please enable camera access in your browser settings to use posture feedback.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-lg bg-black aspect-video">
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="w-full h-full"
        />
        <video
          ref={videoRef}
          className="hidden"
          autoPlay
          playsInline
          muted
        />
      </div>
      
      {/* Feedback info below video */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
          <div className="text-sm text-muted-foreground">Alignment</div>
          <div className="text-2xl font-bold">{alignmentScore}%</div>
        </div>
        <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
          <div className="text-sm text-muted-foreground">Feedback</div>
          <div className={cn('text-xs font-medium mt-1', 
            alignmentScore > 75 ? 'text-green-600' : 
            alignmentScore > 55 ? 'text-yellow-600' : 
            'text-red-600'
          )}>
            {feedback}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
          <div className="text-sm text-muted-foreground">Pose</div>
          <div className="text-xs font-medium mt-1 truncate">{poseName}</div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeedback;
