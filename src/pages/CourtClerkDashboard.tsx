import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { 
  Library, 
  Inbox, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  Mail,
  UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

import { useNavigate } from 'react-router-dom';

export default function CourtClerkDashboard() {
  const { dir } = useLanguage();
  const navigate = useNavigate();

  const caseQueue = [
    { id: 'CASE-2026-001', claimant: 'Yoni Akrish', type: 'Small Claim', status: 'NEW', priority: 'High', date: '2026-04-27' },
    { id: 'CASE-2026-003', claimant: 'Rivka Levy', type: 'Civil Dispute', status: 'DOCUMENT_REVIEW', priority: 'Med', date: '2026-04-26' },
    { id: 'CASE-2026-004', claimant: 'Bank Leumi', type: 'Financial', status: 'PENDING_ASSIGNMENT', priority: 'Low', date: '2026-04-26' },
    { id: 'CASE-2026-008', claimant: 'Moshe Cohen', type: 'Contract', status: 'URGENT', priority: 'Critical', date: '2026-04-27' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Library className="text-blue-600 w-8 h-8" />
              Court Registry
            </h1>
            <p className="text-gray-500 mt-1">Reviewing process queue for Jerusalem District ODR</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold border border-blue-100 hover:bg-blue-100 transition-all">
              Queue Settings
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              Assign All Pending
            </button>
          </div>
        </div>

        {/* Clerk Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Unassigned', value: '12', icon: Inbox, bg: 'bg-orange-50', color: 'text-orange-600' },
            { label: 'Review Pending', value: '45', icon: Clock, bg: 'bg-blue-50', color: 'text-blue-600' },
            { label: 'Verified', value: '128', icon: UserCheck, bg: 'bg-emerald-50', color: 'text-emerald-600' },
            { label: 'Flagged', value: '3', icon: AlertCircle, bg: 'bg-red-50', color: 'text-red-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
               <div className={cn("p-3 rounded-xl", stat.bg)}>
                 <stat.icon className={cn("w-6 h-6", stat.color)} />
               </div>
               <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</p>
               </div>
            </div>
          ))}
        </div>

        {/* Process Queue */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 bg-white">
             <h3 className="text-lg font-bold text-gray-900">Incoming Case Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest">Case ID</th>
                  <th className="px-8 py-4 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest">Claimant</th>
                  <th className="px-8 py-4 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest">Type</th>
                  <th className="px-8 py-4 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest">Priority</th>
                  <th className="px-8 py-4 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest">Status</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {caseQueue.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => navigate(`/case/${item.id}`)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-5">
                       <span className="text-sm font-bold text-blue-600 font-mono tracking-tight">{item.id}</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                           {item.claimant.split(' ').map(n => n[0]).join('')}
                         </div>
                         <span className="text-sm font-semibold text-gray-900">{item.claimant}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 italic">{item.type}</td>
                    <td className="px-8 py-5">
                       <span className={cn(
                         "text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
                         item.priority === 'Critical' ? "bg-red-50 text-red-600 border-red-100" : 
                         item.priority === 'High' ? "bg-orange-50 text-orange-600 border-orange-100" :
                         "bg-gray-50 text-gray-500 border-gray-100"
                       )}>
                         {item.priority}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                         <div className={cn(
                           "w-1.5 h-1.5 rounded-full",
                           item.status === 'URGENT' ? "bg-red-500" : item.status === 'NEW' ? "bg-blue-500" : "bg-gray-300"
                         )} />
                         <span className="text-xs font-bold text-gray-700">{item.status.replace('_', ' ')}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded shadow-sm border border-transparent hover:border-gray-100">
                           <Mail className="w-4 h-4" />
                         </button>
                         <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded shadow-sm border border-transparent hover:border-gray-100">
                           <MoreHorizontal className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-gray-50 text-center">
             <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">View Load Distribution</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
