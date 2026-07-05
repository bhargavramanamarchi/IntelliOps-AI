import { useWorkflow, formatRupee } from '../context/WorkflowContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Check, Info } from 'lucide-react';
import type { Supplier } from '../types';

export const SupplierTable: React.FC = () => {
  const { scenario, visibleSections } = useWorkflow();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
      <AnimatePresence>
        {visibleSections.supplierTable && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-2xl"
          >
            {/* Table Header Callout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 bg-slate-900/60 p-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-brand-cyan" />
                  Supplier Recommendation Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated using deep vendor compliance audits, real-time pricing queries, and SLA validation.
                </p>
              </div>
              <div className="rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1.5 text-xs text-cyan-300 font-semibold flex items-center gap-1.5 self-start">
                <Info className="h-3.5 w-3.5" />
                Selected: {scenario.suppliers.find((s: Supplier) => s.isBestMatch)?.name}
              </div>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4 pl-6">Supplier</th>
                    <th className="p-4">Unit Price</th>
                    <th className="p-4">Est. Delivery</th>
                    <th className="p-4">Reputation Rating</th>
                    <th className="p-4">Algorithm Score</th>
                    <th className="p-4 pr-6 text-right">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {scenario.suppliers.map((supplier: Supplier) => {
                    return (
                      <tr 
                        key={supplier.id}
                        className={`transition-colors group hover:bg-slate-800/30 ${
                          supplier.isBestMatch 
                            ? 'bg-brand-purple/5' 
                            : ''
                        }`}
                      >
                        {/* Supplier Info */}
                        <td className="p-4 pl-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-white group-hover:text-brand-cyan transition-colors">
                              {supplier.name}
                            </span>
                            <span className="text-[11px] text-slate-450 mt-0.5 line-clamp-1 max-w-sm">
                              {supplier.notes}
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="p-4 font-mono font-medium text-slate-200">
                          {formatRupee(supplier.pricePerUnit)}
                        </td>

                        {/* Delivery Days */}
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-250">
                              {supplier.deliveryDays} {supplier.deliveryDays === 1 ? 'day' : 'days'}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              FOB Destination
                            </span>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="font-bold text-slate-250">{supplier.rating}</span>
                            <span className="text-slate-600 text-[11px]">/ 5</span>
                          </div>
                        </td>

                        {/* Recommendation Score Gauge */}
                        <td className="p-4">
                          <div className="flex items-center gap-3 max-w-[120px]">
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  supplier.isBestMatch 
                                    ? 'bg-gradient-to-r from-brand-cyan to-brand-purple' 
                                    : 'bg-slate-500'
                                }`}
                                style={{ width: `${supplier.recommendationScore}%` }}
                              />
                            </div>
                            <span className={`font-mono text-xs font-bold ${
                              supplier.isBestMatch ? 'text-brand-cyan' : 'text-slate-400'
                            }`}>
                              {supplier.recommendationScore}%
                            </span>
                          </div>
                        </td>

                        {/* Badge / Recommendation Decision */}
                        <td className="p-4 pr-6 text-right">
                          {supplier.isBestMatch ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/35 px-3 py-1 text-xs font-bold text-emerald-400 shadow-sm shadow-emerald-500/5 select-none">
                              <Check className="h-3.5 w-3.5 stroke-[3px]" />
                              Best Match
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-bold text-slate-500 select-none">
                              Alternative
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
