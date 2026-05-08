import React, { useRef } from 'react';
import resume from '../jsonResume/resume.json';
import Me from '../assets/me.jpg';
import { Download, Github, Linkedin, Moon, Sun } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

  const {theme, setTheme} = useTheme()
  
  const bento1 = useRef()
  const bento2 = useRef()
  const mainIntro = useRef()
  const projectShowcase = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "back.out(1.2)" }
    });

    tl.from(mainIntro.current, {
      x: -100,
      opacity: 0,
    })

    .from(bento1.current, {
      y: -100,
      opacity: 0,
    }, "-=0.7")

    .from(bento2.current, {
      y: 100,
      opacity: 0,
    }, "-=0.8");

    tl.from(".intro-text span", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");

    tl.from(".action-btns > *", {
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(2)"
    }, "-=0.4");

    gsap.to(".profile-img", {
      y: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  
  const scrollToProjects = () => {
    document.getElementById("projects-section")?.scrollIntoView({behavior: "smooth"})
  };

  return (
    <>
      <div className='flex flex-col lg:h-screen w-full items-center p-5 justify-center overflow-hidden'>
        {/* Main Bento Grid - Restricted height on desktop to ensure it fits the screen */}
        <div className='grid gap-4 grid-cols-1 lg:grid-cols-[1.5fr_1fr] w-full max-w-6xl lg:h-[min(90vh,800px)]'>
    
          {/* LEFT: Introduction Card */}
          <Card ref={mainIntro} className='rounded-4xl p-8 md:p-12 bg-secondary w-full border-none shadow-none flex flex-col justify-between relative overflow-hidden h-full'>
            <CardHeader className='flex flex-row justify-between items-center p-0 space-y-0'>
              <div className="shrink-0">
                <img src={Me} className='profile-img w-16 h-16 rounded-2xl object-cover' alt="Profile" />
              </div>
              <div className='flex items-center gap-2 bg-background/50 px-4 py-1.5 rounded-full'>
                <span className={`h-2 w-2 rounded-full inline-block ${resume.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <p className='font-paragraph text-xs font-semibold uppercase tracking-wider opacity-80'>
                  {resume.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </CardHeader>

            <CardContent className='p-0 flex flex-col gap-6'>
              <h1 className='intro-text font-display text-3xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight'>
                Hi, I'm {resume.nickName} <span className='animate-wiggle inline-block origin-bottom-right'>👋</span> <br />
                <span className="text-muted-foreground/40 italic">An </span>
                <span className='text-orange-500 font-bold'>{resume.position}</span> <br/>
                <span className="text-muted-foreground/40 italic"> based in </span>{resume.address}.
              </h1>

              <div className='action-btns flex flex-col sm:flex-row gap-4 items-center'>
                <Button 
                  size='lg' 
                  className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 rounded-2xl px-10 h-14 font-bold shadow-lg shadow-orange-500/20"
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                    <Download className="mr-2 h-5 w-5" /> Resume
                  </a>
                </Button>

                <div className='flex flex-row gap-3'>
                    <Button size='icon' variant='secondary' className="rounded-2xl size-14 bg-background/50 border-none hover:bg-background" asChild>
                      <a href="https://github.com/Allarezeroes26" target='_blank' rel="noopener noreferrer">
                        <Github className="size-6"/>
                      </a>
                    </Button>
                    <Button size='icon' variant='secondary' className="rounded-2xl size-14 bg-background/50 border-none hover:bg-background" asChild>
                      <a href="https://www.linkedin.com/in/john-erwin-bacani-90853a359" target='_blank' rel="noopener noreferrer">
                        <Linkedin className="size-6"/>
                      </a>
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Combined Theme and Tech Stack Column */}
          <div className='flex flex-col gap-4 h-full overflow-hidden'>
            
            {/* Redesigned Theme Switcher */}
            <Card ref={bento1} className='p-2 rounded-4xl bg-secondary border-none shadow-none'>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="font-display font-bold text-lg">Appearance</span>
                  <div className="flex bg-background/40 p-1.5 rounded-2xl border border-white/5 gap-1 shadow-inner">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${theme === 'light' ? 'bg-orange-500 text-white shadow-md scale-105' : 'text-muted-foreground opacity-50 hover:opacity-100'}`}
                    >
                      <Sun className="size-4" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Light</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${theme === 'dark' ? 'bg-orange-500 text-white shadow-md scale-105' : 'text-muted-foreground opacity-50 hover:opacity-100'}`}
                    >
                      <Moon className="size-4" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Dark</span>
                    </button>
                  </div>
                </div>
            </Card>
            
            {/* Tech Stack Card with internal scroll to fit screen */}
            <Card ref={bento2} className='flex-1 p-8 rounded-4xl bg-secondary border-none shadow-none flex flex-col overflow-hidden'>
              <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between space-y-0">
                <h2 className='font-display text-2xl md:text-3xl font-bold'>Tech Stack</h2>
                <span className="text-[10px] font-mono opacity-30 italic">SCROLL TO DISCOVER</span>
              </CardHeader>
              
              <CardContent className="p-0 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-4 gap-4">
                  {resume.techStack.map((stack) => (
                    <Tooltip key={stack.techName}>
                      <TooltipTrigger asChild>
                        <div className='aspect-square flex items-center justify-center bg-background/30 rounded-3xl hover:bg-orange-500/10 transition-all duration-300 group border border-white/5'>
                          <StackIcon 
                            name={stack.techName} 
                            className="size-8 lg:size-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-orange-500 border-none font-bold text-white">
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