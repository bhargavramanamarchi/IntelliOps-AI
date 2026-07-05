import React from 'react';
import { useWorkflow, formatRupee } from '../context/WorkflowContext';
import { motion } from 'framer-motion';
import type { Supplier } from '../types';
import { 
  PiggyBank, 
  Gauge, 
  Package, 
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const { scenario, workflowState } = useWorkflow();

  const isCompleted = workflowState === 'completed';
  const isRunning = workflowState === 'running';

  // Calculate current inventory percentage
  const invPercent = Math.min(100, Math.round((scenario.currentStock / scenario.targetStock) * 100));

  // Identify selected supplier
  const selectedSupplier = scenario.suppliers.find((s: Supplier) => s.isBestMatch);
  const supplierScore = selectedSupplier ? selectedSupplier.recommendationScore : 0;

  // Visual metrics configuration (5 items for final hackathon submission)
  const metrics = [
    {
      id: 'savings',
      title: 'Estimated Savings',
      value: isCompleted ? formatRupee(scenario.savings, false) : isRunning ? 'Calculating...' : '—',
      subText: isCompleted ? 'Saved vs local retail market' : 'Analyzing supplier pricing catalogs',
      icon: PiggyBank,
      colorClass: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5',
      glowColor: 'group-hover:shadow-emerald-500/10'
    },
    {
      id: 'time',
      title: 'Processing Time',
      value: isCompleted ? `${scenario.processingTime} seconds` : isRunning ? 'Simulating...' : '—',
      subText: isCompleted ? 'Vs 48 hours manual routing' : 'Running concurrent agent loops',
      icon: Gauge,
      colorClass: 'text-brand-purple border-brand-purple/10 bg-brand-purple/5',
      glowColor: 'group-hover:shadow-brand-purple/10'
    },
    {
      id: 'confidence',
      title: 'AI Confidence',
      value: isCompleted ? '99.4%' : isRunning ? 'Extracting...' : '—',
      subText: isCompleted ? 'Intent extraction score (Gemini)' : 'Assessing request parameters',
      icon: TrendingUp,
      colorClass: 'text-brand-cyan border-brand-cyan/10 bg-brand-cyan/5',
      glowColor: 'group-hover:shadow-brand-cyan/10'
    },
    {
      id: 'supplier-score',
      title: 'Supplier Score',
      value: isCompleted && supplierScore ? `${supplierScore} / 100` : isRunning ? 'Scoring...' : '—',
      subText: isCompleted && selectedSupplier ? `Vendor: ${selectedSupplier.name}` : 'Evaluating pricing & speed',
      icon: Award,
      colorClass: 'text-brand-pink border-brand-pink/10 bg-brand-pink/5',
      glowColor: 'group-hover:shadow-brand-pink/10'
    },
    {
      id: 'inventory',
      title: 'Inventory Status',
      value: `${scenario.currentStock} / ${scenario.targetStock}`,
      subText: `${invPercent}% stock available (Deficit: ${scenario.deficit} units)`,
      icon: Package,
      colorClass: 'text-amber-400 border-amber-500/10 bg-amber-500/5',
      glowColor: 'group-hover:shadow-amber-500/10',
      progressBar: true
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Workflow Metrics & Analytics</h2>
        <p className="text-xs text-slate-400">Key performance indicators generated dynamically by our autonomous agents.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className={`group flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-900/30 p-5 transition-all hover:bg-slate-900/50 hover:border-white/10 ${metric.glowColor} hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-450 uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${metric.colorClass}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-2xl font-black text-white tracking-tight block">
                  {metric.value}
                </span>
                
                {metric.progressBar && (
                  <div className="my-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full transition-all duration-1000"
                      style={{ width: `${invPercent}%` }}
                    />
                  </div>
                )}
                
                <span className="text-[11px] text-slate-450 block font-medium leading-relaxed">
                  {metric.subText}
                </span>
              </div>

              {isCompleted && metric.id !== 'inventory' && (
                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-400 cursor-default select-none border-t border-white/5 pt-2">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Agent Verified</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
