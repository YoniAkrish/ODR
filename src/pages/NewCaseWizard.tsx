import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileEdit, 
  Upload, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  AlertCircle,
  Building2,
  UserCircle
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Defendant Details', icon: User },
  { id: 2, title: 'Dispute Details', icon: FileEdit },
  { id: 3, title: 'Evidence Upload', icon: Upload },
  { id: 4, title: 'Review & Submit', icon: ShieldCheck }
];

import { useNavigate } from 'react-router-dom';

export default function NewCaseWizard() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    defendantType: 'private',
    defendantName: '',
    defendantId: '',
    disputeDescription: '',
    claimAmount: '',
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all border-2",
                  currentStep >= step.id 
                    ? "bg-blue-600 border-blue-600 text-white" 
                    : "bg-white border-gray-300 text-gray-400"
                )}>
                  {currentStep > step.id ? (
                    <ShieldCheck className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-semibold uppercase tracking-wider hidden md:block",
                  currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[400px]"
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Who is the defendant?</h2>
                    <p className="text-gray-500 mt-2">Enter the details of the party you are filing a claim against.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData({...formData, defendantType: 'private'})}
                      className={cn(
                        "p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all",
                        formData.defendantType === 'private' ? "border-blue-600 bg-blue-50" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <UserCircle className={cn("w-8 h-8", formData.defendantType === 'private' ? "text-blue-600" : "text-gray-400")} />
                      <span className="font-semibold">Private Person</span>
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, defendantType: 'company'})}
                      className={cn(
                        "p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all",
                        formData.defendantType === 'company' ? "border-blue-600 bg-blue-50" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <Building2 className={cn("w-8 h-8", formData.defendantType === 'company' ? "text-blue-600" : "text-gray-400")} />
                      <span className="font-semibold">Company / Business</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.defendantName}
                        onChange={(e) => setFormData({...formData, defendantName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">ID / Company Registration Number</label>
                      <input 
                        type="text" 
                        value={formData.defendantId}
                        onChange={(e) => setFormData({...formData, defendantId: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="123456789"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dispute Details</h2>
                    <p className="text-gray-500 mt-2">Clearly explain what happened and what you are requesting.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description of Dispute</label>
                      <textarea 
                        rows={6}
                        value={formData.disputeDescription}
                        onChange={(e) => setFormData({...formData, disputeDescription: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Explain the background, dates, and why you feel you are owed..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Claim Amount (ILS)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₪</span>
                        <input 
                          type="number" 
                          value={formData.claimAmount}
                          onChange={(e) => setFormData({...formData, claimAmount: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Claims above ₪37,000 might require legal representation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8 text-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Upload Evidence</h2>
                    <p className="text-gray-500 mt-2">Contracts, receipts, photos, or correspondence that support your claim.</p>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 transition-all hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer group">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">Click or drag files to upload</p>
                        <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB per file)</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <FileEdit className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Contract_Signed.pdf</span>
                      </div>
                      <span className="text-xs text-gray-400">1.2 MB</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Review Your Claim</h2>
                    <p className="text-gray-500 mt-2">Please double-check all information before final submission.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Defendant</p>
                          <p className="text-lg font-bold text-gray-900 mt-1">{formData.defendantName || 'Not specified'}</p>
                          <p className="text-sm text-gray-500 italic">ID: {formData.defendantId || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</p>
                          <p className="text-2xl font-bold text-blue-600 mt-1">₪{Number(formData.claimAmount).toLocaleString() || '0'}</p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-200" />
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</p>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          {formData.disputeDescription || 'No description provided.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 text-amber-800">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">
                        By submitting this claim, you confirm that all provided information is truthful. Filing a false claim may result in legal consequences.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-12 flex items-center justify-between border-t border-gray-50 pt-8">
            <button 
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                currentStep === 1 ? "text-gray-300 pointer-events-none" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < steps.length ? (
              <button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={() => {
                  alert('Claim Submitted Successfully!');
                  navigate('/dashboard');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100"
              >
                Submit Claim
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
