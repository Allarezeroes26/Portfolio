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
  const { theme, setTheme } = useTheme();
  
  const bento1 = useRef();
  const bento2 = useRef();
  const mainIntro = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "back.out(1.2)" }
    });

    tl.from(mainIntro.current, {
      x: -100,
      opacity: 0,
    })
    .from(bento1.current, {
      y: -50,
      opacity: 0,
    }, "-=0.7")
    .from(bento2.current, {
      y: 50,
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
      y: 8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  return (
    <>
      <div className='flex flex-col min-h-screen w-full items-center p-5 justify-center'>
        <div className='grid gap-4 grid-cols-1 lg:grid-cols-[1.6fr_1fr] w-full max-w-6xl'>
          
          {/* LEFT COLUMN: Main Introduction */}
          <Card ref={mainIntro} className='rounded-4xl p-6 md:p-10 bg-secondary w-full border-none shadow-none flex flex-col justify-between min-h-[500px]'>
            <CardHeader className='flex flex-row justify-between items-center p-0 space-y-0'>
              <div className="shrink-0">
                <img src={Me} className='profile-img w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-background' alt="Profile" />
              </div>
              <div className='flex items-center gap-2 bg-background/50 px-4 py-1.5 rounded-full border border-border/10'>
                <span className={`h-2.5 w-2.5 rounded-full inline-block ${resume.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <p className='font-paragraph text-xs md:text-sm font-medium'>
                  {resume.available ? 'Available for work' : 'Busy'}
                </p>
              </div>
            </CardHeader>

            <CardContent className='p-0 flex flex-col gap-8'>
              <h1 className='intro-text font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight'>
                Hi, I'm {resume.nickName} <span className='animate-wiggle inline-block origin-bottom-right'>👋</span> <br />
                <span className="text-muted-foreground">An </span>
                <span className='text-orange-500'>{resume.position}</span> 
                <span className="text-muted-foreground"> based in </span>{resume.address}.
              </h1>

              <div className='action-btns flex flex-col sm:flex-row gap-4 justify-between w-full items-center'>
                <Button 
                  size='lg' 
                  className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 rounded-2xl px-8 h-14 text-lg transition-all"
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                    <Download className="mr-2 h-5 w-5" /> Download CV
                  </a>
                </Button>

                <div className='flex flex-row gap-3'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='icon' variant='outline' className="rounded-2xl size-12 bg-background/50 border-none hover:bg-background transition-colors" asChild>
                        <a href="https://github.com/Allarezeroes26" target='_blank' rel="noopener noreferrer">
                          <Github className="size-6"/>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>GitHub</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='icon' variant='outline' className="rounded-2xl size-12 bg-background/50 border-none hover:bg-background transition-colors" asChild>
                        <a href="https://www.linkedin.com/in/john-erwin-bacani-90853a359" target='_blank' rel="noopener noreferrer">
                          <Linkedin className="size-6"/>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>LinkedIn</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT COLUMN: Stack and Toggle */}
          <div className='flex flex-col gap-4'>
            
            {/* Theme Toggle Bento Box */}
            <Card 
              ref={bento1}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className='cursor-pointer hover:bg-accent/50 transition-all p-6 rounded-4xl bg-secondary border-none shadow-none flex items-center justify-between group'
            >
              <div className='flex items-center gap-4'>
                <div className="p-3 bg-background rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">
                  { theme === "dark" ? <Moon className='size-6 text-orange-500'/> : <Sun className='size-6 text-orange-500'/> }
                </div>
                <div>
                  <p className='font-display font-medium'>Appearance</p>
                  <p className="text-xs text-muted-foreground">{ theme === "dark" ? "Dark Mode" : "Light Mode" }</p>
                </div>
              </div>
              <Badge variant="outline" className="opacity-40 font-mono text-[10px]">THEME</Badge>
            </Card>
            
            {/* Tech Stack Bento Box */}
            <Card ref={bento2} className='flex-1 p-6 md:p-8 rounded-4xl bg-secondary border-none shadow-none flex flex-col overflow-hidden'>
              <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between space-y-0">
                <h2 className='font-display text-2xl md:text-3xl'>Tech Stack</h2>
                <span className="text-xs font-mono opacity-40">({resume.techStack.length} tools)</span>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* The Grid: Perfectly aligned tiles */}
                <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3">
                  {resume.techStack.map((stack) => (
                    <Tooltip key={stack.techName}>
                      <TooltipTrigger asChild>
                        <div className='aspect-square flex items-center justify-center bg-background/40 rounded-2xl hover:bg-orange-500/10 transition-all duration-300 group cursor-default border border-transparent hover:border-orange-500/20'>
                          <StackIcon 
                            name={stack.techName} 
                            className="size-7 md:size-9 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-orange-500 text-white border-none">
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

      {/* Sections Below */}
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default Homepage;