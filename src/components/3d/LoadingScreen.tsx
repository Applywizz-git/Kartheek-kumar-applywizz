import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

const technologies = [
  'Power BI', 'Tableau', 'SQL', 'Python', 'Snowflake', 'Azure', 
  'Excel', 'DAX', 'Alteryx', 'BigQuery'
];

export const LoadingScreen = () => {
  const { progress } = useProgress();
  const [displayName, setDisplayName] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  
  const fullName = "Kartheek Analytics";

  // Typewriter effect for name
  useEffect(() => {
    if (displayName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayName(fullName.slice(0, displayName.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [displayName, fullName]);

  // Cycle through languages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % technologies.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Auto-hide after timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  // Hide when fully loaded
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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

            {/* Language Ring */}
            <div className="relative mb-12 h-24 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-80 h-80"
              >
                {technologies.map((tech, index) => {
                  const angle = (index / technologies.length) * 360;
                  const isActive = index === currentLangIndex;
                  
                  return (
                    <motion.div
                      key={tech}
                      className="absolute top-1/2 left-1/2 origin-[0_140px]"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      }}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          isActive 
                            ? 'bg-primary text-primary-foreground glow' 
                            : 'bg-card text-card-foreground border border-border'
                        }`}
                        style={{ transform: `rotate(-${angle}deg)` }}
                      >
                        {tech}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="w-80 mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Loading • {technologies[currentLangIndex]}
                </span>
                <span className="text-sm font-mono text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
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