import { User } from './user';

/**
 * Model for a job
 */
export interface Job {
  id?: string;
  name: string;
  description: string;
  requirements: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  hours: string;
  applicants?: [User];
  owner?: string;
  active?: boolean;
}
