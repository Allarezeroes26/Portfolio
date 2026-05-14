import React, { useRef } from 'react';
import resume from '../jsonResume/resume.json';
import Me from '../assets/me.jpg';
import { Download, Github, Linkedin, Moon, Sun } from 'lucide-react'; 
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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

const Homepage = () => {
  const { theme, setTheme } = useTheme();
  const bento1 = useRef();
  const bento2 = useRef();
  const mainIntro = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "back.out(1.2)" }
    });

    tl.from(mainIntro.current, { x: -100, opacity: 0 })
      .from(bento1.current, { y: -100, opacity: 0 }, "-=0.7")
      .from(bento2.current, { y: 100, opacity: 0 }, "-=0.8");

    tl.from(".intro-text span", {
      y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out"
    }, "-=0.5");

    tl.from(".action-btns", {
      y: 20, opacity: 0, duration: 0.5, ease: "power3.out"
    }, "-=0.4");
  });

  return (
    <>
      <div className='flex flex-col lg:min-h-screen w-full items-center p-6 lg:p-12 justify-center bg-background'>
        {/* Main Bento Grid */}
        <div className='grid gap-6 grid-cols-1 lg:grid-cols-[1.4fr_1fr] w-full max-w-6xl'>
          
          {/* LEFT: Introduction Card */}
          <Card ref={mainIntro} className='rounded-[2.5rem] p-10 bg-secondary/50 border-none shadow-none flex flex-col min-h-[600px]'>
            <CardHeader className='flex flex-row justify-between items-start p-0 mb-12'>
              <img src={Me} className='w-20 h-20 rounded-2xl object-cover' alt="Profile" />
              <div className='flex items-center gap-2 bg-background/40 px-4 py-2 rounded-full border border-white/5'>
                <span className={`h-2 w-2 rounded-full ${resume.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <p className='text-[10px] font-bold uppercase tracking-widest opacity-70'>
                  {resume.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </CardHeader>

            <CardContent className='p-0 flex flex-col gap-10 flex-grow justify-center'>
              <h1 className='intro-text font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-medium'>
                Hi, I'm {resume.nickName} <span className='inline-block'>👋</span> <br />
                <span className="opacity-30">An </span>
                <span className='text-orange-500 font-bold'>{resume.position}</span> <br/>
                <span className="opacity-30"> based in </span>{resume.address}.
              </h1>

              <div className='action-btns flex items-center gap-4'>
                <Button className="rounded-2xl h-14 px-8 bg-orange-500 text-white border-none hover:bg-orange-600 transition-all font-bold gap-2 group shadow-lg shadow-orange-500/20" asChild>
                  <a href="/resume.pdf" download="Resume_John_Erwin_Bacani.pdf">
                    <Download className="size-5 group-hover:-translate-y-1 transition-transform" />
                    Download CV
                  </a>
                </Button>

                {/* SOCIAL BUTTONS */}
                <div className='flex items-center gap-3'>
                    <Button size='icon' variant='secondary' className="rounded-2xl size-14 bg-background/60 border-none hover:bg-orange-500 hover:text-white transition-all group" asChild>
                    <a href="https://github.com/Allarezeroes26" target='_blank' rel="noopener noreferrer">
                        <Github className="size-6"/>
                    </a>
                    </Button>
                    <Button size='icon' variant='secondary' className="rounded-2xl size-14 bg-background/60 border-none hover:bg-orange-500 hover:text-white transition-all group" asChild>
                    <a href="https://www.linkedin.com/in/john-erwin-bacani-90853a359" target='_blank' rel="noopener noreferrer">
                        <Linkedin className="size-6"/>
                    </a>
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT COLUMN */}
          <div className='flex flex-col gap-6'>
            {/* Appearance Card */}
            <Card ref={bento1} className='p-6 rounded-[2.5rem] bg-secondary/50 border-none shadow-none'>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xl tracking-tight">Appearance</span>
                <div className="flex bg-background/40 p-1 rounded-2xl border border-white/5 gap-1">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${theme === 'light' ? 'bg-orange-500 text-white shadow-lg' : 'text-muted-foreground opacity-40 hover:opacity-100'}`}
                  >
                    <Sun className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Light</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${theme === 'dark' ? 'bg-orange-500 text-white shadow-lg' : 'text-muted-foreground opacity-40 hover:opacity-100'}`}
                  >
                    <Moon className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Dark</span>
                  </button>
                </div>
              </div>
            </Card>
            
            {/* Tech Stack Card */}
            <Card ref={bento2} className='flex-1 p-10 rounded-[2.5rem] bg-secondary/50 border-none shadow-none flex flex-col overflow-hidden min-h-[500px]'>
              <div className="flex items-center justify-between mb-10">
                <h2 className='font-display text-3xl font-bold tracking-tight'>Tech Stack</h2>
                <span className="text-[9px] font-mono opacity-20 italic tracking-widest uppercase">Scroll to discover</span>
              </div>
              
              <CardContent className="p-0 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {resume.techStack.map((stack) => (
                    <Tooltip key={stack.techName}>
                      <TooltipTrigger asChild>
                        <div className='aspect-square flex items-center justify-center bg-background/40 rounded-[1.5rem] hover:bg-orange-500/10 transition-all duration-500 group border border-white/5'>
                          <StackIcon 
                            name={stack.techName} 
                            className="size-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-orange-500 border-none font-bold text-white rounded-lg">
                        {stack.techName}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <About />
      <Projects />
      <Contact />
    </>   
  )
}

export default Homepage;