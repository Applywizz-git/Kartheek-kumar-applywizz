import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax, Autoplay } from 'swiper/modules';
import { ExternalLink, Github, TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileData } from '@/data/profile';
import ProjectImg1 from '../public/assets/project1.png';
import ProjectImg2 from '../public/assets/project2.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

const metricIcons = {
  users: Users,
  uptime: Clock,
  requests: TrendingUp,
  data: TrendingUp,
  latency: Clock,
  accuracy: TrendingUp,
  deployment: Clock,
  success: TrendingUp,
  downtime: Clock,
};

export const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeSlide, setActiveSlide] = useState(0);
  const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;
  const projectImages = [
    asset('assets/project1.png'),
    asset('assets/project2.png'),
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-hero/20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing enterprise-scale solutions that deliver measurable impact
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <Swiper
            modules={[Navigation, Pagination, Parallax, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            parallax={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // breakpoints={{
            //   768: {
            //     slidesPerView: 1.2,
            //   },
            //   1024: {
            //     slidesPerView: 1.5,
            //   },
            // }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className="project-swiper"
          >
            {profileData.projects.map((project, index) => (
              <SwiperSlide key={project.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className="glass rounded-2xl overflow-hidden hover:shadow-elevation transition-all duration-500 group"
                >
                  {/* Project Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <div
                      data-swiper-parallax="-300"
                      className="absolute inset-0 bg-gradient-primary opacity-20"
                    />
                    <div
                      data-swiper-parallax="-200"
                      className="absolute inset-0 bg-muted/20 flex items-center justify-center"
                    >
                      <img
                        src={projectImages[index % 2]}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div data-swiper-parallax="-100">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics */}
                      {project.metrics && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-foreground mb-3">
                            Impact Metrics:
                          </h4>
                          <div className="grid grid-cols-3 gap-4">
                            {Object.entries(project.metrics).map(([key, value]) => {
                              const IconComponent = metricIcons[key as keyof typeof metricIcons];
                              return (
                                <div
                                  key={key}
                                  className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10"
                                >
                                  {IconComponent && (
                                    <IconComponent className="h-4 w-4 mx-auto mb-1 text-primary" />
                                  )}
                                  <div className="text-lg font-bold text-primary">
                                    {value}
                                  </div>
                                  <div className="text-xs text-muted-foreground capitalize">
                                    {key}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {project.links.demo && (
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1 group"
                            onClick={() => window.open(project.links.demo, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            Live Demo
                          </Button>
                        )}

                        {project.links.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 group"
                            onClick={() => window.open(project.links.github, '_blank')}
                          >
                            <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            Source Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button title="Previous Slide" className="swiper-button-prev !relative !w-12 !h-12 !bg-card !border !border-border !rounded-full !shadow-md hover:!shadow-glow !transition-all !duration-300 after:!content-none">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-sm text-muted-foreground">
              {activeSlide + 1} / {profileData.projects.length}
            </div>

            <button title="Next Slide" className="swiper-button-next !relative !w-12 !h-12 !bg-card !border !border-border !rounded-full !shadow-md hover:!shadow-glow !transition-all !duration-300 after:!content-none">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Custom styles for Swiper */}
      <style>{`
        .project-swiper .swiper-pagination {
          bottom: -50px !important;
        }
        
        .project-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: hsl(var(--muted-foreground)) !important;
          opacity: 0.3 !important;
        }
        
        .project-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary)) !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
      `}</style>
    </section>
  );
};