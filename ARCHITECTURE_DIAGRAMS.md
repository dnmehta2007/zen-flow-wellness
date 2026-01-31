# Camera Feature Architecture & Data Flow

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      ZEN FLOW WELLNESS APP                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   SETUP FLOW                             │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │ SetupBasics → SetupGoals → SetupHealth → SetupPref.     │   │
│  │                                              ↓            │   │
│  │                        ┌─────────────────────────┐       │   │
│  │                        │  Camera Feedback Toggle │       │   │
│  │                        │  [    Enable    ]       │       │   │
│  │                        └────────────┬────────────┘       │   │
│  │                                     ↓                     │   │
│  │                     Save to UserProfile                  │   │
│  │                (cameraFeedbackEnabled: boolean)          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              SESSION FLOW (YOGA/MEDITATION)             │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  Session.tsx                                             │   │
│  │  ├─ Load config & poses                                 │   │
│  │  ├─ Check cameraFeedbackEnabled                         │   │
│  │  │  │                                                    │   │
│  │  │  ├─ YES → Show Camera Toggle                         │   │
│  │  │  │  │                                                │   │
│  │  │  │  └─ User Toggles → <CameraFeedback />            │   │
│  │  │  │                                                    │   │
│  │  │  └─ NO → Hide Camera Toggle                          │   │
│  │  │                                                       │   │
│  │  └─ Session Controls (Play, Pause, etc.)               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           CAMERA FEEDBACK COMPONENT                      │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  CameraFeedback.tsx                                      │   │
│  │  ├─ Request Camera Permission (getUserMedia)           │   │
│  │  ├─ Initialize Video Stream                            │   │
│  │  ├─ Capture Frame Every 500ms                          │   │
│  │  │  │                                                    │   │
│  │  │  └─> Canvas.drawImage(video)                        │   │
│  │  │      ↓                                                │   │
│  │  └─ Call analyzePosture()                              │   │
│  │      ↓                                                   │   │
│  │      Display: Score, Issues, Suggestions               │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           POSTURE ANALYSIS ENGINE                        │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  posture.ts                                              │   │
│  │  ├─ analyzePosture(canvas, poseName)                   │   │
│  │  │  ├─ getImageData() from canvas                      │   │
│  │  │  ├─ Calculate brightness/metrics                    │   │
│  │  │  ├─ Determine alignment: good|fair|needs-improve   │   │
│  │  │  └─ Generate issues & suggestions                   │   │
│  │  │                                                       │   │
│  │  ├─ detectKeypoints(canvas)                            │   │
│  │  │  └─ Return simulated/detected keypoints             │   │
│  │  │                                                       │   │
│  │  ├─ calculateAlignmentScore(keypoints)                 │   │
│  │  │  └─ Return 0-100 alignment score                    │   │
│  │  │                                                       │   │
│  │  └─ getPoseSpecificFeedback(poseName)                  │   │
│  │     └─ Return pose-specific tips & guidance            │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            POSTURE FEEDBACK OUTPUT                       │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  PostureFeedback {                                       │   │
│  │    score: 0-100,           ← Alignment percentage       │   │
│  │    alignment: 'good'|'fair'|'needs-improvement',       │   │
│  │    issues: [],            ← Current problems            │   │
│  │    suggestions: []         ← Improvement tips           │   │
│  │  }                                                        │   │
│  │      ↓                                                    │   │
│  │  Display in CameraFeedback UI                          │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Real-Time Processing Loop

```
┌─────────────────────────────────────────────────────────────┐
│                  REAL-TIME ANALYSIS CYCLE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  interval = setInterval(() => {                            │
│    ┌──────────────────────────────────────┐                │
│    │ 1. Capture Frame from Video Stream   │                │
│    │    video.readyState === HAVE_ENOUGH  │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 2. Draw to Canvas                    │                │
│    │    canvas.drawImage(video, 0, 0)     │                │
│    │    (with mirror transform)           │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 3. Analyze Posture                   │                │
│    │    analyzePosture(canvas, poseName)  │                │
│    │    - Get image data                  │                │
│    │    - Calculate metrics               │                │
│    │    - Score alignment                 │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 4. Detect Keypoints                  │                │
│    │    detectKeypoints(canvas)           │                │
│    │    - Return body keypoints           │                │
│    │    - Include confidence scores       │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 5. Calculate Score                   │                │
│    │    calculateAlignmentScore(...)      │                │
│    │    - Analyze keypoint confidence     │                │
│    │    - Return 0-100 score              │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 6. Generate Feedback                 │                │
│    │    PostureFeedback {                 │                │
│    │      score,                          │                │
│    │      alignment,                      │                │
│    │      issues,                         │                │
│    │      suggestions                     │                │
│    │    }                                 │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 7. Update UI                         │                │
│    │    setFeedback(feedback)             │                │
│    │    Call onFeedback callback          │                │
│    │    Re-render component               │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│    ┌──────────────────────────────────────┐                │
│    │ 8. Draw Visualization                │                │
│    │    Draw keypoints on canvas          │                │
│    │    Draw alignment score              │                │
│    │    Update progress bars              │                │
│    └──────────────────┬───────────────────┘                │
│                       ↓                                     │
│  }, 500);  ← Every 500ms (2 FPS)                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎬 User Journey

```
START
  │
  ├─ User Launches App
  │  │
  │  ├─ Landing Page
  │  │  │
  │  └─> Click "Get Started"
  │     │
  │     ├─ Setup: Basics
  │     │  ├─ Name, Age, Gender
  │     │  │
  │     ├─ Setup: Goals
  │     │  ├─ Select primary goal
  │     │  │
  │     ├─ Setup: Health
  │     │  ├─ Health issues
  │     │  │
  │     ├─ Setup: PREFERENCES ← NEW
  │     │  ├─ Duration preference
  │     │  ├─ Soundscapes toggle
  │     │  ├─ Meditation prompt toggle
  │     │  ├─ CAMERA FEEDBACK TOGGLE ✨
  │     │  │  │
  │     │  │  ├─ If YES → cameraFeedbackEnabled = true
  │     │  │  └─ If NO  → cameraFeedbackEnabled = false
  │     │  │
  │     │  └─> Click "Start Journey"
  │     │     │
  │     └──> Home Page
  │        │
  │        ├─ Click "Quick Start" or "Routines"
  │        │  │
  │        └─> SESSION PAGE ← NEW FEATURE
  │           │
  │           ├─ Load yoga poses
  │           │  │
  │           ├─ Check user profile
  │           │  │
  │           ├─ If cameraFeedbackEnabled = true
  │           │  │  ✓ Show Camera Toggle
  │           │  │
  │           └─ Session Controls
  │              ├─ Play/Pause
  │              ├─ Sound toggle
  │              ├─ 3D toggle
  │              ├─ CAMERA TOGGLE ✨
  │              │  │
  │              │  ├─ User clicks ON
  │              │  │  │
  │              │  │  ├─ Browser requests camera permission
  │              │  │  │  │
  │              │  │  │  ├─ User grants permission
  │              │  │  │  │  │
  │              │  │  │  │  ├─ Initialize video stream
  │              │  │  │  │  ├─ Start analysis loop
  │              │  │  │  │  ├─ Display real-time feedback
  │              │  │  │  │  │  • Alignment score
  │              │  │  │  │  │  • Issues detected
  │              │  │  │  │  │  • Tips for improvement
  │              │  │  │  │  │
  │              │  │  │  │  └─ User adjusts posture
  │              │  │  │  │     Feedback updates in real-time
  │              │  │  │  │
  │              │  │  │  └─ User denies permission
  │              │  │  │     Display error message
  │              │  │  │
  │              │  │  └─ User clicks OFF
  │              │  │     Stop video stream
  │              │  │     Clear feedback display
  │              │  │
  │              │  └─ Continue with session...
  │              │
  │              └─ Complete Session
  │                 │
  │                 └─> Session Summary
  │                    Stats, Time, Poses Completed
  │
  └─ END

```

---

## 📱 Component Hierarchy

```
App
├── Landing
├── Setup Flow
│   ├── SetupBasics
│   ├── SetupGoals
│   ├── SetupHealth
│   └── SetupPreferences ← Camera Toggle Added
│
├── Home
├── QuickStart
│
├── Session ← Camera Integration
│   ├── Header
│   │   ├─ Back button
│   │   ├─ Pose counter
│   │   └─ Close button
│   │
│   ├── Progress bar
│   │
│   ├── Main Content
│   │   ├─ Break View (timer)
│   │   │
│   │   └─ Pose View
│   │       ├─ CameraFeedback ✨ (NEW)
│   │       │   ├─ Video stream
│   │       │   ├─ Alignment score
│   │       │   ├─ Issues display
│   │       │   └─ Suggestions display
│   │       │
│   │       ├─ Pose Image Card
│   │       ├─ Timer Display
│   │       ├─ Pose Info Card
│   │       │   ├─ Name
│   │       │   ├─ Stretches
│   │       │   └─ Benefits
│   │       │
│   │       └─ Controls Section
│   │           ├─ Playback Controls
│   │           │   ├─ Previous
│   │           │   ├─ Play/Pause
│   │           │   └─ Next
│   │           │
│   │           ├─ Toggle Options
│   │           │   ├─ Sound toggle
│   │           │   ├─ 3D toggle
│   │           │   └─ Camera toggle ✨ (only if enabled)
│   │           │
│   │           └─ End Session button
│   │
│   └── Footer
│
├── SessionSummary
├── Meditation
├── Routines
├── Progress
├── Diet
└── NotFound
```

---

## 🔌 State Management Flow

```
┌─────────────────────────────────────────────────────┐
│           USER PROFILE (localStorage)               │
├─────────────────────────────────────────────────────┤
│ {                                                   │
│   name: string                                      │
│   age: number                                       │
│   gender: string                                    │
│   primaryGoal: string                               │
│   healthIssues: string[]                            │
│   diet: string                                      │
│   preferredDuration: number                         │
│   soundscapesEnabled: boolean                       │
│   meditationPromptEnabled: boolean                  │
│   cameraFeedbackEnabled: boolean ← NEW              │
│   setupComplete: boolean                            │
│ }                                                   │
└────────────┬────────────────────────────────────────┘
             │
             ↓
    getUserProfile()
             │
             ├─> SetupPreferences
             │   └─ Load existing preference
             │   └─ Allow user to change
             │   └─ Save with saveUserProfile()
             │
             ├─> Session.tsx
             │   ├─ Check cameraFeedbackEnabled
             │   ├─ Show/hide camera toggle
             │   └─ Pass to CameraFeedback
             │
             └─> CameraFeedback
                 └─ Use isActive prop
                 └─ Show UI only if active
```

---

## 🎯 Feature Toggle Logic

```
┌─────────────────────────────────────────┐
│  Is Camera Feedback Enabled?            │
└────────────┬────────────────────────────┘
             │
       ┌─────┴─────┐
       │           │
      YES          NO
       │           │
       ↓           ↓
    ┌─────┐    ┌─────┐
    │Show │    │Hide │
    │Cam  │    │Cam  │
    │Tog  │    │Tog  │
    └─┬───┘    └──┬──┘
      │           │
    User        Nothing
    clicks      happens
      │
      ↓
   Toggle ON/OFF
      │
   ┌─┴─┐
   │   │
  ON   OFF
   │   │
   ┌─┘   └─┐
   │       │
   ↓       ↓
Request    Stop
Camera  Stream
Perm    Cleanup
   │
Granted?
   │
┌──┴──┐
│     │
Y      N
│      │
↓      ↓
Show  Error
Feed  Msg
back

```

---

## 📊 Data Structure Relationships

```
┌─────────────────────────────────────────────────────┐
│                   UserProfile                       │
│  ┌───────────────────────────────────────────────┐  │
│  │ cameraFeedbackEnabled: boolean                │  │
│  └────────────────┬────────────────────────────┘  │
│                   │                                 │
│                   └─> Session.tsx                   │
│                       ├─ cameraEnabled state        │
│                       ├─ showCamera state           │
│                       └─ postureFeedback state      │
│                           │                         │
│                           └─> CameraFeedback        │
│                               ├─ isActive prop      │
│                               ├─ poseName prop      │
│                               └─ onFeedback prop    │
│                                   │                 │
│                                   └─> PostureFeedback
│                                       ├─ score      │
│                                       ├─ alignment  │
│                                       ├─ issues     │
│                                       └─ suggestions
│                                                      │
└─────────────────────────────────────────────────────┘

Feedback Loop:
UserProfile
  ↓
Session
  ↓
CameraFeedback
  ↓
analyzePosture()
  ↓
PostureFeedback
  ↓
onFeedback callback
  ↓
setPostureFeedback()
  ↓
UI Update
```

---

## ⏱️ Timing Diagram

```
TIME →
│
0ms    ┌─ User grants camera permission
│      │
│      └─ Initialize video stream
│
100ms  ┌─ setInterval starts
│      │
500ms  ├─ Analysis cycle 1
│      │  ├─ Capture frame
│      │  ├─ Analyze posture
│      │  ├─ Calculate score
│      │  ├─ setFeedback()
│      │  └─ Re-render UI
│      │
1000ms ├─ Analysis cycle 2
│      │  ├─ Capture frame
│      │  ├─ Analyze posture
│      │  └─ Update display
│      │
1500ms ├─ Analysis cycle 3
│      │  └─ (user adjusted posture)
│      │      Score updated: 65% → 78%
│      │
2000ms ├─ Analysis cycle 4
│      │  └─ Continue loop...
│      │
∞      │  (Loop continues until:)
│      │  ├─ User toggles camera OFF
│      │  ├─ Session ends
│      │  └─ Component unmounts
│      │
       └─ Cleanup & resource release
```

---

## 🔐 Permission Flow

```
User Clicks Camera Toggle
        │
        ↓
Is permission already granted?
        │
    ┌───┴───┐
    │       │
   YES      NO
    │       │
    ↓       ↓
Start   Browser shows
Stream  Permission Dialog
 │      │
 │      ├─ "Allow" camera access?
 │      │   ┌────────┬────────┐
 │      │   │        │        │
 │      │   Y        N       Dismiss
 │      │   │        │        │
 │      │   ↓        ↓        ↓
 │      │  Grant   Deny    Dismiss
 │      │   │        │        │
 │      └──→│        └────────┘
 │         │
 ↓         ↓
Initialize Show
Stream   Error
 │
 ├─ Start Analysis Loop
 │
 ├─ Display Video Feed
 │
 └─ Show Feedback
```

---

**Last Updated**: January 31, 2026  
**Version**: 1.0  
**Status**: Production Ready ✅
