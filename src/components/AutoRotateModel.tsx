import { useEffect, useRef, useState } from 'react';
import { Box } from 'lucide-react';

interface AutoRotateModelProps {
  active: boolean;
  cueKey?: number; // increments when a speech cue plays
}

export default function AutoRotateModel({ active, cueKey = 0 }: AutoRotateModelProps) {
  const [highlight, setHighlight] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    // When cueKey changes, trigger highlight
    if (cueKey > 0) {
      setHighlight(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setHighlight(false), 1400);
    }
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [cueKey, active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className={`w-48 h-48 rounded-xl bg-foreground/5 flex items-center justify-center transition-transform duration-700 ${highlight ? 'scale-105 ring-4 ring-primary/40' : ''}`} style={{ animation: 'rotateY 6s linear infinite' }}>
        <Box className="w-16 h-16 text-primary-foreground" />
      </div>

      <style>{`
        @keyframes rotateY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
