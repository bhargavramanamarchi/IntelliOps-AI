import React, { useEffect, useRef } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import type { Agent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Database, 
  Scale, 
  FileCheck, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Terminal
} from 'lucide-react';

const AGENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  requirement: FileText,
  inventory: Database,
  supplier: Scale,
  po: FileCheck
};

export const WorkflowGrid: React.FC = () => {
  const { agents } = useWorkflow();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Agentic Orchestration Chain</h2>
          <p className="text-xs text-slate-400">Watch the agents run in sequence, sharing data payloads downstream.</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="h-3 w-3" />
            <span>Real-time Simulation</span>
          </div>
        </div>
      </div>

      {/* Grid container with connector indicator support */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 relative">
        {agents.map((agent, index) => {
          const isLast = index === agents.length - 1;
          return (
            <React.Fragment key={agent.id}>
              <div className="relative flex flex-col">
                <AgentCard agent={agent} index={index} />
                
                {/* Horizontal flow arrow for desktop */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 items-center justify-center pointer-events-none">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500 ${
                      agent.status === 'success'
                        ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-md shadow-brand-cyan/20'
                        : agent.status === 'running'
                        ? 'bg-brand-purple/10 border-brand-purple/40 text-brand-purple animate-pulse'
                        : 'bg-slate-900 border-white/5 text-slate-600'
                    }`}>
                      <ArrowRight className={`h-4 w-4 ${agent.status === 'running' ? 'animate-bounce' : ''}`} />
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, index }) => {
  const { retryAgentChain } = useWorkflow();
  const IconComponent = AGENT_ICONS[agent.id] || FileText;
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [agent.logs]);

  // Card border status styling
  const getCardStyle = () => {
    switch (agent.status) {
      case 'running':
        return 'border-brand-purple bg-slate-900/80 shadow-lg shadow-brand-purple/10 ring-1 ring-brand-purple/35';
      case 'success':
        return 'border-brand-cyan/40 bg-slate-950/90 shadow-md shadow-brand-cyan/5';
      case 'error':
        return 'border-rose-500/50 bg-slate-950/90 shadow-lg shadow-rose-500/10 ring-1 ring-rose-550/35 animate-pulse';
      default:
        return 'border-white/5 bg-slate-900/30 opacity-75';
    }
  };

  // Status Badge styling
  const renderBadge = () => {
    switch (agent.status) {
      case 'running':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 px-2 py-0.5 text-[10px] font-bold text-purple-300">
            <Loader2 className="h-2.5 w-2.5 animate-spin" />
            Active
          </span>
        );
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            <CheckCircle2 className="h-2.5 w-2.5" />
            Approved
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold text-rose-450">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-bold text-slate-400">
            Idle
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`flex flex-col h-full rounded-2xl border p-5 transition-all duration-300 ${getCardStyle()}`}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
          agent.status === 'running'
            ? 'bg-brand-purple/20 border-brand-purple text-purple-300'
            : agent.status === 'success'
            ? 'bg-brand-cyan/15 border-brand-cyan/35 text-brand-cyan'
            : agent.status === 'error'
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
            : 'bg-slate-950 border-white/5 text-slate-500'
        }`}>
          <IconComponent className="h-5 w-5" />
        </div>
        {renderBadge()}
      </div>

      <div className="flex-1 mb-4">
        <h4 className="font-bold text-white text-sm">{agent.name}</h4>
        <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wider block mb-1">
          {agent.role}
        </span>
        <p className="text-xs text-slate-400 leading-normal">
          {agent.description}
        </p>
      </div>

      {/* Dynamic Terminal / Output View */}
      <AnimatePresence>
        {(agent.status === 'running' || agent.status === 'success' || agent.status === 'error') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border border-white/5 rounded-lg bg-slate-950 shadow-inner"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/60 px-3 py-1.5 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-[9px]">
                <Terminal className="h-3 w-3 text-brand-cyan" />
                {agent.id}_agent.log
              </span>
              <span className={`h-1.5 w-1.5 rounded-full bg-brand-cyan ${agent.status === 'running' ? 'animate-pulse' : ''}`} />
            </div>

            {/* Terminal Logs & Output */}
            <div className="p-3 font-mono text-[10px] leading-relaxed max-h-[180px] overflow-y-auto space-y-1">
              
              {/* Dynamic Logs */}
              {agent.logs.map((log, idx) => (
                <div key={idx} className="text-slate-350 select-text">
                  {log}
                </div>
              ))}

              {/* Success Output JSON Payload */}
              {agent.status === 'success' && agent.output && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 pt-3 border-t border-white/5 space-y-1.5"
                >
                  <span className="text-brand-pink block font-bold text-[9px] uppercase tracking-wider">
                    📤 Output Payload JSON:
                  </span>
                  <pre className="text-brand-cyan bg-slate-900/50 p-2 rounded border border-white/5 overflow-x-auto text-[9px] select-text">
                    {agent.output}
                  </pre>
                </motion.div>
              )}

              {/* Error Output Retry UI */}
              {agent.status === 'error' && (
                <div className="mt-3 pt-3 border-t border-rose-500/20 space-y-2">
                  <span className="text-rose-400 font-bold block text-[9px] uppercase tracking-wider">
                    ⚠️ Extraction Failed
                  </span>
                  <button
                    type="button"
                    onClick={retryAgentChain}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 text-[10px] text-rose-400 hover:bg-rose-500/20 transition-all font-bold cursor-pointer"
                  >
                    Retry Requirement Agent
                  </button>
                </div>
              )}

              {agent.status === 'running' && (
                <div className="flex items-center gap-1.5 text-brand-purple font-semibold animate-pulse mt-1">
                  <span>█</span>
                  <span>Executing tasks...</span>
                </div>
              )}
              
              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
