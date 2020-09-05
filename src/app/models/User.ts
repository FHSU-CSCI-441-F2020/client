/**
 * Model for a user
 */
export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  completedProfile: boolean;
}
