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
  applicants?: [string];
  owner?: string;
  active?: boolean;
}
