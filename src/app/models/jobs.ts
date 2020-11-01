/**
 * Model for a jobs
 */
export interface Jobs {
  id?: string;
  name: string;
  description: string;
  requirements: string;
  location: string;
  hours: string;
  applicants?: [string];
}
