export type UserRole = 
  | 'CLAIMANT' 
  | 'DEFENDANT' 
  | 'LAWYER' 
  | 'COURT_CLERK' 
  | 'MEDIATOR' 
  | 'IT_MANAGER' 
  | 'SYSTEM_ADMIN';

export type Language = 'he' | 'en' | 'ar';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Case {
  id: string;
  claimantId: string;
  defendantId: string;
  status: CaseStatus;
  createdAt: string;
  amount?: number;
  description: string;
}

export type CaseStatus = 
  | 'NEW' 
  | 'PENDING_RESPONSE' 
  | 'IN_MEDIATION' 
  | 'COURT_REVIEW' 
  | 'CLOSED' 
  | 'SETTLED';
