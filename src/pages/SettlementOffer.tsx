import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { cn } from '../lib/utils';
import { 
  Banknote, 
  Handshake, 
  Calendar, 
  ShieldCheck, 
  Gavel,
  History,
  FileCheck
} from 'lucide-react';

export default function SettlementOffer() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Handshake className="text-emerald-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Active Settlement Offer</h1>
          <p className="text-gray-500 mt-2">A proposed compromise to resolve CASE-2026-001</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Offer Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Offer from Defendant</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Pending your decision</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Proposed Amount</p>
                  <p className="text-3xl font-bold text-emerald-600">₪1,100</p>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                <p className="text-sm text-emerald-800 leading-relaxed italic">
                  "I am willing to pay ₪1,100 to close this matter immediately. Although I maintain the repair was mostly correct, I acknowledge the delay and would like to avoid further court fees."
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-sm">Payment Plan</h4>
                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">One-time Payment</p>
                    <p className="text-xs text-gray-500">To be paid within 5 business days of acceptance</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                <button className="py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                  Accept Offer
                </button>
                <button className="py-4 bg-white text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-50 transition-all">
                  Reject & Continue
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 text-blue-800">
               <FileCheck className="w-5 h-5 shrink-0" />
               <p className="text-xs">
                 If accepted, this agreement becomes legally binding. A settlement certificate will be generated and filed with the court registry.
               </p>
            </div>
          </div>

          {/* Context & Comparison */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <History className="w-4 h-4 text-gray-400" />
                Comparison
              </h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Original Claim</span>
                    <span className="text-sm font-bold text-gray-900">₪1,500</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Defendant's Offer</span>
                    <span className="text-sm font-bold text-emerald-600">₪1,100</span>
                 </div>
                 <div className="h-px bg-gray-50" />
                 <div className="flex justify-between items-center text-red-600">
                    <span className="text-sm font-medium">Difference</span>
                    <span className="text-sm font-bold">-₪400</span>
                 </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                 <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-widest">Mediator Tip</p>
                 <p className="text-xs text-gray-600 leading-relaxed">
                   Accepting this offer saves an estimated 3-6 months of court processing time and avoids potential court appearance fees.
                 </p>
              </div>
            </div>

            <div className="bg-[#1a1c1e] text-white rounded-[32px] p-8 relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="font-bold text-lg mb-4">Legal Certainty</h3>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">
                   Once you click accept, the defendant will have 48 hours to deposit the funds into the ODR Escrow account.
                 </p>
                 <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    SECURE ODR ESCROW ACTIVE
                 </div>
               </div>
               <Banknote className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
