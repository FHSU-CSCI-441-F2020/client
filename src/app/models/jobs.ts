/**
 * Model for a jobs
 */
export interface Jobs {
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
