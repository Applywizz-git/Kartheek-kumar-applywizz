import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Cloud, Shield, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Code,
    title: 'Scalability',
    description: 'Architecting systems that handle millions of requests with sub-second response times.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Building fault-tolerant systems with 99.99% uptime and automated recovery.',
  },
  {
    icon: Cloud,
    title: 'Security',
    description: 'Implementing enterprise-grade security patterns and compliance frameworks.',
  },
  {
    icon: Zap,
    title: 'Optimization',
    description: 'Continuous performance tuning and cost optimization across cloud platforms.',
  },
];

const metrics = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 40, suffix: '%', label: 'Manual Reporting Reduced' },
  { value: 25, suffix: '%', label: 'Reporting Accuracy Improved' },
  { value: 18, suffix: '%', label: 'SLA Adherence Improvement' },
];

interface CounterProps {
  end: number;
  suffix: string;
  duration?: number;
  start?: boolean;
}

const Counter = ({ end, suffix = '', duration = 2, start = false }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const fps = 60;
    const totalFrames = Math.max(1, Math.round(duration * fps));
    let frame = 0;

    const step = () => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = end * eased;

      // show decimals only when needed (e.g., 99.9%)
      const display = Number.isInteger(end) ? Math.round(value) : parseFloat(value.toFixed(1));
      setCount(display);

      if (frame < totalFrames) requestAnimationFrame(step);
      else setCount(end);
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [start, end, duration]);

  return <span className="text-4xl md:text-5xl font-bold gradient-text">{count}{suffix}</span>;
};

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Data Analyst with 3 years of experience building end-to-end BI solutions, scalable
              ETL/ELT pipelines, and forecasting models across finance and operations. I work
              hands-on with Power BI, Tableau, SQL, and Python on Snowflake and Azure (ADF,
              Synapse, Databricks), enabling self-service analytics, KPI tracking, and real-time
              decision-making.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              At TCS, I delivered interactive dashboards and automated data workflows that cut
              manual reporting by 40% and improved reporting accuracy by 25%, saving 15+ hours
              weekly. My analyses guided $5M in funding allocation and surfaced operational
              bottlenecks—driving an 18% improvement in SLA adherence and higher BI adoption
              among business users.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I’m currently focused on production-grade data pipelines, time-series forecasting,
              and credit-risk analytics—pairing DAX-driven BI with Python modeling to turn raw
              data into clear portfolio and performance insights. Passionate about clean data
              design, measurable impact, and BI systems that scale with the business.
            </p>
          </motion.div>


          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 glass rounded-xl hover:shadow-glow transition-all duration-300"
              >
                <Counter
                  end={metric.value}
                  suffix={metric.suffix}
                  duration={2 + index * 0.2}
                  start={isInView}              // <-- trigger from parent
                />
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 glass rounded-xl text-center hover:shadow-glow transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
