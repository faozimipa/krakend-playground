export type UserStatus = 'active' | 'inactive' | 'blocked';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_ambassador: boolean;
  status: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  roles?: string[];
  permissions?: string[];
}
