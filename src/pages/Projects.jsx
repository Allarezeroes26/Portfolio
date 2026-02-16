import React, { useLayoutEffect, useRef } from 'react';
import resume from '../jsonResume/resume.json';
import { SquareArrowOutUpRight, Github, Code2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.set(".anim-header", { opacity: 0, y: 15 });
      gsap.set(".anim-card", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      tl.to(".anim-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(".anim-card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <div ref={containerRef} className='flex flex-col w-full items-center p-5 lg:p-10'>
      
      <div className='anim-header w-full max-w-6xl mb-10 text-center lg:text-left'>
        <h1 className='font-display text-4xl md:text-6xl font-bold mb-4 tracking-tighter'>Selected Works</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>
          A collection of full-stack applications and tools built with modern web technologies.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-6xl auto-rows-auto md:auto-rows-[400px]'>
        {resume.projects.map((project, index) => {
          const isLarge = index === 0 || index === 1;
          const hasImage = project.pics && project.pics.length > 0;

          return (
            <Card 
              key={index}
              className={`anim-card group relative overflow-hidden border-none bg-secondary shadow-none flex flex-col transition-all duration-500 hover:ring-1 hover:ring-primary/20 ${
                isLarge ? 'md:col-span-2 lg:col-span-3 lg:row-span-2' : 'md:col-span-2 lg:col-span-2'
              }`}
            >
              <div className={`${hasImage ? 'h-48 md:h-full' : 'h-32'} w-full overflow-hidden bg-muted/10 flex items-center justify-center shrink-0`}>
                {hasImage ? (
                   <img 
                    src={project.pics[0].showcasePic} 
                    alt={project.title}
                    className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                ) : (
                  <Code2 className="size-16 opacity-5" />
                )}
              </div>

              <div className={`${hasImage ? 'md:absolute md:inset-x-0 md:bottom-0 bg-secondary/90' : 'bg-secondary'} backdrop-blur-md p-6 flex flex-col gap-4 transition-all duration-300 group-hover:bg-secondary/95 border-t border-white/5 h-full md:h-auto`}>
                <div>
                  <h3 className='font-display text-lg md:text-xl font-bold leading-tight'>
                    {project.title}
                  </h3>
                  <p className='text-muted-foreground text-xs md:text-sm mt-1'>
                    {project.description}
                  </p>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {project.stack.map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="default" 
                      className="text-[11px] font-semibold bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1 uppercase tracking-wider"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className='flex items-center gap-2 mt-auto pt-2'>
                  {project.demo && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="h-8 px-4 gap-2 text-xs"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      Demo <SquareArrowOutUpRight size={14} />
                    </Button>
                  )}
                  {project.srccode && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-4 gap-2 text-xs bg-background/40"
                      onClick={() => window.open(project.srccode, '_blank')}
                    >
                      Github <Github size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;