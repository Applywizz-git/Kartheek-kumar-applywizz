import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Server, Cloud, Layers } from 'lucide-react';
import { profileData } from '@/data/profile';
import { createElement } from 'react';

const skillCategories = [
  {
    title: 'Analytics & Visualization',
    icon: Code,
    skills: profileData.skills.analytics,
    color: 'primary',
  },
  {
    title: 'Databases & Platforms',
    icon: Server,
    skills: profileData.skills.databases,
    color: 'secondary',
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: profileData.skills.cloud,
    color: 'amber-glow',
  },
  {
    title: 'Analytics Tools',
    icon: Layers,
    skills: profileData.skills.analytics_tools,
    color: 'success-green',
  },
];

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
    experience: string;
  };
  index: number;
  isInView: boolean;
}

const SkillBar = ({ skill, index, isInView }: SkillBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          {skill.name}
        </span>
        <div className="text-right">
          <span className="text-sm font-bold text-primary">
            {skill.level}%
          </span>
          <div className="text-xs text-muted-foreground">
            {skill.experience}
          </div>
        </div>
      </div>
      
      <div className="skill-progress">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
          className="skill-progress-fill"
        />
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across the full software development lifecycle
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-card/50 text-foreground hover:bg-card border border-border'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {category.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Skills List */}
            <div className="space-y-2">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-bold text-foreground mb-6 flex items-center"
              >
                {createElement(skillCategories[activeCategory].icon, {
                  className: 'h-6 w-6 mr-3 text-primary'
                })}
                {skillCategories[activeCategory].title}
              </motion.h3>
              
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Visual Representation */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-80 h-80"
              >
                {/* Circular Progress Rings */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {skillCategories[activeCategory].skills.slice(0, 4).map((skill, index) => {
                    const radius = 35 - index * 7;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = circumference;
                    const strokeDashoffset = circumference - (skill.level / 100) * circumference;
                    
                    return (
                      <motion.circle
                        key={skill.name}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-primary/20"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 2, delay: 0.8 + index * 0.2 }}
                        style={{
                          strokeDasharray,
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {Math.round(
                        skillCategories[activeCategory].skills.reduce(
                          (acc, skill) => acc + skill.level,
                          0
                        ) / skillCategories[activeCategory].skills.length
                      )}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average
                    </div>
                  </div>
                </div>

                {/* Skill Labels */}
                {skillCategories[activeCategory].skills.slice(0, 4).map((skill, index) => {
                  const angle = (index * 90) - 90; // Start from top
                  const radian = (angle * Math.PI) / 180;
                  const x = 50 + 40 * Math.cos(radian);
                  const y = 50 + 40 * Math.sin(radian);
                  
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <div className="px-2 py-1 bg-card/80 backdrop-blur-sm rounded-md text-xs font-medium text-foreground border border-border">
                        {skill.name}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { label: 'Analytics Tools', count: profileData.skills.analytics.length },
            { label: 'Databases', count: profileData.skills.databases.length },
            { label: 'Cloud Platforms', count: profileData.skills.cloud.length },
            { label: 'Specializations', count: profileData.skills.analytics_tools.length },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              className="text-center p-6 glass rounded-xl hover:shadow-glow transition-all duration-300"
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.count}+
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};