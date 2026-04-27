import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import { 
  History, 
  MessageSquare, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Gavel,
  ChevronRight,
  Download
} from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    title: 'Claim Filed',
    description: 'Claimant submitted the initial claim and supporting documents.',
    date: 'April 20, 2026',
    time: '14:30',
    type: 'SUCCESS',
    icon: CheckCircle2
  },
  {
    id: 2,
    title: 'System Verification',
    description: 'Digital signature verified and case ID assigned.',
    date: 'April 20, 2026',
    time: '14:31',
    type: 'SUCCESS',
    icon: ShieldCheck
  },
  {
    id: 3,
    title: 'Defendant Notified',
    description: 'Email and SMS notification sent to defendant.',
    date: 'April 21, 2026',
    time: '09:00',
    type: 'INFO',
    icon: Clock
  },
  {
    id: 4,
    title: 'Response Required',
    description: 'Defendant has 14 days to respond to the claim.',
    date: 'Pending',
    time: '',
    type: 'WARNING',
    icon: AlertCircle
  }
];

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function CaseStatusTimeline() {
  const { dir } = useLanguage();

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Timeline */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Case Timeline</h1>
              <p className="text-gray-500 mt-1">ID: CASE-2026-001 • Repair service dispute</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
                Awaiting Response
              </span>
            </div>
          </div>

          <div className="relative">
            {/* Thread Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100" />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex gap-8 pl-0">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center z-10 shrink-0 border-4 border-white shadow-sm",
                    event.type === 'SUCCESS' ? "bg-emerald-100 text-emerald-600" :
                    event.type === 'WARNING' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                  )}>
                    <event.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{event.date} {event.time}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                      {event.id === 1 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                            <Paperclip className="w-3.5 h-3.5" />
                            receipt_24.pdf
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                            <Paperclip className="w-3.5 h-3.5" />
                            service_log.jpg
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Actions & Details */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden relative">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Case Details</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Claimant</p>
                <p className="font-bold text-gray-900">Yoni Akrish</p>
              </div>
              <div className="h-px bg-gray-50" />
              <div>
                <p className="text-xs text-gray-500">Defendant</p>
                <p className="font-bold text-gray-900">Yossi Cohen</p>
              </div>
              <div className="h-px bg-gray-50" />
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">Total Claim</p>
                  <p className="text-2xl font-bold text-blue-600">₪1,500</p>
                </div>
                <button className="text-xs font-bold text-gray-400 hover:text-blue-600 underline underline-offset-4 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Full PRD
                </button>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 text-gray-50/50">
              <Gavel className="w-32 h-32 rotate-12" />
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl shadow-lg shadow-blue-100 p-6 text-white space-y-4">
            <h4 className="font-bold text-lg">Next Steps</h4>
            <p className="text-blue-100 text-sm">
              We are waiting for the defendant to respond. If they don't respond by May 4th, 2026, you can request a default judgment.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
