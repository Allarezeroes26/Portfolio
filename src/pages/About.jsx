import React, { useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';
import Resume from '../jsonResume/resume.json'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const aboutRef = useRef();
  const leftTop = useRef();
  const leftBottom = useRef();
  const rightJourney = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      },
      defaults: { duration: 1, ease: "back.out(1.2)" }
    });

    tl.from(leftTop.current, {
      y: -100,
      opacity: 0,
    })
    .from(rightJourney.current, {
      x: 100,
      opacity: 0,
    }, "-=0.8")

    .from(leftBottom.current, {
      y: 100,
      opacity: 0,
    }, "-=0.8");

    gsap.from(".journey-dot", {
      scrollTrigger: {
        trigger: rightJourney.current,
        start: "top 70%",
      },
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(3)"
    });
  }, { scope: aboutRef });

  return (
    <div ref={aboutRef} className='flex flex-col justify-center p-5 items-center w-full overflow-hidden'>
      <div className='grid gap-5 grid-cols-1 lg:grid-cols-[2fr_1.2fr] w-full max-w-6xl items-start'>
        
        <div className='flex flex-col gap-5'>
          <div ref={leftTop}>
            <Card className='flex border-none rounded-4xl shadow-none flex-col bg-secondary p-6 md:p-10'>
              <CardHeader className='p-0 pb-6'>
                <h1 className='text-4xl md:text-5xl font-display text-primary'>About Me</h1>
              </CardHeader>
              <CardContent className='p-0'>
                <div className='flex flex-col gap-6'>
                  <p className='font-paragraph font-light text-lg leading-relaxed text-muted-foreground'>
                    While I don’t have formal industry experience yet, I’ve built multiple <span className='text-foreground text-orange-500 font-medium'>full-stack web applications</span> using the MERN stack. I enjoy building scalable, clean, and user-focused applications from scratch.
                  </p>
                  <p className='font-paragraph font-light text-lg leading-relaxed text-muted-foreground'>
                    I’m comfortable working with <span className='text-foreground font-medium'>APIs, JWT authentication, state management, and deployment</span>. I’m now looking to contribute to a team environment where I can grow and ship production-ready features.
                  </p>
                  
                  <div className='flex gap-2 pt-2 flex-wrap'>
                    <Badge variant="outline" className="px-4 py-1 border-muted-foreground/20 text-muted-foreground">Problem Solver</Badge>
                    <Badge variant="outline" className="px-4 py-1 border-muted-foreground/20 text-muted-foreground">Fresh Graduate</Badge>
                    <Badge variant="outline" className="px-4 py-1 border-muted-foreground/20 text-muted-foreground">BSIT</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div ref={leftBottom}>
            <Card className='bg-primary text-primary-foreground bg-orange-500 rounded-4xl border-none shadow-none p-8 flex flex-col gap-4'>
              <div>
                <p className='font-display text-xl'>Want to collaborate?</p>
                <p className='text-sm opacity-70'>Let's turn your ideas into code.</p>
              </div>
              <button className='w-full bg-background text-foreground rounded-2xl py-3 font-bold text-sm hover:scale-[1.02] transition-all active:scale-95'>
                Get in Touch
              </button>
            </Card>
          </div>
        </div>

        <div ref={rightJourney} className="h-full">
          <Card className='flex flex-col h-full bg-secondary rounded-4xl border-none shadow-none p-6 md:p-8'>
            <CardHeader className="p-0 mb-8">
              <h2 className='font-display text-2xl flex items-center gap-3'>
                <Briefcase size={22} className="text-orange-500"/>
                Journey
              </h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className='relative ml-2 flex flex-col gap-10 border-l border-muted-foreground/20'>
                {Resume.experience.map((exp, i) => (
                  <div key={i} className='relative pl-8'>
                    <div className='journey-dot absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-secondary' />
                    
                    <div className='flex flex-col mb-2'>
                      <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                        {exp.from}
                      </span>
                      <h3 className='text-sm font-bold text-orange-500'>
                        {exp.company}
                      </h3>
                    </div>

                    <p className='font-display text-[11px] font-semibold uppercase tracking-wider text-primary mb-3'>
                      {exp.position}
                    </p>

                    <div className='flex flex-col gap-2'>
                      {exp.res.map((r, index) => (
                        <p key={index} className='text-xs leading-relaxed text-muted-foreground relative pl-3 before:content-[""] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-muted-foreground/40 before:rounded-full'>
                          {r}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default About;