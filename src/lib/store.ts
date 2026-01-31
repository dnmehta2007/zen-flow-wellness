// Local storage utilities for Zen Flow app

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  primaryGoal: string;
  healthIssues: string[];
  diet: string;
  preferredDuration: number;
  soundscapesEnabled: boolean;
  meditationPromptEnabled: boolean;
  cameraFeedbackEnabled: boolean;
  setupComplete: boolean;
}

export interface SessionRecord {
  id: string;
  date: string;
  duration: number;
  goal: string;
  type: 'yoga' | 'meditation';
  posesCompleted?: number;
  totalPoses?: number;
}

export interface ProgressData {
  sessionsCompleted: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  weeklyGoal: number;
  sessions: SessionRecord[];
}

const STORAGE_KEYS = {
  USER_PROFILE: 'zenflow_user_profile',
  PROGRESS: 'zenflow_progress',
  CUSTOM_ROUTINES: 'zenflow_custom_routines',
};

// Default user profile
export const defaultUserProfile: UserProfile = {
  name: '',
  age: 0,
  gender: '',
  primaryGoal: 'Overall Fitness',
  healthIssues: [],
  diet: 'vegetarian',
  preferredDuration: 10,
  soundscapesEnabled: true,
  meditationPromptEnabled: true,
  cameraFeedbackEnabled: false,
  setupComplete: false,
};

// Default progress data
export const defaultProgressData: ProgressData = {
  sessionsCompleted: 0,
  totalMinutes: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: null,
  weeklyGoal: 5,
  sessions: [],
};

// User Profile functions
export function getUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (stored) {
      return { ...defaultUserProfile, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error reading user profile:', e);
  }
  return defaultUserProfile;
}

export function saveUserProfile(profile: Partial<UserProfile>): void {
  try {
    const current = getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving user profile:', e);
  }
}

export function isSetupComplete(): boolean {
  return getUserProfile().setupComplete;
}

// Progress functions
export function getProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (stored) {
      return { ...defaultProgressData, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error reading progress:', e);
  }
  return defaultProgressData;
}

export function saveProgress(progress: Partial<ProgressData>): void {
  try {
    const current = getProgress();
    const updated = { ...current, ...progress };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function recordSession(session: Omit<SessionRecord, 'id'>): void {
  const progress = getProgress();
  const today = new Date().toDateString();
  const lastDate = progress.lastSessionDate;
  
  // Calculate streak
  let newStreak = progress.currentStreak;
  if (lastDate) {
    const lastSessionDate = new Date(lastDate);
    const todayDate = new Date(today);
    const daysDiff = Math.floor((todayDate.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day, keep streak
    } else if (daysDiff === 1) {
      // Consecutive day, increment streak
      newStreak += 1;
    } else {
      // Streak broken
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }
  
  const newSession: SessionRecord = {
    ...session,
    id: `session_${Date.now()}`,
    date: today,
  };
  
  saveProgress({
    sessionsCompleted: progress.sessionsCompleted + 1,
    totalMinutes: progress.totalMinutes + session.duration,
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, progress.longestStreak),
    lastSessionDate: today,
    sessions: [...progress.sessions, newSession],
  });
}

// Custom routines
export interface CustomRoutine {
  id: string;
  name: string;
  poseIds: string[];
  duration: number;
  goal: string;
}

export function getCustomRoutines(): CustomRoutine[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_ROUTINES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading custom routines:', e);
  }
  return [];
}

export function saveCustomRoutine(routine: Omit<CustomRoutine, 'id'>): void {
  const routines = getCustomRoutines();
  const newRoutine: CustomRoutine = {
    ...routine,
    id: `routine_${Date.now()}`,
  };
  localStorage.setItem(STORAGE_KEYS.CUSTOM_ROUTINES, JSON.stringify([...routines, newRoutine]));
}

export function deleteCustomRoutine(id: string): void {
  const routines = getCustomRoutines();
  const filtered = routines.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_ROUTINES, JSON.stringify(filtered));
}
