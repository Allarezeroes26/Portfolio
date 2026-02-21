import React, { useRef } from 'react';
import resume from '../jsonResume/resume.json';
import Me from '../assets/me.jpg';
import { Download, Github, Linkedin, SquareArrowOutUpRight} from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import JobFu from '../jsonResume/ProjectPics/JobfuShowcase.png'
import Allkit from '../jsonResume/ProjectPics/AllkitShowcase.png'
import Todo from '../jsonResume/ProjectPics/TodoShowcase.png'
import About from './About';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Projects from './Projects';
import Contact from './Contact';
import StackIcon from 'tech-stack-icons';

gsap.registerPlugin(useGSAP,ScrollTrigger,TextPlugin);

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
    }, "-=0.8")

    .from(projectShowcase.current, {
      x: 100,
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

    gsap.to(".shrink-0 img", {
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
      <div className='flex flex-col min-h-screen w-full items-center p-5 justify-center'>
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] w-full max-w-6xl'>
    
          <Card ref={mainIntro} className='rounded-4xl p-6 md:p-10 bg-secondary w-full border-none shadow-none flex flex-col justify-between'>
            <CardHeader className='flex flex-row justify-between items-center p-0 space-y-0'>
              <div className="shrink-0">
                <img src={Me} className='w-15 h-15 rounded-lg object-cover' alt="Profile" />
              </div>
              <div className='flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full'>
                <span className={`h-2 w-2 rounded-full inline-block ${resume.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <p className='font-paragraph text-xs md:text-sm font-medium'>
                  {resume.available ? 'Available' : 'Not Available'}
                </p>
              </div>
            </CardHeader>

            <CardContent className='p-0 flex flex-col gap-5 md:gap-22'>
              <h1 className='intro-text font-display text-3xl md:text-4xl lg:text-5xl leading-tight'>
                Hi, I'm {resume.nickName} <span className='animate-wiggle inline-block origin-bottom-right'>👋</span> <br />
                <span className="text-muted-foreground">An </span>
                <span className='text-orange-500'>{resume.position}</span> 
                <span className="text-muted-foreground"> based in </span>{resume.address}.
              </h1>

              <div className='action-btns flex flex-col sm:flex-row gap-5 justify-between w-full items-center'>
                <div className='flex flex-row items-center gap-3 w-full sm:w-auto'>
                  <Button 
                    size='lg' 
                    className="flex-1 bg-orange-500 text-secondary hover:bg-orange-300 sm:flex-none"
                    asChild
                  >
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                      <Download /> Resume
                    </a>
                  </Button>
                </div>

                <div className='flex flex-row justify-center gap-3'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size='icon' variant='ghost' className="rounded-full" asChild>
                      <a href="https://github.com/Allarezeroes26" target='_blank' rel="noopener noreferrer">
                        <Github className="size-5"/>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size='icon' variant='ghost' className="rounded-full" asChild>
                      <a href="https://linkedin.com/in/erwin-bacani-90853a359" target='_blank' rel="noopener noreferrer">
                        <Linkedin className="size-5"/>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
              </div>
              </div>
            </CardContent>
          </Card>

          <div ref={bento1} className='flex flex-col gap-5'>
            <Card 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className='flex-1 cursor-pointer hover:bg-accent/50 transition-all p-6 md:p-8 rounded-4xl bg-secondary border-none shadow-none flex flex-col justify-center gap-4'
            >
              <div className="p-3 bg-background w-fit rounded-2xl shadow-sm">
                { theme === "dark" ? <Moon className='size-6'/> : <Sun className='size-6'/> }
              </div>
              <div>
                <p className='font-display font-medium'>
                  { theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode" }
                </p>
                <p className="text-xs text-muted-foreground">Better for your eyes</p>
              </div>
            </Card>
            
            <Card ref={bento2} className='flex-1 p-6 md:p-8 rounded-4xl bg-secondary border-none shadow-none flex flex-col justify-center'>
              <CardHeader className="p-0 mb-2">
                <h2 className='font-display text-2xl md:text-3xl'>Tech Stack</h2>
              </CardHeader>
              <CardContent className="p-0 flex flex-row gap-5 flex-wrap">
                {resume.techStack.map((stack) => (
                  <Tooltip key={stack.techName}>
                    <TooltipTrigger>
                      <Badge 
                        className='p-2 bg-background/50 hover:bg-orange-500/20 transition-colors border-none'
                      >
                        <StackIcon 
                          name={stack.techName} 
                          className="size-5 grayscale hover:grayscale-0 transition-all" 
                        />
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>{stack.techName}</TooltipContent>
                  </Tooltip>
                ))}
              </CardContent>
            </Card>
          </div>

          <div ref={projectShowcase} className='p-0'>
            <Card className='h-full bg-secondary shadow-none border-none'>
                <CardHeader>
                  <h1 className='font-display text-3xl'>My Projects</h1>
                </CardHeader>
                <CardContent className='grid grid-cols-1 items-center justify-items-center gap-4'>
                  {[
                    { img: JobFu, to: "/projects/jobfu" },
                    { img: Allkit, to: "/projects/allkit" },
                    { img: Todo, to: "/projects/todo" }
                  ].map((proj, i) => (
                    <div 
                      key={i}
                      className="group relative w-full max-w-[240px] aspect-video overflow-hidden rounded-2xl"
                    >
                      <img 
                        src={proj.img} 
                        className='h-full w-full object-cover backdrop-blur-md grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40' 
                      />
                      
                      <button onClick={scrollToProjects} className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                        <span className='font-display text-sm font-bold tracking-wider text-primary'>
                          VIEW PROJECT
                        </span>
                      </button>
                    </div>
                  ))}

                  <div className="w-full max-w-[240px]">
                    <Button onClick={scrollToProjects} className='font-paragraph text-primary hover:text-secondary flex w-full p-4 justify-between bg-background rounded-xl flex-row mt-2'>  
                      <p className='font-light'>View All</p>
                      <SquareArrowOutUpRight size={18} />
                    </Button>
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