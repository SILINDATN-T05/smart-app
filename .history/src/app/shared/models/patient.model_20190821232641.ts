import { ICompany } from './company.model';

export class IPatient {
  surname?: string;
  firstName?: string;
  fullName?: string;
  companyId: number | string;
  company?: ICompany;
  mobileNumber?: string;
  email?: string;
  updatedAt?: Date;
  createdAt?: Date;
  title: string;
  maritalStatus: string;
  initials: string;
  idType: string;
  IdValue: string;
  dob: Date;
  position: string;
  department: string;
}
