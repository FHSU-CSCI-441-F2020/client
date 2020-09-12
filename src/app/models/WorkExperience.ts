/**
 * Model for a WorkExperience
 */
export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  currentlyEmployed: boolean;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  jobDescription: string;
  city: string;
  state: string;
}
