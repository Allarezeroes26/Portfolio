import React, { useRef } from 'react';
import resume from '../jsonResume/resume.json';
import Me from '../assets/me.jpg';
import { Download, Github, Linkedin, Moon, Sun, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from 'next-themes';
import { Badge } from '@/components/ui/badge';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import StackIcon from 'tech-stack-icons';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Homepage = () => {
  const { theme, setTheme } = useTheme();
  const bentoScale = useRef();
  const mainIntro = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "expo.out" } });
    tl.from(mainIntro.current, { x: -50, opacity: 0 })
      .from(".bento-right", { x: 50, opacity: 0, stagger: 0.2 }, "-=0.4")
      .from(".intro-text", { y: 30, opacity: 0 }, "-=0.2");
  });

  return (
    <>
      <div className='flex flex-col min-h-screen w-full items-center p-6 justify-center bg-background'>
        <div className='grid gap-6 grid-cols-1 lg:grid-cols-[1.4fr_1fr] w-full max-w-6xl'>
          
          {/* LEFT COLUMN: Main Introduction */}
          <Card ref={mainIntro} className='rounded-[2.5rem] p-8 md:p-12 bg-secondary/50 border-none shadow-none flex flex-col justify-between min-h-[550px] relative overflow-hidden'>
            <CardHeader className='flex flex-row justify-between items-center p-0 z-10'>
              <img src={Me} className='w-16 h-16 rounded-2xl object-cover ring-4 ring-background/10' alt="Profile" />
              <div className='flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/5'>
                <span className={`h-2 w-2 rounded-full ${resume.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className='text-xs font-semibold tracking-wide uppercase opacity-80'>
                  {resume.available ? 'Available for work' : 'Busy'}
                </span>
              </div>
            </CardHeader>

            <CardContent className='p-0 z-10 mt-8'>
              <h1 className='intro-text font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight'>
                Hi, I'm <span className='text-foreground'>{resume.nickName}</span> 
                <span className='animate-wiggle inline-block ml-2'>👋</span> <br />
                <span className="text-muted-foreground/60">An </span>
                <span className='text-orange-500 font-bold'>{resume.position}</span> 
                <span className="text-muted-foreground/60"> based in </span>
                <span className='text-foreground'>{resume.address}.</span>
              </h1>

              <div className='flex flex-col sm:flex-row gap-4 mt-12 items-center'>
                <Button size='lg' className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-10 h-14 text-md font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                  <Download className="mr-2 h-5 w-5" /> Download CV
                </Button>
                <div className='flex gap-3'>
                  <Button size='icon' variant='secondary' className="rounded-2xl size-14 bg-background/40 hover:bg-background transition-all">
                    <Github className="size-6"/>
                  </Button>
                  <Button size='icon' variant='secondary' className="rounded-2xl size-14 bg-background/40 hover:bg-background transition-all">
                    <Linkedin className="size-6"/>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT COLUMN */}
          <div className='flex flex-col gap-6 bento-right'>
            
            {/* ENHANCED THEME TOGGLE */}
            <Card 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className='cursor-pointer p-2 rounded-[2.5rem] bg-secondary/50 border-none shadow-none group overflow-hidden transition-all hover:bg-secondary/80'
            >
              <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                  <div className={`p-4 rounded-[1.8rem] transition-all duration-500 ${theme === 'dark' ? 'bg-[#1a1a1a] text-orange-500 shadow-inner' : 'bg-white text-orange-500 shadow-md'}`}>
                    {theme === "dark" ? <Moon className='size-6'/> : <Sun className='size-6'/>}
                  </div>
                  <div>
                    <p className='font-bold text-lg leading-none'>Appearance</p>
                    <p className='text-sm text-muted-foreground font-medium mt-1'>
                      Currently {theme === 'dark' ? 'Dark' : 'Light'} Mode
                    </p>
                  </div>
                </div>
                <div className='pr-4 opacity-20 group-hover:opacity-100 transition-opacity'>
                   <Monitor className='size-5' />
                </div>
              </div>
            </Card>
            
            {/* TECH STACK */}
            <Card className='flex-1 p-8 rounded-[2.5rem] bg-secondary/50 border-none shadow-none flex flex-col'>
              <div className="flex items-center justify-between mb-8">
                <h2 className='font-display text-3xl font-bold'>Tech Stack</h2>
                <Badge variant="outline" className="opacity-40 rounded-lg px-2 py-1 border-foreground/20">
                  {resume.techStack.length} tools
                </Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {resume.techStack.map((stack) => (
                  <Tooltip key={stack.techName}>
                    <TooltipTrigger asChild>
                      <div className='aspect-square flex items-center justify-center bg-background/30 rounded-[1.5rem] hover:bg-orange-500 transition-all duration-300 group cursor-default border border-white/5 hover:border-orange-400 shadow-sm hover:shadow-orange-500/40'>
                        <StackIcon 
                          name={stack.techName} 
                          className="size-8 md:size-10 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500" 
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-orange-500 border-none font-bold text-white">
                      {stack.techName}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default Homepage;