import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  Settings, 
  UserPlus, 
  Lock, 
  Eye, 
  Trash2, 
  Activity,
  Check,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

export default function AdminRBAC() {
  const [activeTab, setActiveTab] = React.useState<'users' | 'roles'>('users');

  const users = [
    { id: '1', name: 'Yoni Akrish', email: 'yoni@example.com', role: 'SYSTEM_ADMIN' as UserRole, status: 'Active' },
    { id: '2', name: 'Rivka Levy', email: 'rivka@court.gov.il', role: 'COURT_CLERK' as UserRole, status: 'Active' },
    { id: '3', name: 'Amit Cohen', email: 'amit@law.com', role: 'LAWYER' as UserRole, status: 'Inactive' },
    { id: '4', name: 'Sarah Ben-David', email: 'sarah@mediate.me', role: 'MEDIATOR' as UserRole, status: 'Active' },
  ];

  const rolePermissions = [
    { role: 'CLAIMANT', permissions: ['File Claim', 'Upload Evidence', 'Message Party'] },
    { role: 'COURT_CLERK', permissions: ['View All Cases', 'Assign Mediator', 'Verify Documents', 'Change Status'] },
    { role: 'SYSTEM_ADMIN', permissions: ['Manage Users', 'System Logs', 'Configure Rates', 'Override Lock'] },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-blue-600 w-8 h-8" />
              Administrative Controls
            </h1>
            <p className="text-gray-500 mt-1">Manage system accessibility, user roles, and security policies</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <UserPlus className="w-5 h-5" />
            Invite New User
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('users')}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'users' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Users className="w-4 h-4" />
            User Management
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'roles' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Lock className="w-4 h-4" />
            Role Permissions
          </button>
        </div>

        {activeTab === 'users' ? (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
                    <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Two-Factor</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                      <td className="px-8 py-5">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300')} />
                          <span className="text-xs font-bold text-gray-700">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {user.id === '1' ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 shrink-0">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center">
              <span className="text-xs text-gray-500">Showing 4 registered staff members</span>
              <div className="flex gap-2">
                 <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600">Export CSV</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {rolePermissions.map((item) => (
              <div key={item.role} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                   <div>
                     <h3 className="font-bold text-gray-900">{item.role}</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Access Profile</p>
                   </div>
                   <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <Key className="w-4 h-4" />
                   </div>
                </div>
                <div className="space-y-3">
                   {item.permissions.map((perm, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                       <Check className="w-4 h-4 text-emerald-500" />
                       <span className="text-sm text-gray-700 font-medium">{perm}</span>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                  Modify Access
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
