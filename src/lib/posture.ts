// Posture detection and feedback system

export interface PostureFeedback {
  score: number; // 0-100
  alignment: 'good' | 'fair' | 'needs-improvement';
  issues: string[];
  suggestions: string[];
}

export interface BodyKeypoint {
  name: string;
  x: number;
  y: number;
  confidence: number;
}

/**
 * Analyzes body posture from canvas data (simulated pose detection)
 * In a production app, this would use TensorFlow.js with PoseNet or BlazePose models
 */
export function analyzePosture(
  canvas: HTMLCanvasElement,
  targetPose: string
): PostureFeedback {
  // Simulated posture analysis
  // In production, this would use machine learning models like:
  // - TensorFlow.js PoseNet
  // - MediaPipe Pose
  // - OpenPose
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      score: 0,
      alignment: 'needs-improvement',
      issues: ['Unable to access camera'],
      suggestions: ['Please check camera permissions'],
    };
  }

  // Simulate posture scoring based on image data
  // In production, extract keypoints and analyze joint angles
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Calculate brightness/motion as simple metric
  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  const avgBrightness = totalBrightness / (data.length / 4);
  
  // Simulate score based on simple metrics
  let score = Math.min(100, Math.round((avgBrightness / 255) * 100 + 20));
  
  // Add randomness for demo purposes
  score = Math.min(100, Math.max(0, score + Math.random() * 30 - 15));

  const issues: string[] = [];
  const suggestions: string[] = [];
  let alignment: 'good' | 'fair' | 'needs-improvement' = 'needs-improvement';

  if (score >= 75) {
    alignment = 'good';
    suggestions.push('Excellent alignment! Keep it up.');
    suggestions.push('Maintain your current posture.');
  } else if (score >= 55) {
    alignment = 'fair';
    issues.push('Slight misalignment detected');
    suggestions.push('Adjust your shoulders slightly.');
    suggestions.push('Ensure your spine is neutral.');
  } else {
    alignment = 'needs-improvement';
    issues.push('Significant posture correction needed');
    issues.push('Body positioning is off target');
    suggestions.push('Reference the pose image more carefully.');
    suggestions.push('Align your shoulders with your hips.');
    suggestions.push('Keep your core engaged.');
  }

  // Add pose-specific feedback
  const postureFeedback = getPoseSpecificFeedback(targetPose, alignment);
  suggestions.push(...postureFeedback.suggestions);
  if (postureFeedback.issues) {
    issues.push(...postureFeedback.issues);
  }

  return {
    score: Math.round(score),
    alignment,
    issues,
    suggestions,
  };
}

interface PoseFeedback {
  suggestions: string[];
  issues?: string[];
}

/**
 * Returns pose-specific feedback and corrections
 */
function getPoseSpecificFeedback(pose: string, alignment: string): PoseFeedback {
  const poseUppercase = pose.toUpperCase().replace(/\s+/g, '_');
  
  const feedbackMap: Record<string, PoseFeedback> = {
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
    WARRIOR_I: {
      suggestions: [
        'Square your hips forward',
        'Root your front foot into the mat',
        'Lift your chest and lengthen your spine',
        'Keep your back heel grounded',
      ],
    },
    TREE_POSE: {
      suggestions: [
        'Engage your standing leg for stability',
        'Place your foot firmly on your inner thigh',
        'Keep your hips level and facing forward',
        'Extend your arms overhead for balance',
      ],
    },
    MOUNTAIN_POSE: {
      suggestions: [
        'Ground all four corners of your feet',
        'Engage your thigh muscles',
        'Keep your spine neutral and tall',
        'Relax your shoulders down and back',
      ],
    },
    CORPSE_POSE: {
      suggestions: [
        'Let your feet fall naturally to the sides',
        'Keep your arms relaxed at your sides',
        'Relax your entire body completely',
        'Focus on your breath and relaxation',
      ],
    },
  };

  return (
    feedbackMap[poseUppercase] || {
      suggestions: [
        'Focus on maintaining proper alignment',
        'Engage the relevant muscle groups',
        'Keep your breathing steady and controlled',
      ],
    }
  );
}

/**
 * Simulates detecting keypoints from canvas
 * In production, use TensorFlow.js or MediaPipe
 */
export function detectKeypoints(canvas: HTMLCanvasElement): BodyKeypoint[] {
  // This is a placeholder for actual keypoint detection
  // Real implementation would use MediaPipe or TensorFlow.js
  // to extract 17-33 body keypoints with confidence scores
  
  const keypoints: BodyKeypoint[] = [
    { name: 'nose', x: 0.5, y: 0.2, confidence: 0.95 },
    { name: 'left_shoulder', x: 0.35, y: 0.4, confidence: 0.9 },
    { name: 'right_shoulder', x: 0.65, y: 0.4, confidence: 0.9 },
    { name: 'left_hip', x: 0.35, y: 0.6, confidence: 0.85 },
    { name: 'right_hip', x: 0.65, y: 0.6, confidence: 0.85 },
    { name: 'left_knee', x: 0.35, y: 0.75, confidence: 0.85 },
    { name: 'right_knee', x: 0.65, y: 0.75, confidence: 0.85 },
    { name: 'left_ankle', x: 0.35, y: 0.95, confidence: 0.8 },
    { name: 'right_ankle', x: 0.65, y: 0.95, confidence: 0.8 },
  ];

  return keypoints;
}

/**
 * Calculates alignment score based on keypoints (0-100)
 */
export function calculateAlignmentScore(
  keypoints: BodyKeypoint[],
  targetPose: string
): number {
  // Filter keypoints with sufficient confidence
  const reliableKeypoints = keypoints.filter(kp => kp.confidence > 0.5);
  
  if (reliableKeypoints.length < 5) {
    return 0; // Not enough keypoints detected
  }

  // Check for basic alignment (simplified - in production would be more sophisticated)
  let score = 50; // Base score

  // Check if person is relatively centered
  const avgX = reliableKeypoints.reduce((sum, kp) => sum + kp.x, 0) / reliableKeypoints.length;
  if (Math.abs(avgX - 0.5) < 0.15) {
    score += 20; // Centered in frame
  }

  // Check if all keypoints are detected (higher confidence = better alignment)
  const avgConfidence = reliableKeypoints.reduce((sum, kp) => sum + kp.confidence, 0) / reliableKeypoints.length;
  score += Math.round(avgConfidence * 30);

  return Math.min(100, score);
}
