import React from 'react';
import resume from '../jsonResume/resume.json';
import { SquareArrowOutUpRight, Github, Code2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Projects = () => {
  return (
    <div className='flex flex-col min-h-screen w-full items-center p-5 lg:p-10'>
      <div className='w-full max-w-6xl mb-10 text-center lg:text-left'>
        <h1 className='font-display text-4xl md:text-6xl font-bold mb-4 tracking-tighter'>Selected Works</h1>
        <p className='text-muted-foreground max-w-2xl'>
          A collection of full-stack applications and tools built with modern web technologies.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-6xl auto-rows-[350px]'>
        {resume.projects.map((project, index) => {
          const isLarge = index === 0 || index === 1;
          const hasImage = project.pics && project.pics.length > 0;

          return (
            <Card 
              key={index}
              className={`group relative overflow-hidden border-none bg-secondary shadow-none flex flex-col transition-all duration-300 hover:ring-1 hover:ring-primary/20 ${
                isLarge ? 'md:col-span-2 lg:col-span-3 lg:row-span-2' : 'md:col-span-2 lg:col-span-2'
              }`}
            >
              <div className={`${hasImage ? 'h-full' : 'h-1/2'} w-full overflow-hidden bg-muted/20 flex items-center justify-center`}>
                {hasImage ? (
                   <img 
                    src={project.pics[0].showcasePic} 
                    alt={project.title}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <Code2 className="size-16 opacity-10" />
                )}
              </div>

              <div className={`${hasImage ? 'absolute inset-x-0 bottom-0 bg-secondary/80 backdrop-blur-md border-t border-white/5' : 'relative bg-secondary'} p-6 flex flex-col gap-3`}>
                
                <div>
                  <h3 className='font-display text-xl md:text-2xl font-bold leading-tight'>
                    {project.title}
                  </h3>
                  <p className='text-muted-foreground text-sm line-clamp-2 mt-1'>
                    {project.description}
                  </p>
                </div>

                <div className='flex flex-wrap gap-1.5'>
                  {project.stack.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] font-medium bg-background/50 border-none px-2 py-0">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className='flex items-center gap-3 mt-2'>
                  {project.demo && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="h-8 gap-2 text-xs"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      Demo <SquareArrowOutUpRight size={14} />
                    </Button>
                  )}
                  {project.srccode && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-2 text-xs bg-background/50"
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
  )
}

export default Projects;