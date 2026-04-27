import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ClaimantDashboard from './pages/ClaimantDashboard';
import NewCaseWizard from './pages/NewCaseWizard';
import CaseStatusTimeline from './pages/CaseStatusTimeline';
import ITMonitoring from './pages/ITMonitoring';
import CourtClerkDashboard from './pages/CourtClerkDashboard';
import AdminRBAC from './pages/AdminRBAC';
import DefendantResponse from './pages/DefendantResponse';

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Role-based routing logic
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      
      {/* Shared Screens */}
      <Route path="/case/:id" element={<CaseStatusTimeline />} />
      
      {/* Role Specific Dashboards */}
      <Route path="/dashboard" element={
        user?.role === 'CLAIMANT' ? <ClaimantDashboard /> :
        user?.role === 'COURT_CLERK' ? <CourtClerkDashboard /> :
        user?.role === 'IT_MANAGER' ? <ITMonitoring /> :
        user?.role === 'SYSTEM_ADMIN' ? <AdminRBAC /> :
        user?.role === 'DEFENDANT' ? <DefendantResponse /> :
        <div className="p-10">Welcome {user?.name} to your {user?.role} dashboard! (In Development)</div>
      } />

      {/* Specific Actions */}
      <Route path="/new-case" element={<NewCaseWizard />} />
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
