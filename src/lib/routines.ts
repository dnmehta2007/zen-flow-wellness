// Predefined routines for Zen Flow

import { poses, Pose } from './poses';

export interface Routine {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  poseIds: string[];
  isPredefined: boolean;
}

export const predefinedRoutines: Routine[] = [
  {
    id: 'morning-energizer',
    name: 'Morning Energizer',
    description: 'Wake up your body and mind with this invigorating sequence.',
    duration: 10,
    difficulty: 'beginner',
    goal: 'Energy Boost',
    poseIds: ['cat-cow', 'downward-dog', 'warrior-1', 'cobra-pose', 'tree-pose'],
    isPredefined: true,
  },
  {
    id: 'stress-relief',
    name: 'Stress Melter',
    description: 'Release tension and find your calm with these soothing poses.',
    duration: 15,
    difficulty: 'beginner',
    goal: 'Stress Relief',
    poseIds: ['child-pose', 'cat-cow', 'seated-forward-fold', 'happy-baby', 'corpse-pose'],
    isPredefined: true,
  },
  {
    id: 'flexibility-flow',
    name: 'Flexibility Flow',
    description: 'Improve your flexibility with this gentle stretching routine.',
    duration: 20,
    difficulty: 'beginner',
    goal: 'Flexibility',
    poseIds: ['cat-cow', 'downward-dog', 'triangle-pose', 'seated-forward-fold', 'happy-baby', 'child-pose'],
    isPredefined: true,
  },
  {
    id: 'bedtime-bliss',
    name: 'Bedtime Bliss',
    description: 'Wind down and prepare for restful sleep.',
    duration: 10,
    difficulty: 'beginner',
    goal: 'Sleep / Wind-down',
    poseIds: ['child-pose', 'cat-cow', 'legs-up-wall', 'happy-baby', 'corpse-pose'],
    isPredefined: true,
  },
  {
    id: 'core-power',
    name: 'Core Power',
    description: 'Build a strong core with these challenging poses.',
    duration: 15,
    difficulty: 'intermediate',
    goal: 'Overall Fitness',
    poseIds: ['plank', 'boat-pose', 'warrior-1', 'warrior-2', 'bridge-pose'],
    isPredefined: true,
  },
  {
    id: 'full-body-stretch',
    name: 'Full Body Stretch',
    description: 'A complete stretching routine for your entire body.',
    duration: 30,
    difficulty: 'beginner',
    goal: 'Flexibility',
    poseIds: ['cat-cow', 'downward-dog', 'cobra-pose', 'warrior-1', 'warrior-2', 'triangle-pose', 'seated-forward-fold', 'happy-baby', 'child-pose', 'corpse-pose'],
    isPredefined: true,
  },
  {
    id: 'weight-loss-blast',
    name: 'Weight Loss Blast',
    description: 'High-energy sequence to boost metabolism.',
    duration: 20,
    difficulty: 'intermediate',
    goal: 'Weight Loss',
    poseIds: ['plank', 'warrior-1', 'warrior-2', 'boat-pose', 'bridge-pose', 'downward-dog'],
    isPredefined: true,
  },
  {
    id: 'quick-break',
    name: 'Quick Desk Break',
    description: 'Perfect for a quick break during work.',
    duration: 5,
    difficulty: 'beginner',
    goal: 'Stress Relief',
    poseIds: ['cat-cow', 'downward-dog', 'child-pose'],
    isPredefined: true,
  },
];

export function getRoutinePoses(routine: Routine): Pose[] {
  return routine.poseIds
    .map(id => poses.find(p => p.id === id))
    .filter((pose): pose is Pose => pose !== undefined);
}

export function getRoutinesByGoal(goal: string): Routine[] {
  return predefinedRoutines.filter(r => r.goal === goal);
}

export function getRoutinesByDifficulty(difficulty: string): Routine[] {
  return predefinedRoutines.filter(r => r.difficulty === difficulty);
}
