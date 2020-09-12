/**
 * Model for a userProfile
 */

export interface UserProfile {
  id?: string;
  statement: string;
  education: string[];
  workExperience: string[];
  lookingFor: string[];
  skills: string[];
  active: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  userId: string;
}
