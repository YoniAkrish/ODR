import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import { 
  FileText, 
  MessageCircle, 
  Handshake, 
  XCircle, 
  Send,
  Paperclip,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function DefendantResponse() {
  const [responseType, setResponseType] = React.useState<'accept' | 'reject' | 'counter'>('reject');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Case Response</h1>
            <p className="text-gray-500 mt-1">CASE-2026-001 • Filed by Yoni Akrish</p>
          </div>
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-bold">12 Days Remaining to Respond</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Choose your response type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <button 
                    onClick={() => setResponseType('accept')}
                    className={cn(
                      "p-4 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all",
                      responseType === 'accept' ? "border-emerald-600 bg-emerald-50" : "border-gray-100"
                    )}
                   >
                     <CheckCircle2 className={cn("w-6 h-6", responseType === 'accept' ? "text-emerald-600" : "text-gray-300")} />
                     <span className="text-sm font-bold text-gray-700">Accept Fully</span>
                   </button>
                   <button 
                    onClick={() => setResponseType('reject')}
                    className={cn(
                      "p-4 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all",
                      responseType === 'reject' ? "border-red-600 bg-red-50" : "border-gray-100"
                    )}
                   >
                     <XCircle className={cn("w-6 h-6", responseType === 'reject' ? "text-red-600" : "text-gray-300")} />
                     <span className="text-sm font-bold text-gray-700">Reject Claim</span>
                   </button>
                   <button 
                    onClick={() => setResponseType('counter')}
                    className={cn(
                      "p-4 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all",
                      responseType === 'counter' ? "border-blue-600 bg-blue-50" : "border-gray-100"
                    )}
                   >
                     <Handshake className={cn("w-6 h-6", responseType === 'counter' ? "text-blue-600" : "text-gray-300")} />
                     <span className="text-sm font-bold text-gray-700">Counter Offer</span>
                   </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Your Detailed Response</label>
                <textarea 
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm"
                  placeholder="Explain your side of the story..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Supporting Evidence</label>
                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                  <p className="text-xs text-gray-500 font-bold">ATTACH DOCUMENTS</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex justify-end">
                <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100">
                  <Send className="w-5 h-5" />
                  Submit Response
                </button>
              </div>
            </div>
          </div>

          {/* Claim Summary Sidebar */}
          <div className="space-y-6">
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Original Claim</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                       <FileText className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-gray-900 leading-tight">Repair service dispute</p>
                       <p className="text-xs text-gray-400 mt-1">Amount: <span className="text-blue-600 font-bold">₪1,500</span></p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic leading-relaxed pl-12">
                    "The technician did not complete the repair as promised, and parts were left exposed. I requested a refund which was denied..."
                  </p>
                </div>
                <div className="h-px bg-gray-50 my-6" />
                <button className="w-full text-xs font-bold text-blue-600 text-center hover:underline">Download Full Claim PDF</button>
             </div>

             <div className="bg-emerald-600 rounded-3xl p-6 text-white text-center">
                <MessageCircle className="w-10 h-10 mx-auto mb-4 opacity-50" />
                <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                <p className="text-sm text-emerald-100 mb-6">
                  You can speak with a neutral mediator before submitting a formal response.
                </p>
                <button className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm">
                  Request Free Mediation
                </button>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
