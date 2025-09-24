import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

const technologies = [
  'Power BI', 'Tableau', 'SQL', 'Python', 'Snowflake', 'Azure',
  'Excel', 'DAX', 'Alteryx', 'BigQuery'
];

export const LoadingScreen = () => {
  // CHANGED: also read active/loaded/total so we can detect "no assets"
  const { progress, active, total } = useProgress();

  const [displayName, setDisplayName] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);

  // NEW: UI-driven progress that smoothly follows loader progress
  const [uiProgress, setUiProgress] = useState(0);

  const fullName = "Kartheek Kumar";

  // Typewriter effect for name
  useEffect(() => {
    if (displayName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayName(fullName.slice(0, displayName.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [displayName, fullName]);

  // NEW: rotate "technologies" line every 600ms
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentLangIndex(i => (i + 1) % technologies.length);
    }, 600);
    return () => clearInterval(id);
  }, []);

  // CHANGED: drive a smooth UI progress and handle "no assets" case
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setUiProgress(prev => {
        const target = total === 0 ? 100 : progress; // if nothing to load, go to 100
        const delta = target - prev;
        // ease toward the target
        const step = Math.sign(delta) * Math.max(0.5, Math.abs(delta) * 0.15);
        const next = prev + step;
        // snap if close
        if (Math.abs(target - next) < 0.5) return target;
        raf = requestAnimationFrame(animate);
        return Math.min(100, Math.max(0, next));
      });
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [progress, total]);

  // CHANGED: auto-hide when UI progress completes OR after a max timeout
  useEffect(() => {
    if (uiProgress >= 100 && !active) {
      const t = setTimeout(() => setShowLoading(false), 2000);
      return () => clearTimeout(t);
    }
  }, [uiProgress, active]);

  // keep a hard cap so it doesn’t hang forever (safety net)
  useEffect(() => {
    const timeout = setTimeout(() => setShowLoading(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          aria-live="polite"
          aria-label="Loading application"
        >
          <div className="text-center">
            {/* Name Banner */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold mb-8 gradient-text"
            >
              {displayName}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1 h-20 bg-primary ml-2 align-top"
              />
            </motion.h1>
            <p className='text-2xl md:text-3xl font-semibold mb-4'> Data Analyst & Data Engineer</p>

            {/* Progress Bar */}
            <div className="w-80 mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Loading • {technologies[currentLangIndex]}
                </span>
                {/* CHANGED: show UI progress */}
                <span className="text-sm font-mono text-primary">
                  {Math.round(uiProgress)}%
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                {/* CHANGED: animate width using UI progress */}
                <motion.div
                  className="h-full bg-gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uiProgress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Status Line */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted-foreground text-sm"
            >
              Initializing Data Analyst Professional Portfolio...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
