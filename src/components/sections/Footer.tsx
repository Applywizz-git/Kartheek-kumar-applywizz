import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore, type AccentPreset } from '@/store/theme';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kartheek45/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
];

const accentPresets: { name: string; value: AccentPreset; color: string }[] = [
  { name: 'Default', value: 'default', color: '#14B8A6' },
  { name: 'Cyan', value: 'cyan-pulse', color: '#0891B2' },
  { name: 'Indigo', value: 'indigo-lime', color: '#4F46E5' },
  { name: 'Ruby', value: 'ruby-slate', color: '#BE123C' },
];

export const Footer = () => {
  const { accent, setAccent } = useThemeStore();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 glass border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-3xl font-bold gradient-text mb-4">
              Kartheek Kumar
            </h3>
            <p className="text-sm">Data Analyst & Data Engineer</p>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Kartheek Kumar Sarma Mokshagundam.
              <br />
              All rights reserved.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-6 relative z-10"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-glow transition-all duration-300 pointer-events-auto"
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right space-y-4"
          >

            {/* Accent Presets */}
            <div className="flex justify-center md:justify-end space-x-2">
              {accentPresets.map((preset) => (
                <motion.button
                  key={preset.value}
                  onClick={() => setAccent(preset.value)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${accent === preset.value
                      ? 'border-foreground shadow-glow'
                      : 'border-muted-foreground/30 hover:border-foreground/50'
                    }`}
                  style={{ backgroundColor: preset.color }}
                  aria-label={`Switch to ${preset.name} accent`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full h-px bg-gradient-primary mt-12 mb-8"
        />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
        >
          <div className="mb-4 md:mb-0">
            <p>
              Built with React, TypeScript, Three.js & ❤️
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#hero"
              className="hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              Back to Top
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="p-2 rounded-full hover:bg-primary/10"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-primary opacity-20" />
      </div>
    </footer>
  );
};
