import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import { Case, CaseStatus } from '../types';

const mockCases: Case[] = [
  {
    id: 'CASE-2026-001',
    claimantId: '1',
    defendantId: '2',
    status: 'PENDING_RESPONSE',
    createdAt: '2026-04-20',
    amount: 1500,
    description: 'Repair service dispute'
  },
  {
    id: 'CASE-2026-005',
    claimantId: '1',
    defendantId: '3',
    status: 'SETTLED',
    createdAt: '2026-03-15',
    amount: 3200,
    description: 'Unpaid rent balance'
  },
  {
    id: 'CASE-2026-012',
    claimantId: '1',
    defendantId: '4',
    status: 'NEW',
    createdAt: '2026-04-25',
    amount: 500,
    description: 'Product refund denial'
  }
];

const StatusBadge = ({ status }: { status: CaseStatus }) => {
  const styles: Record<CaseStatus, string> = {
    NEW: "bg-blue-50 text-blue-700 border-blue-100",
    PENDING_RESPONSE: "bg-amber-50 text-amber-700 border-amber-100",
    IN_MEDIATION: "bg-purple-50 text-purple-700 border-purple-100",
    COURT_REVIEW: "bg-indigo-50 text-indigo-700 border-indigo-100",
    CLOSED: "bg-gray-50 text-gray-700 border-gray-100",
    SETTLED: "bg-emerald-50 text-emerald-700 border-emerald-100"
  };

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-xs font-semibold border",
      styles[status]
    )}>
      {status.replace('_', ' ')}
    </span>
  );
};

import { useNavigate } from 'react-router-dom';

export default function ClaimantDashboard() {
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {dir === 'rtl' ? 'התיקים שלי' : 'My Cases'}
            </h1>
            <p className="text-gray-500 mt-1">
              {dir === 'rtl' ? 'עקוב אחרי הסטטוס של התביעות שלך' : 'Track the status of your claims and disputes'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/new-case')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            {dir === 'rtl' ? 'פתיחת תיק חדש' : 'Open New Case'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Cases', value: '2', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Settled', value: '5', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Total Amount', value: '₪5,200', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Alerts', value: '1', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters and List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder={dir === 'rtl' ? 'חפש לפי מספר תיק או נתבע...' : 'Search by case ID or defendant...'}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all font-medium text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Case ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Defendant</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockCases.map((caseItem) => (
                  <tr 
                    key={caseItem.id} 
                    onClick={() => navigate(`/case/${caseItem.id}`)}
                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900 font-mono tracking-tight">{caseItem.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">Yossi Cohen</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">₪{caseItem.amount?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={caseItem.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{caseItem.createdAt}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-500">Showing 3 of 3 cases</p>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 border border-gray-200 rounded text-xs text-gray-400">Prev</button>
              <button disabled className="px-3 py-1 border border-gray-200 rounded text-xs text-gray-400">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
