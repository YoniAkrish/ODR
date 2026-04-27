import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  he: {
    'login.title': 'מערכת ליישוב סכסוכים מקוונת',
    'login.subtitle': 'פתרון תביעות קטנות וסכסוכים אזרחיים בפשטות ובמהירות',
    'login.select_role': 'בחר תפקיד להתחברות',
    'login.username': 'שם משתמש',
    'login.password': 'סיסמה',
    'login.button': 'התחבר',
    'common.language': 'שפה',
    'role.CLAIMANT': 'תובע',
    'role.DEFENDANT': 'נתבע',
    'role.LAWYER': 'עורך דין',
    'role.COURT_CLERK': 'מזכיר בית משפט',
    'role.MEDIATOR': 'מגשר',
    'role.IT_MANAGER': 'מנהל IT',
    'role.SYSTEM_ADMIN': 'מנהל מערכת',
  },
  en: {
    'login.title': 'Online Dispute Resolution System',
    'login.subtitle': 'Resolving small claims and civil disputes simply and quickly',
    'login.select_role': 'Select role to login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.button': 'Login',
    'common.language': 'Language',
    'role.CLAIMANT': 'Claimant',
    'role.DEFENDANT': 'Defendant',
    'role.LAWYER': 'Lawyer',
    'role.COURT_CLERK': 'Court Clerk',
    'role.MEDIATOR': 'Mediator',
    'role.IT_MANAGER': 'IT Manager',
    'role.SYSTEM_ADMIN': 'System Admin',
  },
  ar: {
    'login.title': 'نظام تسوية المنازعات عبر الإنترنت',
    'login.subtitle': 'حل المطالبات الصغيرة والنزاعات المدنية ببساطة وبسرعة',
    'login.select_role': 'اختر الدور لتسجيل الدخول',
    'login.username': 'اسم المستخدم',
    'login.password': 'كلمة المرור',
    'login.button': 'تسجيل الدخول',
    'common.language': 'اللغة',
    'role.CLAIMANT': 'المدعي',
    'role.DEFENDANT': 'المدعى عليه',
    'role.LAWYER': 'محامي',
    'role.COURT_CLERK': 'كاتب المحكمة',
    'role.MEDIATOR': 'وسيط',
    'role.IT_MANAGER': 'مدير تكنولوجيا المعلومات',
    'role.SYSTEM_ADMIN': 'مسؤول النظام',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');

  const dir = language === 'he' || language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
