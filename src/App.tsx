import { WorkflowProvider, useWorkflow } from './context/WorkflowContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ManagerRequest } from './components/ManagerRequest';
import { Analytics } from './components/Analytics';
import { WorkflowGrid } from './components/WorkflowGrid';
import { SupplierTable } from './components/SupplierTable';
import { POPreview } from './components/POPreview';

function DashboardLayout() {
  const { toasts, removeToast } = useWorkflow();

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-purple/30 selection:text-purple-200">
      
      {/* Futuristic grid mesh background */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-40" />

      {/* Global radial glowing centers */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70%] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[400px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 relative z-10 py-6">
        <Hero />
        
        {/* Main User Action Area */}
        <ManagerRequest />

        {/* Workflow Status Indicators (Dynamic numbers) */}
        <Analytics />

        {/* 4 Agent orchestrator chain */}
        <WorkflowGrid />

        {/* Table comparisons - loads dynamically during agent run */}
        <SupplierTable />

        {/* PDF Invoice view - loads dynamically when PO finishes */}
        <POPreview />
      </main>

      {/* Footer info */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-slate-500 bg-slate-950/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-semibold text-slate-400">AgentOps AI • Autonomous Procurement MVP</p>
          <p className="mt-1">Designed for Hackathons and Enterprise Procurement Automation © 2026. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-xs sm:max-w-sm w-full px-4 sm:px-0 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'border-emerald-500/35 bg-slate-900/90 text-emerald-400'
                : toast.type === 'error'
                ? 'border-rose-500/35 bg-slate-900/90 text-rose-450'
                : 'border-white/10 bg-slate-900/90 text-brand-cyan'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <span className={`h-2 w-2 rounded-full ${
                toast.type === 'success' ? 'bg-emerald-500 animate-pulse' : toast.type === 'error' ? 'bg-rose-500 animate-pulse' : 'bg-brand-cyan'
              }`} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-slate-500 hover:text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

function App() {
  return (
    <WorkflowProvider>
      <DashboardLayout />
    </WorkflowProvider>
  );
}

export default App;
