import React, { useLayoutEffect, useRef } from 'react';
import resume from '../jsonResume/resume.json';
import { SquareArrowOutUpRight, Github, Code2, Plus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const hasImage = project.pics && project.pics.length > 0;
  
  return (
    <Card className="anim-card group relative overflow-hidden border-none bg-secondary shadow-none flex flex-col transition-all duration-500 hover:ring-1 hover:ring-primary/20 h-full">
      <div className="h-48 w-full overflow-hidden bg-muted/10 flex items-center justify-center shrink-0">
        {hasImage ? (
          <img 
            src={project.pics[0].showcasePic} 
            alt={project.title}
            className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          />
        ) : (
          <Code2 className="size-12 opacity-10" />
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-grow">
        <div>
          <h3 className='font-display text-lg text-orange-500 font-bold leading-tight'>
            {project.title}
          </h3>
          <p className='text-muted-foreground text-xs mt-2 line-clamp-2'>
            {project.description}
          </p>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {project.stack.map((tech, i) => (
            <Badge key={i} variant="outline" className="text-[10px] font-medium bg-primary/5 text-primary border-primary/10 px-2 py-0">
              {tech}
            </Badge>
          ))}
        </div>

        <div className='flex items-center gap-2 mt-auto pt-4'>
          {project.demo && (
            <Button variant="default" size="sm" className="h-8 px-3 gap-2 text-xs" onClick={() => window.open(project.link, '_blank')}>
              Demo <SquareArrowOutUpRight size={12} />
            </Button>
          )}
          {project.srccode && (
            <Button variant="outline" size="sm" className="h-8 px-3 gap-2 text-xs bg-background/40" onClick={() => window.open(project.srccode, '_blank')}>
              Github <Github size={12} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const featuredProjects = resume.projects.slice(0, 3);
  const remainingProjects = resume.projects.slice(3);

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

      tl.to(".anim-header", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(".anim-card", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.5");
    }, containerRef);
    return () => ctx.revert(); 
  }, []);

  return (
    <div id='projects-section' ref={containerRef} className='flex flex-col w-full items-center p-5 lg:p-10'>
      
      <div className='anim-header w-full max-w-6xl mb-10 text-center lg:text-left'>
        <h1 className='font-display text-4xl md:text-6xl font-bold mb-4 tracking-tighter'>Selected Works</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>
          A collection of full-stack applications and tools built with modern web technologies.
        </p>
      </div>

      {/* Main Grid: Forces 3 equal columns */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-12'>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {remainingProjects.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="rounded-full px-8 gap-2 hover:bg-primary hover:text-primary-foreground transition-all">
              View More Projects <Plus size={18} />
            </Button>
          </DialogTrigger>
          {/* max-w-[95vw] makes the dialog take up the width of the screen instead of being vertical */}
          <DialogContent className="max-w-[95vw] lg:max-w-[80vw] h-[85vh] overflow-y-auto bg-background/98 backdrop-blur-xl border-white/10 p-6">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-display font-bold">Project Archive</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
              {remainingProjects.map((project, index) => (
                <ProjectCard key={index + 3} project={project} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Projects;