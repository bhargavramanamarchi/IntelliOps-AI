import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { Shield, Moon, Cpu, User, Key, Check, X, Sliders } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    geminiApiKey, 
    setGeminiApiKey, 
    showSettingsDrawer, 
    setShowSettingsDrawer 
  } = useWorkflow();

  const [tempKey, setTempKey] = useState(geminiApiKey);

  useEffect(() => {
    setTempKey(geminiApiKey);
  }, [geminiApiKey]);

  const handleSaveKey = () => {
    setGeminiApiKey(tempKey);
    setShowSettingsDrawer(false);
  };

  const handleClearKey = () => {
    setTempKey('');
    setGeminiApiKey('');
    setShowSettingsDrawer(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan text-white shadow-lg shadow-brand-purple/20">
              <Cpu className="h-5 w-5 animate-pulse" />
              <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-500" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white bg-clip-text">
                AgentOps <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">AI</span>
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-cyan uppercase tracking-wider">
                <span className="h-1 w-1 rounded-full bg-brand-cyan animate-ping" />
                Autonomous Procurement
              </div>
            </div>
          </div>

          {/* Center: Badge */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-brand-purple/20 bg-brand-purple/5 px-3 py-1 text-xs text-purple-300">
            <Shield className="h-3.5 w-3.5 text-brand-purple" />
            <span className="font-medium">AI Hackathon MVP</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
          </div>

          {/* Right: Mock Controls & API settings */}
          <div className="flex items-center gap-4">
            
            {/* Settings Trigger Icon */}
            <button
              type="button"
              onClick={() => setShowSettingsDrawer(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer ${
                geminiApiKey 
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-md' 
                  : 'border-white/10 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              title="Configure API Settings"
              aria-label="Open settings drawer"
            >
              <Key className="h-4 w-4" />
            </button>

            {/* Theme Toggle Placeholder */}
            <button 
              type="button"
              className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors duration-200 cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle visual theme"
            >
              <Moon className="h-4 w-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </div>
            </button>

            {/* User Profile Info */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
              <div className="hidden lg:block text-right">
                <div className="text-xs font-semibold text-slate-200">Bhargav</div>
                <div className="text-[10px] text-slate-400">Procurement lead</div>
              </div>
              <button 
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-850 hover:bg-slate-800 border border-white/10 text-brand-purple hover:text-brand-cyan transition-all duration-300 cursor-pointer"
                aria-label="User profile settings"
              >
                <User className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Slide-Over Settings Drawer Overlay */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop mask */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowSettingsDrawer(false)}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-500 ease-in-out">
              <div className="flex h-full flex-col border-l border-white/10 bg-slate-950 p-6 shadow-2xl glass-panel">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-brand-cyan" />
                    <h2 className="text-base font-bold text-white">System Configurations</h2>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg text-slate-450 hover:text-white hover:bg-slate-900 p-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-purple"
                    onClick={() => setShowSettingsDrawer(false)}
                    aria-label="Close configuration settings"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                  
                  {/* Gemini API Key Box */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                      <Key className="h-4 w-4 text-brand-purple" />
                      Google Gemini API Key
                    </h3>
                    <p className="text-xs text-slate-400 leading-normal">
                      Provide your Google AI Studio API key. The Requirement Agent will use the `gemini-1.5-flash` model to analyze manager requests in real time. Keys are saved securely in your browser's local storage and never sent to external servers.
                    </p>
                    
                    <div className="space-y-2">
                      <input
                        type="password"
                        placeholder={geminiApiKey ? "••••••••••••••••••••••••••••" : "Enter API Key (AIzaSy...)"}
                        value={tempKey}
                        onChange={(e) => setTempKey(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-white placeholder-slate-650 focus:border-brand-purple/50 focus:outline-none focus:ring-1 focus:ring-brand-purple"
                      />
                      
                      <div className="flex gap-2 justify-end">
                        {geminiApiKey && (
                          <button
                            type="button"
                            onClick={handleClearKey}
                            className="rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold text-red-400 cursor-pointer transition-colors"
                          >
                            Clear Key
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleSaveKey}
                          className="rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan px-4 py-1.5 text-[11px] font-bold text-white hover:opacity-90 shadow-md cursor-pointer transition-opacity flex items-center gap-1"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {geminiApiKey ? 'Update Key' : 'Save Key'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Status checklist for Hackathon presentation */}
                  <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4 space-y-3">
                    <span className="font-bold text-xs text-slate-350 uppercase tracking-wider block">
                      MVP Active Checklist
                    </span>
                    <div className="space-y-2 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${geminiApiKey ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span>Gemini Real-Time parsing: {geminiApiKey ? 'Active (Real AI)' : 'Offline Simulation Fallback'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>B2B Datasets (GSTIN, HSN): Enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Microphone Transcriptions: Enabled</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="pt-5 border-t border-white/5 text-[10px] text-slate-500 font-medium">
                  AgentOps AI Drawer Panel • Press ESC or click mask to dismiss.
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
