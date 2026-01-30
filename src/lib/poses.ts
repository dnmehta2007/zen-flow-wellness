// Yoga poses data with placeholder content

import childPose from '@/assets/poses/child-pose.jpg';
import bridgePose from '@/assets/poses/bridge-pose.jpg';
import treePose from '@/assets/poses/tree-pose.jpg';
import cobraPose from '@/assets/poses/cobra-pose.jpg';

export interface Pose {
  id: string;
  name: string;
  sanskritName: string;
  image: string;
  duration: number; // seconds
  description: string;
  stretches: string[];
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

export const poses: Pose[] = [
  {
    id: 'child-pose',
    name: "Child's Pose",
    sanskritName: 'Balasana',
    image: childPose,
    duration: 60,
    description: 'A restful pose that gently stretches the hips, thighs, and ankles while calming the mind.',
    stretches: ['Lower back', 'Hips', 'Thighs', 'Ankles'],
    benefits: ['Reduces stress', 'Calms the mind', 'Relieves back pain', 'Gentle stretch'],
    difficulty: 'beginner',
    goals: ['Stress Relief', 'Flexibility', 'Sleep / Wind-down'],
  },
  {
    id: 'bridge-pose',
    name: 'Bridge Pose',
    sanskritName: 'Setu Bandhasana',
    image: bridgePose,
    duration: 45,
    description: 'A rejuvenating backbend that opens the chest and strengthens the back, glutes, and legs.',
    stretches: ['Chest', 'Neck', 'Spine', 'Hip flexors'],
    benefits: ['Strengthens back', 'Opens chest', 'Calms the brain', 'Reduces anxiety'],
    difficulty: 'intermediate',
    goals: ['Overall Fitness', 'Flexibility', 'Energy Boost'],
  },
  {
    id: 'tree-pose',
    name: 'Tree Pose',
    sanskritName: 'Vrksasana',
    image: treePose,
    duration: 45,
    description: 'A standing balance pose that builds focus, concentration, and strengthens the legs.',
    stretches: ['Thighs', 'Groin', 'Torso', 'Shoulders'],
    benefits: ['Improves balance', 'Strengthens legs', 'Increases focus', 'Builds confidence'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Stress Relief', 'Energy Boost'],
  },
  {
    id: 'cobra-pose',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    image: cobraPose,
    duration: 30,
    description: 'A gentle backbend that strengthens the spine and opens the heart.',
    stretches: ['Chest', 'Lungs', 'Shoulders', 'Abdomen'],
    benefits: ['Strengthens spine', 'Opens heart', 'Reduces fatigue', 'Soothes sciatica'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Energy Boost', 'Overall Fitness'],
  },
  {
    id: 'downward-dog',
    name: 'Downward Dog',
    sanskritName: 'Adho Mukha Svanasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A foundational pose that stretches the entire back body and builds strength.',
    stretches: ['Hamstrings', 'Calves', 'Shoulders', 'Hands'],
    benefits: ['Energizes body', 'Calms brain', 'Relieves stress', 'Strengthens arms'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Energy Boost', 'Flexibility'],
  },
  {
    id: 'warrior-1',
    name: 'Warrior I',
    sanskritName: 'Virabhadrasana I',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A powerful standing pose that builds strength and stamina.',
    stretches: ['Chest', 'Lungs', 'Shoulders', 'Neck', 'Belly', 'Groin'],
    benefits: ['Strengthens legs', 'Opens hips', 'Improves focus', 'Builds stamina'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Weight Loss', 'Energy Boost'],
  },
  {
    id: 'warrior-2',
    name: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    image: '/placeholder.svg',
    duration: 45,
    description: 'Opens the hips and chest while building leg strength and endurance.',
    stretches: ['Groin', 'Legs', 'Chest', 'Shoulders'],
    benefits: ['Increases stamina', 'Relieves backaches', 'Therapeutic for flat feet'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Weight Loss', 'Energy Boost'],
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    sanskritName: 'Marjaryasana-Bitilasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A gentle flow between two poses that warms the spine and relieves tension.',
    stretches: ['Spine', 'Neck', 'Torso'],
    benefits: ['Improves posture', 'Relieves stress', 'Calms mind', 'Creates spinal flexibility'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief', 'Sleep / Wind-down'],
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    sanskritName: 'Paschimottanasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A calming forward bend that stretches the entire back of the body.',
    stretches: ['Spine', 'Shoulders', 'Hamstrings'],
    benefits: ['Calms the brain', 'Relieves stress', 'Stretches spine', 'Improves digestion'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief', 'Sleep / Wind-down'],
  },
  {
    id: 'corpse-pose',
    name: 'Corpse Pose',
    sanskritName: 'Savasana',
    image: '/placeholder.svg',
    duration: 120,
    description: 'The ultimate relaxation pose that calms the mind and reduces stress.',
    stretches: [],
    benefits: ['Deep relaxation', 'Reduces stress', 'Lowers blood pressure', 'Calms mind'],
    difficulty: 'beginner',
    goals: ['Stress Relief', 'Sleep / Wind-down'],
  },
  {
    id: 'plank',
    name: 'Plank Pose',
    sanskritName: 'Phalakasana',
    image: '/placeholder.svg',
    duration: 30,
    description: 'A core-strengthening pose that builds stability and endurance.',
    stretches: ['Spine', 'Shoulders'],
    benefits: ['Strengthens core', 'Builds endurance', 'Improves posture', 'Tones arms'],
    difficulty: 'intermediate',
    goals: ['Overall Fitness', 'Weight Loss', 'Energy Boost'],
  },
  {
    id: 'boat-pose',
    name: 'Boat Pose',
    sanskritName: 'Navasana',
    image: '/placeholder.svg',
    duration: 30,
    description: 'An intense core strengthener that builds abdominal muscles.',
    stretches: ['Hip flexors'],
    benefits: ['Strengthens core', 'Improves balance', 'Aids digestion', 'Builds focus'],
    difficulty: 'intermediate',
    goals: ['Weight Loss', 'Overall Fitness'],
  },
  {
    id: 'triangle-pose',
    name: 'Triangle Pose',
    sanskritName: 'Trikonasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A standing pose that stretches and strengthens the entire body.',
    stretches: ['Hips', 'Groin', 'Hamstrings', 'Calves', 'Shoulders', 'Chest', 'Spine'],
    benefits: ['Stimulates organs', 'Reduces stress', 'Improves digestion'],
    difficulty: 'intermediate',
    goals: ['Flexibility', 'Overall Fitness'],
  },
  {
    id: 'legs-up-wall',
    name: 'Legs Up The Wall',
    sanskritName: 'Viparita Karani',
    image: '/placeholder.svg',
    duration: 120,
    description: 'A restorative pose that relieves tired legs and calms the nervous system.',
    stretches: ['Hamstrings', 'Lower back', 'Neck'],
    benefits: ['Relieves tired legs', 'Calms mind', 'Reduces anxiety', 'Helps sleep'],
    difficulty: 'beginner',
    goals: ['Sleep / Wind-down', 'Stress Relief'],
  },
  {
    id: 'happy-baby',
    name: 'Happy Baby',
    sanskritName: 'Ananda Balasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A playful pose that opens the hips and releases the lower back.',
    stretches: ['Inner groin', 'Lower back', 'Spine'],
    benefits: ['Opens hips', 'Releases lower back', 'Calms brain', 'Relieves stress'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Sleep / Wind-down', 'Stress Relief'],
  },
];

export const goals = [
  'Overall Fitness',
  'Flexibility',
  'Weight Loss',
  'Stress Relief',
  'Energy Boost',
  'Sleep / Wind-down',
];

export const durations = [5, 10, 30, 60];

export const difficultyLevels = ['beginner', 'intermediate', 'advanced'] as const;

export function getPosesForGoal(goal: string, count: number = 5): Pose[] {
  const matching = poses.filter(pose => pose.goals.includes(goal));
  const shuffled = [...matching].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getPosesForDuration(targetMinutes: number, goal: string): Pose[] {
  const targetSeconds = targetMinutes * 60;
  const goalPoses = poses.filter(pose => pose.goals.includes(goal));
  
  const selected: Pose[] = [];
  let totalDuration = 0;
  
  // Shuffle and select poses until we reach target duration
  const shuffled = [...goalPoses].sort(() => Math.random() - 0.5);
  
  for (const pose of shuffled) {
    if (totalDuration + pose.duration <= targetSeconds) {
      selected.push(pose);
      totalDuration += pose.duration;
    }
    if (totalDuration >= targetSeconds * 0.8) break;
  }
  
  // Always include relaxation at the end if we have room
  const corpse = poses.find(p => p.id === 'corpse-pose');
  if (corpse && totalDuration + 60 <= targetSeconds) {
    selected.push({ ...corpse, duration: 60 });
  }
  
  return selected;
}

export function generateSession(duration: number, goal: string, difficulty: string = 'beginner'): Pose[] {
  const filtered = poses.filter(pose => 
    pose.goals.includes(goal) && 
    (difficulty === 'advanced' || 
     (difficulty === 'intermediate' && pose.difficulty !== 'advanced') ||
     pose.difficulty === 'beginner')
  );
  
  return getPosesForDuration(duration, goal);
}
