import { useEffect, useRef } from 'react';
import { PostureFeedback } from '@/lib/posture';

interface VoiceCoachProps {
  feedback: PostureFeedback | null;
  enabled: boolean;
  onSpeak?: (text: string) => void;
  cooldownMs?: number;
  volume?: number; // 0..1
  lang?: string; // 'en-US'
}

const defaultCooldown = 3000; // avoid repeating cues too often

export default function VoiceCoach({ feedback, enabled, onSpeak, cooldownMs = defaultCooldown, volume = 0.9, lang = 'en-US' }: VoiceCoachProps) {
  const lastSpokenRef = useRef<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!enabled || !feedback) return;

    const now = Date.now();
    if (now - lastSpokenRef.current < cooldownMs) return;

    // Only speak for fair or needs-improvement
    if (feedback.alignment === 'good') return;

    const primary = feedback.suggestions && feedback.suggestions.length > 0
      ? feedback.suggestions[0]
      : feedback.issues && feedback.issues.length > 0
      ? feedback.issues[0]
      : 'Please adjust your posture slightly.';

    const text = `Adjustment suggestion: ${primary}`;

    try {
      const synth = window.speechSynthesis;
      if (!synth) return;

      // Cancel any existing utterance
      synth.cancel();

      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || 'en-US';
      u.rate = 0.95;
      u.pitch = 1;
      try {
        // Some browsers support utterance.volume
        // Fallback: we can adjust system volume or audio gain elsewhere if unsupported
        (u as any).volume = Math.max(0, Math.min(1, volume));
      } catch (e) {}
      utteranceRef.current = u;

      u.onstart = () => {
        lastSpokenRef.current = Date.now();
        onSpeak?.(text);
      };
      u.onerror = () => {};
      synth.speak(u);
    } catch (e) {
      // ignore speech errors
    }

    return () => {
      try {
        window.speechSynthesis.cancel();
        utteranceRef.current = null;
      } catch (e) {}
    };
  }, [feedback, enabled, onSpeak, cooldownMs]);

  return null;
}
