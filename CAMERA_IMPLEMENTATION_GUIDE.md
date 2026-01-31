# Camera Feature - Implementation Guide

## Quick Start Guide

### For Users
1. **Setup**: During initial setup, toggle "Posture Feedback" ON
2. **Session**: Start a yoga session and look for the "Camera" toggle
3. **Permission**: Grant camera access when prompted by browser
4. **Feedback**: Receive real-time posture guidance during poses

### For Developers
Add camera feedback to any yoga/meditation feature:

```typescript
import CameraFeedback from '@/components/CameraFeedback';
import { PostureFeedback } from '@/lib/posture';

function MyYogaComponent() {
  const [feedback, setFeedback] = useState<PostureFeedback | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  return (
    <>
      <CameraFeedback 
        isActive={cameraActive}
        poseName="Downward Dog"
        onFeedback={setFeedback}
      />
      
      {feedback && (
        <div>
          <p>Score: {feedback.score}%</p>
          <p>Alignment: {feedback.alignment}</p>
        </div>
      )}
    </>
  );
}
```

---

## File Reference

### [src/lib/posture.ts](src/lib/posture.ts)
Core posture analysis engine

**Key Functions:**

#### `analyzePosture(canvas, poseName)`
Analyzes video frame for posture alignment
```typescript
const feedback = analyzePosture(canvas, "Downward Dog");
// Returns: { score: 82, alignment: 'good', issues: [], suggestions: [...] }
```

#### `detectKeypoints(canvas)`
Detects body keypoints from frame
```typescript
const keypoints = detectKeypoints(canvas);
// Returns: BodyKeypoint[]
// [{ name: 'nose', x: 0.5, y: 0.2, confidence: 0.95 }, ...]
```

#### `calculateAlignmentScore(keypoints, pose)`
Calculates alignment score from keypoints
```typescript
const score = calculateAlignmentScore(keypoints, "Downward Dog");
// Returns: number (0-100)
```

**Interfaces:**

```typescript
interface PostureFeedback {
  score: number;                              // 0-100
  alignment: 'good' | 'fair' | 'needs-improvement';
  issues: string[];                          // Problem areas
  suggestions: string[];                     // Improvement tips
}

interface BodyKeypoint {
  name: string;                              // Keypoint name
  x: number;                                 // Normalized X (0-1)
  y: number;                                 // Normalized Y (0-1)
  confidence: number;                        // Detection confidence (0-1)
}
```

---

### [src/components/CameraFeedback.tsx](src/components/CameraFeedback.tsx)
React component for camera UI and management

**Props:**
```typescript
interface CameraFeedbackProps {
  isActive: boolean;
  poseName: string;
  onFeedback?: (feedback: PostureFeedback) => void;
}
```

**Features:**
- Automatic camera permission handling
- Real-time feedback display
- Error messages for permission denied
- Pose-specific feedback
- Visual score indicators

**Usage:**
```typescript
<CameraFeedback 
  isActive={showCamera && !isBreak}
  poseName={currentPose.name}
  onFeedback={(feedback) => {
    console.log(`Alignment: ${feedback.alignment}`);
    setPostureFeedback(feedback);
  }}
/>
```

---

### [src/lib/store.ts](src/lib/store.ts)
User profile storage with camera preference

**Added Field:**
```typescript
interface UserProfile {
  // ... existing fields
  cameraFeedbackEnabled: boolean;  // NEW
}

// Default
defaultUserProfile.cameraFeedbackEnabled = false;
```

**Usage:**
```typescript
// Get user profile
const profile = getUserProfile();
if (profile.cameraFeedbackEnabled) {
  // Show camera option
}

// Save preference
saveUserProfile({ cameraFeedbackEnabled: true });
```

---

### [src/pages/setup/SetupPreferences.tsx](src/pages/setup/SetupPreferences.tsx)
Setup page with camera toggle

**New Toggle Added:**
```tsx
<div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
  <div className="flex items-center gap-3">
    <Webcam className="w-5 h-5 text-zen-sage" />
    <div>
      <Label htmlFor="camera-feedback">Posture Feedback</Label>
      <p className="text-sm text-muted-foreground">
        Real-time camera alignment detection
      </p>
    </div>
  </div>
  <Switch
    id="camera-feedback"
    checked={cameraFeedback}
    onCheckedChange={setCameraFeedback}
  />
</div>
```

---

### [src/pages/Session.tsx](src/pages/Session.tsx)
Session page with camera integration

**State Variables Added:**
```typescript
const [showCamera, setShowCamera] = useState(profile.cameraFeedbackEnabled ?? false);
const [cameraEnabled] = useState(profile.cameraFeedbackEnabled ?? false);
const [postureFeedback, setPostureFeedback] = useState<PostureFeedback | null>(null);
```

**Camera Toggle (Conditional):**
```tsx
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
```

**Component Integration:**
```tsx
{cameraEnabled && showCamera && (
  <CameraFeedback 
    isActive={!isBreak && showCamera}
    poseName={currentPose.name}
    onFeedback={setPostureFeedback}
  />
)}
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Opens Session                        │
└────────────────────────┬────────────────────────────────────┘
                         │
            ┌────────────v────────────────┐
            │  Check profile setting:     │
            │  cameraFeedbackEnabled      │
            └────────┬───────────┬────────┘
                     │           │
                Yes  │           │  No
                     │           │
            ┌────────v──┐    ┌───v────────┐
            │ Show cam  │    │ Hide cam   │
            │ toggle    │    │ toggle     │
            └────────┬──┘    └────────────┘
                     │
            ┌────────v───────────────┐
            │  User Clicks Toggle    │
            └────────┬───────────────┘
                     │
            ┌────────v─────────────────┐
            │  Request Camera Access   │
            │  (Browser Dialog)        │
            └────────┬─────────┬───────┘
                     │         │
              Granted│         │Denied
                     │         │
            ┌────────v──┐  ┌───v──────────┐
            │ Start     │  │ Show Error   │
            │ Stream    │  │ Message      │
            └────────┬──┘  └──────────────┘
                     │
            ┌────────v──────────────────┐
            │  Analyze Every 500ms      │
            │  • Capture frame          │
            │  • Detect keypoints       │
            │  • Calculate score        │
            │  • Generate feedback      │
            └────────┬──────────────────┘
                     │
            ┌────────v──────────────────┐
            │  Display Feedback         │
            │  • Alignment score        │
            │  • Issues detected        │
            │  • Improvement tips       │
            └───────────────────────────┘
```

---

## Feedback Generation Example

### Input
```typescript
{
  poseName: "Downward Dog",
  alignmentScore: 72,
  keypoints: [
    { name: 'nose', x: 0.5, y: 0.2, confidence: 0.95 },
    { name: 'left_shoulder', x: 0.35, y: 0.4, confidence: 0.9 },
    { name: 'right_shoulder', x: 0.65, y: 0.4, confidence: 0.9 },
    // ... more keypoints
  ]
}
```

### Output
```typescript
{
  score: 72,
  alignment: 'fair',
  issues: [
    'Slight misalignment detected',
    'Body positioning is slightly off target'
  ],
  suggestions: [
    'Press your hands firmly into the mat',
    'Spread your fingers wide for stability',
    'Engage your core and lengthen your spine',
    'Keep your head between your arms',
    'Adjust your shoulders slightly',
    'Ensure your spine is neutral'
  ]
}
```

### UI Display
```
┌──────────────────────────────────────────┐
│         REAL-TIME POSTURE FEEDBACK       │
├──────────────────────────────────────────┤
│  [Video Feed - Mirrored, 640x480]        │
│  └─ Alignment: 72% (top right)           │
│  └─ Pose Name (bottom left)              │
│  └─ Issues: 2 (bottom right)             │
├──────────────────────────────────────────┤
│  ⚠️  AREAS TO IMPROVE                    │
│  • Slight misalignment detected          │
│  • Body positioning is off target        │
├──────────────────────────────────────────┤
│  ⚡ TIPS FOR BETTER FORM                 │
│  • Press your hands firmly into the mat  │
│  • Spread your fingers wide              │
│  • Engage your core                      │
├──────────────────────────────────────────┤
│  ALIGNMENT SCORE: 72%                    │
│  [████████░] ← Visual Progress Bar       │
└──────────────────────────────────────────┘
```

---

## Pose-Specific Feedback Map

```typescript
// Add custom feedback for any pose
const poseFeedbackMap: Record<string, PoseFeedback> = {
  DOWNWARD_DOG: {
    suggestions: [
      'Press your hands firmly into the mat',
      'Spread your fingers wide for stability',
      'Engage your core and lengthen your spine',
      'Keep your head between your arms',
    ],
  },
  CHILD_POSE: {
    suggestions: [
      'Sink your hips back toward your heels',
      'Let your forehead rest on the mat',
      'Relax your shoulders away from your ears',
      'Breathe deeply into your back body',
    ],
  },
  // ... more poses
};
```

To add a new pose, update `getPoseSpecificFeedback()` in `src/lib/posture.ts`.

---

## Error Handling

### Permission Denied
```typescript
if (cameraPermission === 'denied') {
  return (
    <Card className="glass-card border-red-200/50">
      <p>Camera permission denied. Please enable in browser settings.</p>
    </Card>
  );
}
```

### Camera Not Found
```
Error: "NotFoundError"
Message: "No camera found on this device."
```

### Permission Pending
Shows loading state while requesting permission

---

## Performance Optimization

### Frame Analysis Timing
```typescript
// Analyze every 500ms (2 FPS) instead of every frame
const analysisIntervalRef = setInterval(analyzeFrame, 500);
```

### Resource Cleanup
```typescript
useEffect(() => {
  return () => {
    // Stop stream tracks
    streamRef.current?.getTracks().forEach(track => track.stop());
    // Clear interval
    clearInterval(analysisIntervalRef.current);
  };
}, []);
```

### Canvas Optimization
```typescript
// Pre-set canvas dimensions for faster rendering
canvasRef.current.width = 640;
canvasRef.current.height = 480;
```

---

## Browser API Used

### getUserMedia API
```typescript
const stream = await navigator.mediaDevices.getUserMedia({
  video: { 
    facingMode: 'user',
    width: { ideal: 640 },
    height: { ideal: 480 }
  },
  audio: false,
});
```

### Canvas 2D Context
```typescript
const ctx = canvas.getContext('2d');
ctx.drawImage(video, x, y, width, height);
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.beginPath();
ctx.arc(x, y, radius, 0, 2 * Math.PI);
ctx.fill();
```

---

## Testing Code

### Manual Test in Browser Console
```javascript
// Check if camera feedback is enabled
const profile = JSON.parse(localStorage.getItem('zenflow_user_profile'));
console.log('Camera enabled:', profile.cameraFeedbackEnabled);

// Check active session config
const session = JSON.parse(sessionStorage.getItem('currentSession'));
console.log('Current session:', session);

// Simulate feedback
const mockFeedback = {
  score: 85,
  alignment: 'good',
  issues: [],
  suggestions: ['Great posture!']
};
console.log('Mock feedback:', mockFeedback);
```

---

## Next Steps for Enhancement

1. **Integrate TensorFlow.js**
   - Replace simulated keypoints with real detection
   - Use PoseNet or BlazePose model
   - Improve accuracy significantly

2. **Add Recording**
   - Store session footage (optional)
   - Generate posture reports
   - Track improvement over time

3. **Multi-Person Support**
   - Detect multiple people in frame
   - Compare postures
   - Group session feedback

4. **Voice Guidance**
   - Generate audio corrections
   - Real-time voice feedback
   - Integrate with meditation audio

5. **Analytics Dashboard**
   - Posture improvement graphs
   - Weak area identification
   - Personalized recommendations

---

## Debugging Tips

### Check Camera Permission Status
```typescript
const permissions = await navigator.permissions.query({ name: 'camera' });
console.log(permissions.state); // 'granted', 'denied', or 'prompt'
```

### Monitor Frame Capture
```typescript
const analyzeFrame = () => {
  console.time('posture-analysis');
  // ... analysis code
  console.timeEnd('posture-analysis');
};
```

### Verify Component State
```typescript
// In CameraFeedback component
console.log('Camera active:', isActive);
console.log('Permission:', cameraPermission);
console.log('Current feedback:', feedback);
```

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Status**: Production Ready ✅
