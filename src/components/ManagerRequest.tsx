import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { Play, RotateCcw, Sparkles, Mic, Languages } from 'lucide-react';

const LANGUAGES = [
  { code: 'en-IN', label: 'English (India)' },
  { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
  { code: 'te-IN', label: 'తెలుగు (Telugu)' },
  { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml-IN', label: 'മലയാളം (Malayalam)' }
];

export const ManagerRequest: React.FC = () => {
  const {
    inputText,
    setInputText,
    workflowState,
    triggerWorkflow,
    resetWorkflow,
    selectScenario,
    scenario,
    progressPercent,
    addToast
  } = useWorkflow();

  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recObj = new SpeechRecognition();
      recObj.continuous = false;
      recObj.interimResults = false;
      
      recObj.onstart = () => {
        setIsListening(true);
        addToast("Microphone active. Listening...", "info");
      };

      recObj.onend = () => {
        setIsListening(false);
      };

      recObj.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          addToast("Speech captured successfully!", "success");
        }
      };

      recObj.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          addToast("Microphone access denied. Please grant permissions.", "error");
        } else {
          addToast(`Voice capture error: ${event.error}`, "error");
        }
      };

      setRecognitionInstance(recObj);
    }
  }, []);

  // Update language when selector changes
  useEffect(() => {
    if (recognitionInstance) {
      recognitionInstance.lang = selectedLang;
    }
  }, [selectedLang, recognitionInstance]);

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || workflowState === 'running') return;
    triggerWorkflow(inputText);
  };

  const handleToggleVoice = () => {
    if (!recognitionInstance) {
      addToast("Speech recognition is not supported in this browser. Try Chrome or Edge.", "error");
      return;
    }

    if (isListening) {
      recognitionInstance.stop();
    } else {
      try {
        recognitionInstance.start();
      } catch (err) {
        console.error("Recognition start error:", err);
      }
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-12">
      <div className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
        workflowState === 'running' 
          ? 'glass-panel-glow' 
          : 'glass-panel border-white/10 shadow-2xl shadow-black/45'
      }`}>
        {/* Glow border line on top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-brand-cyan" />
              Procurement Control Room
            </h3>
            <p className="text-xs text-slate-400">
              Voice or type your purchase request. Gemini AI and autonomous agent lines handle stock check and GST PO routing.
            </p>
          </div>
          
          {/* Quick Scenario Selectors */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => selectScenario('wood')}
              disabled={workflowState === 'running'}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition-all ${
                scenario.id === 'wood'
                  ? 'bg-brand-purple/20 border-brand-purple text-purple-300'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/15 cursor-pointer'
              }`}
            >
              🪵 Teak Wood
            </button>
            <button
              onClick={() => selectScenario('steel')}
              disabled={workflowState === 'running'}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition-all ${
                scenario.id === 'steel'
                  ? 'bg-brand-purple/20 border-brand-purple text-purple-300'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/15 cursor-pointer'
              }`}
            >
              ⚙️ Mild Steel
            </button>
            <button
              onClick={() => selectScenario('chairs')}
              disabled={workflowState === 'running'}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition-all ${
                scenario.id === 'chairs'
                  ? 'bg-brand-purple/20 border-brand-purple text-purple-300'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-white/15 cursor-pointer'
              }`}
            >
              🪑 Office Chairs
            </button>
          </div>
        </div>

        <form onSubmit={handleExecute} className="space-y-4">
          <div className="relative">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={workflowState === 'running'}
              placeholder="Need 500 Teak Wooden Boards before Friday"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 pr-12 font-sans text-sm text-white placeholder-slate-500 focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 focus:outline-none transition-all disabled:opacity-75 disabled:cursor-not-allowed resize-none"
              aria-label="Procurement Request Text"
            />
            {workflowState === 'running' && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                <span className="text-xs text-slate-400 bg-slate-900 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
                  Agents operating. Please wait...
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Left side: Voice Integration controls */}
            <div className="flex items-center gap-2 self-start">
              {/* Mic toggle */}
              <button
                type="button"
                onClick={handleToggleVoice}
                disabled={workflowState === 'running'}
                className={`group flex h-10 w-10 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
                title="Transcribe request via microphone"
                aria-label="Start voice recognition"
              >
                {isListening ? (
                  <Mic className="h-4.5 w-4.5 text-rose-400 animate-ping" />
                ) : (
                  <Mic className="h-4.5 w-4.5" />
                )}
              </button>

              {/* Language selection dropdown */}
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-2.5 py-2 text-slate-400">
                <Languages className="h-3.5 w-3.5" />
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  disabled={workflowState === 'running' || isListening}
                  className="bg-transparent text-xs text-slate-350 focus:outline-none cursor-pointer border-none"
                  role="combobox"
                  aria-label="Select spoken language"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-slate-950 text-white text-xs">
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right side: Execution triggers */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {workflowState !== 'idle' && (
                <button
                  type="button"
                  onClick={resetWorkflow}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-850 px-5 py-2.5 text-xs font-semibold text-slate-350 hover:text-white transition-all cursor-pointer"
                  aria-label="Reset workspace fields"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Board
                </button>
              )}

              <button
                type="submit"
                disabled={!inputText.trim() || workflowState === 'running'}
                className={`flex items-center justify-center gap-2.5 rounded-xl px-7 py-2.5 text-xs font-bold text-white shadow-xl transition-all cursor-pointer w-full sm:w-auto ${
                  !inputText.trim() || workflowState === 'running'
                    ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan hover:opacity-95 shadow-brand-purple/20 hover:shadow-brand-purple/35 transform hover:-translate-y-0.5'
                }`}
                aria-label="Execute procurement workflow"
              >
                <Play className={`h-3.5 w-3.5 ${workflowState === 'running' ? 'animate-spin' : ''}`} />
                {workflowState === 'running' ? 'Executing AI Agent Cluster...' : 'Execute Procurement Workflow'}
              </button>
            </div>
          </div>
        </form>

        {/* Global Progress Bar Bar widget */}
        {workflowState === 'running' && (
          <div className="mt-6 border-t border-white/5 pt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 animate-pulse font-semibold">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
                AI Workflow Running...
              </span>
              <span className="font-mono font-bold text-brand-cyan">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
