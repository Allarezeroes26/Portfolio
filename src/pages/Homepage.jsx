import React, { useRef } from 'react';
import resume from '../jsonResume/resume.json';
import Me from '../assets/me.jpg';
import { Download, Github, Linkedin, Moon, Sun, Laptop } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from 'next-themes';
import StackIcon from 'tech-stack-icons';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Homepage = () => {
  const { theme, setTheme } = useTheme();
  const mainIntro = useRef();

  useGSAP(() => {
    gsap.from(".bento-container", {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
  });

  return (
    <>
      {/* Main Container - Forced to screen height on LG to prevent overflow */}
      <div className='flex flex-col lg:h-screen w-full items-center p-4 lg:p-8 justify-center bg-background overflow-hidden'>
        <div className='bento-container grid gap-4 grid-cols-1 lg:grid-cols-[1.4fr_1fr] w-full max-w-6xl h-full max-h-[850px]'>
          
          {/* LEFT COLUMN: Main Introduction */}
          <Card ref={mainIntro} className='rounded-[2rem] p-6 lg:p-10 bg-secondary/50 border-none shadow-none flex flex-col justify-between h-full relative'>
            <CardHeader className='flex flex-row justify-between items-center p-0'>
              <img src={Me} className='w-14 h-14 rounded-xl object-cover' alt="Profile" />
              <div className='flex items-center gap-2 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5'>
                <span className={`h-2 w-2 rounded-full ${resume.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className='text-[10px] font-bold uppercase tracking-wider opacity-70'>
                  {resume.available ? 'Available' : 'Busy'}
                </span>
              </div>
            </CardHeader>

            <CardContent className='p-0 mt-4'>
              <h1 className='font-display text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight'>
                Hi, I'm <span className='text-foreground'>{resume.nickName}</span> 👋 <br />
                <span className="text-muted-foreground/50">An </span>
                <span className='text-orange-500 font-bold'>{resume.position}</span> <br/>
                <span className="text-muted-foreground/50"> based in </span>
                <span className='text-foreground'>{resume.address}.</span>
              </h1>

              <div className='flex flex-wrap gap-3 mt-8 items-center'>
                <Button size='lg' className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 h-12 text-sm font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                  <Download className="mr-2 h-4 w-4" /> Resume
                </Button>
                <div className='flex gap-2'>
                  <Button size='icon' variant='secondary' className="rounded-xl size-12 bg-background/40 hover:bg-background transition-all">
                    <Github className="size-5"/>
                  </Button>
                  <Button size='icon' variant='secondary' className="rounded-xl size-12 bg-background/40 hover:bg-background transition-all">
                    <Linkedin className="size-5"/>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT COLUMN */}
          <div className='flex flex-col gap-4 h-full overflow-hidden'>
            
            {/* NEW THEME SWITCH DESIGN (Segmented Control Style) */}
            <Card className='p-2 rounded-[2rem] bg-secondary/50 border-none shadow-none'>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-bold opacity-70">Theme</span>
                <div className="flex bg-background/40 p-1 rounded-xl border border-white/5 gap-1">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-orange-500 text-white shadow-sm' : 'text-muted-foreground hover:bg-background/60'}`}
                  >
                    <Sun className="size-4" />
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-orange-500 text-white shadow-sm' : 'text-muted-foreground hover:bg-background/60'}`}
                  >
                    <Moon className="size-4" />
                  </button>
                </div>
              </div>
            </Card>
            
            {/* TECH STACK (Scrollable Grid) */}
            <Card className='flex-1 p-6 lg:p-8 rounded-[2rem] bg-secondary/50 border-none shadow-none flex flex-col overflow-hidden'>
              <div className="flex items-center justify-between mb-4">
                <h2 className='font-display text-2xl font-bold'>Tech Stack</h2>
                <span className="text-[10px] font-mono opacity-40">SCROLL TO VIEW</span>
              </div>
              
              {/* Internal scrollable area for icons to keep the card height fixed */}
              <div className="grid grid-cols-4 gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {resume.techStack.map((stack) => (
                  <Tooltip key={stack.techName}>
                    <TooltipTrigger asChild>
                      <div className='aspect-square flex items-center justify-center bg-background/30 rounded-2xl hover:bg-orange-500/10 transition-all duration-300 group border border-white/5'>
                        <StackIcon 
                          name={stack.techName} 
                          className="size-7 lg:size-9 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all" 
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-orange-500 text-white border-none font-bold">
                      {stack.techName}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div id="projects-section"><Projects /></div>
      <About />
      <Contact />
    </>
  );
};

export default Homepage;