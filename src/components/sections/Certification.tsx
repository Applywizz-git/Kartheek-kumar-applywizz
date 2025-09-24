import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileData } from '@/data/profile';

export const Certification = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="certification"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-hero/10"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {profileData.certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="glass p-6 rounded-xl hover:shadow-glow transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-primary mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{cert.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};