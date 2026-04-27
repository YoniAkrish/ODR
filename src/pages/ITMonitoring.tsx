import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { cn } from '../lib/utils';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  ShieldAlert, 
  Zap,
  Globe,
  RefreshCcw,
  Terminal,
  BarChart3
} from 'lucide-react';

export default function ITMonitoring() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <Zap className="text-blue-600 w-8 h-8" />
              IT System Monitoring
            </h1>
            <p className="text-gray-500 mt-1">Real-time health status of the ODR infrastructure</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all text-gray-700">
            <RefreshCcw className="w-4 h-4" />
            Refresh Metrics
          </button>
        </div>

        {/* Real-time Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#151619] p-6 rounded-3xl border border-gray-800 shadow-xl overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Server className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-white font-bold">API Gateway</h3>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Latency</span>
                <span className="text-white font-mono">14ms</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="w-[14%] bg-emerald-500 h-full" />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <span className="text-2xl font-bold text-white font-mono">99.98%</span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Uptime</span>
            </div>
          </div>

          <div className="bg-[#151619] p-6 rounded-3xl border border-gray-800 shadow-xl">
             <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Database className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-white font-bold">Firestore DB</h3>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">READ: 2.4k/s</span>
            </div>
            <div className="space-y-4">
               {/* Mini Chart Simulation */}
               <div className="flex items-end gap-1 h-12">
                  {[40, 70, 45, 90, 65, 80, 50, 60, 40, 55, 75, 45].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm group-hover:bg-blue-500/40 transition-all" style={{ height: `${h}%` }} />
                  ))}
               </div>
               <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-white font-mono">0.02%</span>
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Error Rate</span>
              </div>
            </div>
          </div>

          <div className="bg-[#151619] p-6 rounded-3xl border border-gray-800 shadow-xl">
             <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-white font-bold">Active Users</h3>
              </div>
              <BarChart3 className="text-gray-600 w-4 h-4" />
            </div>
            <div className="space-y-2">
               <div className="text-3xl font-bold text-white font-mono">1,402</div>
               <div className="flex items-center gap-2">
                 <div className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[10px] font-bold">+12.4%</div>
                 <span className="text-[10px] text-gray-500 uppercase">vs last hour</span>
               </div>
            </div>
          </div>
        </div>

        {/* Integration Logs / Terminal Appearance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-gray-400" />
                 Recent System Logs
               </h3>
               <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3 font-mono text-[11px] bg-gray-900 p-4 rounded-xl text-emerald-400 overflow-y-auto max-h-[300px]">
              <p className="opacity-50">[2026-04-27 12:40:01] INFO: Database connection re-established</p>
              <p>[2026-04-27 12:40:05] SEC: Admin user 'sys_admin' logged in from 192.168.1.45</p>
              <p className="text-amber-400">[2026-04-27 12:41:12] WARN: API latency spike detected (eu-west-1)</p>
              <p>[2026-04-27 12:42:15] INFO: Case automated verification for ID CASE-2026-105 successful</p>
              <p className="text-red-400">[2026-04-27 12:43:00] ERR: Failed to process document upload: UID_44321</p>
              <p className="opacity-50">[2026-04-27 12:44:01] HEARTBEAT: All systems operational</p>
              <div className="animate-pulse w-2 h-4 bg-emerald-500 inline-block ml-1" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Critical Alerts
            </h3>
            <div className="space-y-4">
              {[
                { title: 'SSL Certificate Expiry', desc: 'Main domain SSL certificate expires in 3 days.', severity: 'CRITICAL' },
                { title: 'Payment Processor Timeout', desc: '5 failed settlement attempts in the last 10 mins.', severity: 'HIGH' },
                { title: 'Storage Capacity', desc: 'Bucket ODR_EVIDENCE is reaching 85% capacity.', severity: 'MEDIUM' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className={cn(
                    "w-1 bg-red-500 rounded-full",
                    alert.severity === 'HIGH' ? "bg-orange-500" : alert.severity === 'MEDIUM' ? "bg-amber-500" : "bg-red-500"
                  )} />
                  <div>
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-gray-900 text-sm">{alert.title}</span>
                       <span className={cn(
                         "text-[9px] px-1.5 py-0.5 rounded font-bold",
                         alert.severity === 'CRITICAL' ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
                       )}>{alert.severity}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
