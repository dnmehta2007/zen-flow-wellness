import { useState, useEffect, useRef } from 'react';
import { CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraFeedbackProps {
  isActive: boolean;
  poseName: string;
  onFeedback?: (feedback: any) => void;
}

const CameraFeedback = ({ isActive, poseName, onFeedback }: CameraFeedbackProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializeRef = useRef(false);

  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [alignmentScore, setAlignmentScore] = useState(0);
  const [feedback, setFeedback] = useState('Analyzing...');

  // Request camera access
  useEffect(() => {
    if (!isActive) {
      console.log('CameraFeedback: Not active, cleaning up');
      initializeRef.current = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      return;
    }

    // Only initialize once when isActive becomes true
    if (initializeRef.current) {
      console.log('CameraFeedback: Already initialized, skipping');
      return;
    }

    const initCamera = async () => {
      try {
        setError(null);
        console.log('CameraFeedback: Requesting camera access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 }
          },
          audio: false,
        });

        console.log('CameraFeedback: Got stream:', stream);

        if (videoRef.current) {
          console.log('CameraFeedback: Video ref exists, setting srcObject');
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
          
          // Explicitly play the video
          console.log('CameraFeedback: Calling play()');
          await videoRef.current.play();
          console.log('CameraFeedback: Play succeeded');
          setCameraPermission('granted');
          initializeRef.current = true;
        } else {
          console.error('CameraFeedback: Video ref is null!');
        }
      } catch (err) {
        console.error('CameraFeedback: Error:', err);
        setCameraPermission('denied');
        if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError') {
            setError('Camera permission denied. Please enable camera access in your browser settings.');
          } else if (err.name === 'NotFoundError') {
            setError('No camera found on this device.');
          } else {
            setError('Unable to access camera: ' + err.message);
          }
        } else {
          setError('Unable to access camera: ' + String(err));
        }
      }
    };

    initCamera();

    return () => {
      console.log('CameraFeedback: Cleanup called');
      // Don't stop stream on unmount - only stop if isActive becomes false
    };
  }, [isActive]);

  // Update alignment score periodically
  useEffect(() => {
    if (!isActive || cameraPermission !== 'granted') return;

    const updateScore = () => {
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
    };

    analysisIntervalRef.current = setInterval(updateScore, 500);

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [isActive, cameraPermission]);

  if (cameraPermission === 'denied' || error) {
    return (
      <div className="glass-card rounded-lg overflow-hidden">
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
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Live camera feed - clean, no overlays */}
      <div className="overflow-hidden rounded-lg bg-black aspect-video border border-red-500">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ 
            transform: 'scaleX(-1)',
            display: 'block',
          }}
        />
      </div>
      
      {/* Info cards below camera feed */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
          <div className="text-xs text-muted-foreground">Alignment</div>
          <div className="text-xl font-bold">{alignmentScore}%</div>
        </div>
        <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className={cn('text-xs font-medium mt-1', 
            alignmentScore > 75 ? 'text-green-600' : 
            alignmentScore > 55 ? 'text-yellow-600' : 
            'text-red-600'
          )}>
            {feedback}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
          <div className="text-xs text-muted-foreground">Pose</div>
          <div className="text-xs font-medium mt-1 truncate">{poseName}</div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeedback;
