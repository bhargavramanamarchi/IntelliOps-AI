import React from 'react';
import { ArrowRightLeft, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-10 md:py-16 text-center">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-brand-purple/10 blur-[100px] animate-slow-pulse" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 h-[250px] w-[250px] rounded-full bg-brand-cyan/10 blur-[80px] animate-slow-pulse" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-1.5 text-xs text-brand-cyan mb-6 hover:bg-brand-cyan/10 transition-all cursor-default">
          <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="font-semibold tracking-wide uppercase">Next-Gen Autonomous ERP</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
          <span className="block mb-2">Autonomous</span>
          <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent drop-shadow-sm">
            Procurement Workflow
          </span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-slate-300 font-medium leading-relaxed flex items-center justify-center gap-3">
          <span>One Request.</span>
          <span className="text-brand-purple font-semibold flex items-center gap-1">
            <ArrowRightLeft className="h-4 w-4" /> Multiple AI Agents.
          </span>
        </p>

        {/* Problem statement callout */}
        <div className="mx-auto mt-8 max-w-2xl text-xs sm:text-sm text-slate-450 border border-white/5 bg-slate-900/40 rounded-xl p-4 backdrop-blur-sm">
          <span className="font-semibold text-brand-purple">The Problem:</span> Manufacturing SMEs handle purchasing manually, delaying inventory validation, vendor comparison, and PO routing.
          <span className="mx-2 text-slate-700">|</span>
          <span className="font-semibold text-brand-cyan">Our MVP Solution:</span> Agentic AI orchestrates requirements, checks inventory, scores suppliers, and drafts purchase orders in seconds.
        </div>

      </div>
    </div>
  );
};
