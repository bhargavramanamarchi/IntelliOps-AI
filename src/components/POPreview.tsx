import { useState } from 'react';
import { useWorkflow, formatRupee } from '../context/WorkflowContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Send, 
  CheckCircle, 
  Lock,
  Stamp
} from 'lucide-react';

export const POPreview: React.FC = () => {
  const { scenario, visibleSections } = useWorkflow();
  const { po } = scenario;
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setIsApproved(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-16">
      <AnimatePresence>
        {visibleSections.poPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Header / Info bar */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Purchase Order Generation</h2>
                <p className="text-xs text-slate-400">Review the AI-generated legally compliant draft before final submission.</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Mock PDF generated and downloaded successfully!")}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-850 px-4 py-2.5 text-xs font-semibold text-slate-350 hover:text-white transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </button>
                
                <button
                  onClick={handleApprove}
                  disabled={isApproved}
                  className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all cursor-pointer ${
                    isApproved
                      ? 'bg-emerald-600 border border-emerald-500/20 shadow-none cursor-default'
                      : 'bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 shadow-brand-purple/10 transform hover:-translate-y-0.5'
                  }`}
                >
                  {isApproved ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Approved & Synced to ERP
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Approve & Dispatch PO
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Premium PO Document Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl">
              {/* Draft Watermark */}
              {!isApproved && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-12 select-none opacity-2 flex flex-col items-center">
                  <span className="font-extrabold text-[8vw] tracking-[0.2em] text-slate-500 font-mono">DRAFT</span>
                  <span className="font-bold text-[1.5vw] text-slate-500 tracking-wider">AWAITING REVIEW</span>
                </div>
              )}

              {/* Top Section: Logo & Document Meta */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-extrabold text-base tracking-tight text-white">
                      IntelliOps <span className="text-brand-purple">AI</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Enterprise Procurement Suite</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Hash: 8b5cf6...06b6d4</p>
                </div>
                
                <div className="text-left sm:text-right font-mono space-y-1">
                  <h3 className="text-lg font-bold text-white font-sans tracking-tight">PURCHASE ORDER</h3>
                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">PO Number: </span>
                    <span className="text-slate-200 font-bold">{po.poNumber}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">Issue Date: </span>
                    <span className="text-slate-200">{po.date}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">Deadline: </span>
                    <span className="text-brand-cyan font-bold">{po.deliveryDeadline}</span>
                  </div>
                </div>
              </div>

              {/* Middle Section: Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-white/5 text-xs">
                {/* Buyer / Ship To */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Buyer details</h4>
                  <div className="space-y-1 text-slate-300">
                    <div className="font-bold text-white text-sm">{po.buyer.company}</div>
                    <div>{po.buyer.contact}</div>
                    <div className="text-slate-400">{po.buyer.email}</div>
                    <div className="text-slate-450 mt-1 font-semibold">GSTIN: {po.buyer.gstin || '36AAAAA1111A1Z1'}</div>
                    <div className="text-slate-400 leading-relaxed mt-1">{po.buyer.address}</div>
                  </div>
                </div>

                {/* Seller / Vendor */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Vendor details</h4>
                  <div className="space-y-1 text-slate-300">
                    <div className="font-bold text-brand-cyan text-sm">{po.supplier.name}</div>
                    <div>{po.supplier.contact}</div>
                    <div className="text-slate-400">{po.supplier.email}</div>
                    <div className="text-slate-450 mt-1 font-semibold">GSTIN: {po.supplier.gstin || '29AAAAA2222A1Z2'}</div>
                    <div className="text-slate-400 leading-relaxed mt-1">{po.supplier.address}</div>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="py-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                        <th className="pb-3 text-slate-500">Item Description</th>
                        <th className="pb-3 text-slate-500">HSN Code</th>
                        <th className="pb-3 text-right text-slate-500">Quantity</th>
                        <th className="pb-3 text-right text-slate-500">Unit Price</th>
                        <th className="pb-3 text-right text-slate-500">Line Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-350">
                      <tr>
                        <td className="py-4">
                          <div className="font-bold text-white text-sm">{po.item}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Complies with B2B supply line criteria and Indian GST standards</div>
                        </td>
                        <td className="py-4 font-mono text-slate-300">
                          {po.item.toLowerCase().includes('wood') ? 'HSN 4407' : po.item.toLowerCase().includes('steel') ? 'HSN 7306' : 'HSN 9403'}
                        </td>
                        <td className="py-4 text-right font-mono font-semibold text-slate-200">
                          {po.quantity}
                        </td>
                        <td className="py-4 text-right font-mono text-slate-250">
                          {formatRupee(po.pricePerUnit)}
                        </td>
                        <td className="py-4 text-right font-mono font-bold text-white text-sm">
                          {formatRupee(po.subtotal)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price Calculations & Signatures */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/5">
                
                {/* Cryptographic Agent Stamps */}
                <div className="space-y-3">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
                    Security Signatures
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 rounded-md bg-slate-900 border border-white/5 px-2.5 py-1.5 text-[9px] text-slate-400 font-mono">
                      <Lock className="h-3 w-3 text-brand-cyan" />
                      <span>REQ_AGENT_SIG_OK</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-slate-900 border border-white/5 px-2.5 py-1.5 text-[9px] text-slate-400 font-mono">
                      <Lock className="h-3 w-3 text-brand-cyan" />
                      <span>INV_AGENT_SIG_OK</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-slate-900 border border-white/5 px-2.5 py-1.5 text-[9px] text-slate-400 font-mono">
                      <Lock className="h-3 w-3 text-brand-cyan" />
                      <span>SUP_AGENT_SIG_OK</span>
                    </div>
                  </div>
                  
                  {isApproved && (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-sans mt-2 animate-bounce">
                      <Stamp className="h-4 w-4" />
                      <span>Enterprise Signature Authorized by Bhargav</span>
                    </div>
                  )}
                </div>

                {/* Final Aggregates */}
                <div className="w-full md:w-80 font-mono text-xs space-y-2.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="text-slate-200">{formatRupee(po.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 border-b border-white/5 pb-2">
                    <span>GST (18% B2B GST):</span>
                    <span className="text-slate-200">{formatRupee(po.tax)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pl-4">
                    <span>CGST (9.0%):</span>
                    <span>{formatRupee(po.tax / 2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pl-4 pb-2 border-b border-white/5">
                    <span>SGST (9.0%):</span>
                    <span>{formatRupee(po.tax / 2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2.5">
                    <span className="font-sans">Grand Total:</span>
                    <span className="text-brand-cyan">{formatRupee(po.total)}</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
