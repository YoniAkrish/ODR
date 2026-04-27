import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Landmark, LogOut, Bell, User as UserIcon, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const { t, language, setLanguage, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <nav className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Landmark className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900 text-lg hidden md:block">
                ODR Platform
              </span>
            </div>

            {/* Navigation links could go here */}
          </div>

          <div className="flex items-center gap-4">
             {/* Language Toggle */}
             <div className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-md border border-gray-200">
              {(['he', 'en', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "px-2 py-1 text-xs font-semibold rounded transition-all",
                    language === lang 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.name}</p>
                <p className="text-xs text-gray-500">{t(`role.${user?.role}`)}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full border border-gray-200">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
