import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { Gavel, Languages, Landmark } from 'lucide-react';

export default function Login() {
  const { t, setLanguage, language } = useLanguage();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles: UserRole[] = [
    'CLAIMANT',
    'DEFENDANT',
    'LAWYER',
    'COURT_CLERK',
    'MEDIATOR',
    'IT_MANAGER',
    'SYSTEM_ADMIN'
  ];

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-bottom border-gray-100 bg-white">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Landmark className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                {t('login.title')}
              </h1>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
              {(['he', 'en', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                    language === lang 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {lang === 'he' ? 'עב' : lang === 'ar' ? 'ع' : 'EN'}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-500 text-lg">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all text-right",
                  selectedRole === role 
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600" 
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700"
                )}
              >
                <span className="font-medium">{t(`role.${role}`)}</span>
                <div className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center",
                  selectedRole === role ? "border-blue-600 bg-blue-600" : "border-gray-300"
                )}>
                  {selectedRole === role && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={cn(
              "w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2",
              selectedRole 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <Gavel className="w-5 h-5" />
            {t('login.button')}
          </button>
        </div>
      </motion.div>

      {/* Footer Meta */}
      <div className="mt-8 text-center text-gray-400 text-sm flex items-center gap-4">
        <span>© 2026 {t('login.title')}</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <a href="#" className="hover:text-gray-600 underline underline-offset-4 decoration-gray-300">
          Security Policy
        </a>
      </div>
    </div>
  );
}
