import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import { analyzePosture, detectKeypoints, calculateAlignmentScore, PostureFeedback } from '@/lib/posture';
import { cn } from '@/lib/utils';

interface CameraFeedbackProps {
  isActive: boolean;
  poseName: string;
  onFeedback?: (feedback: PostureFeedback) => void;
}

const CameraFeedback = ({ isActive, poseName, onFeedback }: CameraFeedbackProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initAttemptedRef = useRef(false);

  const [feedback, setFeedback] = useState<PostureFeedback | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request camera access - only run once per activation
  useEffect(() => {
    if (!isActive || initAttemptedRef.current) {
      console.log('Skipping camera init. isActive:', isActive, 'initAttempted:', initAttemptedRef.current);
      return;
    }

    initAttemptedRef.current = true;

    const initCamera = async () => {
      try {
        setError(null);
        console.log('Requesting camera access...');
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            frameRate: { ideal: 30, max: 60 },
            aspectRatio: { ideal: 16 / 9 }
          },
          audio: false,
        });

        console.log('Camera stream received:', stream);

        if (videoRef.current) {
          // Explicitly set video element properties
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          
          // Add event listeners for debugging
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded:', videoRef.current?.videoWidth, videoRef.current?.videoHeight);
            // Update canvas dimensions to match video
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current?.videoWidth || 640;
              canvasRef.current.height = videoRef.current?.videoHeight || 480;
            }
          };

          videoRef.current.onplay = () => {
            console.log('Video is now playing');
            setCameraPermission('granted');
            setIsAnalyzing(true);
          };

          videoRef.current.onerror = (e) => {
            console.error('Video error:', e);
            setError('Error playing video stream');
          };

          streamRef.current = stream;
          
          // Attempt to play
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Video playback started');
              })
              .catch((err) => {
                console.error('Play error:', err);
                setError(`Playback error: ${err.message}`);
              });
          }
        }
      } catch (err) {
        console.error('Camera init error:', err);
        setCameraPermission('denied');
        if (err instanceof DOMException) {
          if (err.name === 'NotAllowedError') {
            setError('Camera permission denied. Please enable camera access in your browser settings.');
          } else if (err.name === 'NotFoundError') {
            setError('No camera found on this device.');
          } else {
            setError(`Camera error: ${err.message}`);
          }
        } else {
          setError('Unable to access camera.');
        }
        setIsAnalyzing(false);
      }
    };

    initCamera();
  }, [isActive]);

  // Stop camera when isActive becomes false
  useEffect(() => {
    if (isActive) return;

    console.log('Deactivating camera');
    initAttemptedRef.current = false;
    
    if (streamRef.current) {
      console.log('Stopping camera stream...');
      streamRef.current.getTracks().forEach(track => {
        console.log('Stopping track:', track.kind);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    setIsAnalyzing(false);
    setCameraPermission('pending');
  }, [isActive]);

  // Analyze posture periodically
  useEffect(() => {
    if (!isAnalyzing || !videoRef.current || !canvasRef.current) return;

    const analyzeFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // readyState: 0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA
      if (!video || !canvas || video.readyState < 4) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Mirror the video horizontally for selfie view
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();
      
      // Ensure crisp rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Analyze posture
      const postureFeedback = analyzePosture(canvas, poseName);
      setFeedback(postureFeedback);

      // Detect keypoints
      const keypoints = detectKeypoints(canvas);
      const alignmentScore = calculateAlignmentScore(keypoints, poseName);

      // Call callback if provided
      if (onFeedback) {
        onFeedback({
          ...postureFeedback,
          score: alignmentScore,
        });
      }

      // Draw visualization on canvas
      drawVisualization(canvas, keypoints, alignmentScore);
    };

    analysisIntervalRef.current = setInterval(analyzeFrame, 500);

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [isAnalyzing, poseName, onFeedback]);

  // Draw keypoints and skeleton on canvas
  const drawVisualization = (
    canvas: HTMLCanvasElement,
    keypoints: Array<{ x: number; y: number; name: string; confidence: number }>,
    score: number
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw keypoints
    keypoints.forEach(kp => {
      const x = kp.x * canvas.width;
      const y = kp.y * canvas.height;

      // Draw circle for keypoint
      ctx.fillStyle = score > 75 ? '#22c55e' : score > 55 ? '#eab308' : '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw score text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`Alignment: ${score}%`, 10, 30);
  };

  if (!isActive) {
    return null;
  }

  if (cameraPermission === 'denied') {
    return (
      <Card className="glass-card border-red-200/50 bg-red-50/10 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Camera Access Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80">
            {error || 'Please enable camera access in your browser settings to use posture feedback.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card mb-4 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Real-Time Posture Feedback</span>
          {feedback && (
            <div className="flex items-center gap-2">
              {feedback.alignment === 'good' && (
                <Badge variant="default" className="bg-green-500/80">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Good Form
                </Badge>
              )}
              {feedback.alignment === 'fair' && (
                <Badge variant="default" className="bg-yellow-500/80">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Adjust
                </Badge>
              )}
              {feedback.alignment === 'needs-improvement' && (
                <Badge variant="default" className="bg-red-500/80">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Correction Needed
                </Badge>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video feed */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            controls={false}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              display: 'block',
              imageRendering: 'auto',
              WebkitTransform: 'scaleX(-1)'
            }}
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="hidden"
          />

          {/* Overlay indicators */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
              <div className={cn(
                'w-2 h-2 rounded-full',
                feedback?.alignment === 'good' ? 'bg-green-500' :
                feedback?.alignment === 'fair' ? 'bg-yellow-500' :
                'bg-red-500'
              )} />
              <span className="text-xs text-white">{feedback?.score || 0}%</span>
            </div>
          </div>

          {/* Alignment indicator */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
              {poseName}
            </span>
            <div className="flex gap-1">
              {feedback?.issues && feedback.issues.length > 0 && (
                <div className="flex items-center gap-1 bg-red-500/70 px-2 py-1 rounded text-xs text-white">
                  <AlertCircle className="w-3 h-3" />
                  {feedback.issues.length}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback display */}
        {feedback && (
          <div className="space-y-3">
            {/* Issues */}
            {feedback.issues.length > 0 && (
              <div className="bg-red-50/50 border border-red-200/50 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Areas to Improve
                </p>
                <ul className="text-xs text-red-700 space-y-1">
                  {feedback.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {feedback.suggestions.length > 0 && (
              <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Tips for Better Form
                </p>
                <ul className="text-xs text-blue-700 space-y-1">
                  {feedback.suggestions.slice(0, 3).map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Score visualization */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">Alignment Score</span>
                <span className={cn(
                  'text-lg font-bold',
                  feedback.score >= 75 ? 'text-green-600' :
                  feedback.score >= 55 ? 'text-yellow-600' :
                  'text-red-600'
                )}>
                  {feedback.score}%
                </span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    feedback.score >= 75 ? 'bg-green-500' :
                    feedback.score >= 55 ? 'bg-yellow-500' :
                    'bg-red-500'
                  )}
                  style={{ width: `${feedback.score}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CameraFeedback;
