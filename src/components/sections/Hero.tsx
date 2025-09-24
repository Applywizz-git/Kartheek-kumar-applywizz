import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import profileImg from '../../assets/Profile.jpg';

const rotatingKeywords = [
  'BI Solutions',
  'Data Visualization', 
  'ETL Pipelines',
  'Predictive Analytics',
  'Financial Modeling',
  'Business Intelligence',
];

export const Hero = () => {
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for headline
  const headline = "Transforming Data into Strategic Business Insights";
  
  useEffect(() => {
    if (isTyping && displayedText.length < headline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(headline.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === headline.length) {
      setIsTyping(false);
    }
  }, [displayedText, headline, isTyping]);

  // Rotating keywords
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % rotatingKeywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                📊 Data Analyst Professional
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-1 h-16 bg-primary ml-2 align-middle"
                />
              </span>
            </h1>

            {/* Rotating Subtitle */}
            <div className="mb-8 h-16 flex items-center justify-center lg:justify-start">
              <span className="text-xl md:text-2xl text-muted-foreground mr-4">
                Specializing in
              </span>
              <motion.span
                key={currentKeyword}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-semibold text-primary"
              >
                {rotatingKeywords[currentKeyword]}
              </motion.span>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl"
            >
              3 years of experience designing end-to-end BI solutions, scalable ETL 
              pipelines, and advanced forecasting models. Expert in Power BI, Tableau, 
              SQL, Python, and cloud data platforms for strategic decision-making.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="hero-btn group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                View Projects
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="hero-btn group"
                onClick={() => window.open('/Kartheek_Resume.pdf', '_blank')}
              >
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/kartheek45/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:kartheeksarma1@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl"
              />
              
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-elevation">
                  <div className="w-full h-full bg-gradient-primary opacity-10" />
                  <div className="absolute inset-4 rounded-full flex items-center justify-center">
                      <img src="/assets/Profile.jpg" alt="Profile" />
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};