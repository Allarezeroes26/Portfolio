import React, { useLayoutEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".contact-header", { opacity: 0, y: 30 });
      gsap.set(".contact-card", { opacity: 0, y: 40 });
      gsap.set(".form-item", { opacity: 0, x: -10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",          
          toggleActions: "play none none none",
        }
      });

      tl.to(".contact-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(".contact-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(".form-item", {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='flex items-center min-h-[80vh] justify-center w-full p-5 lg:p-10 mb-20'>
      <div className='w-full max-w-6xl'>
        
        <div className='contact-header mb-10 text-center lg:text-left'>
          <h1 className='font-display text-4xl md:text-6xl font-bold mb-4 tracking-tighter'>Get in Touch</h1>
          <p className='text-muted-foreground max-w-md text-sm md:text-base'>
            Have a project in mind or just want to say hi? Feel free to send a message!
          </p>
        </div>

        <Card className='contact-card rounded-4xl p-4 md:p-6 bg-secondary border-none shadow-none'>
          <CardHeader>
            <CardTitle className="font-display text-orange-500 text-2xl">Send a Message</CardTitle>
            <CardDescription>I'll try to give a response as soon as possible.</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form className='grid gap-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='form-item space-y-2'>
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest opacity-70">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-background/50 border-none rounded-xl focus-visible:ring-orange-500/20"
                  />
                </div>
                <div className='form-item space-y-2'>
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest opacity-70">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-background/50 border-none rounded-xl focus-visible:ring-orange-500/20"
                  />
                </div>
              </div>

              <div className='form-item space-y-2'>
                <Label htmlFor="subject" className="text-xs uppercase tracking-widest opacity-70">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Project Inquiry" 
                  className="bg-background/50 border-none rounded-xl focus-visible:ring-orange-500/20"
                />
              </div>

              <div className='form-item space-y-2'>
                <Label htmlFor="message" className="text-xs uppercase tracking-widest opacity-70">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell me about your project..." 
                  className="min-h-[150px] bg-background/50 border-none rounded-2xl focus-visible:ring-orange-500/20 resize-none"
                />
              </div>

              <div className='form-item'>
                <Button size="lg" className="w-full md:w-fit bg-orange-500 text-secondary gap-2 rounded-xl px-8 transition-all hover:scale-105 active:scale-95 hover:bg-orange-600">
                  Send Message <SendHorizonal size={18} />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;