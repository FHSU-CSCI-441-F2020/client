/**
 * Model for a Education
 */
export interface Education {
  id: string;
  school: string;
  completed: boolean;
  completionDate: string;
  fieldOfStudy: string;
  educationLevel: string;
  city: string;
  state: string;
}
