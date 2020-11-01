/**
 * Model for a employer
 */
export interface Employer {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  owner?: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  jobs?: [string];
}
