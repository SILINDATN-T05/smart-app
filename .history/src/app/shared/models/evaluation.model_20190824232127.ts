import { ICompany } from './company.model';

import { User } from './user.model';

import { IPatient } from './patient.model';

export class IEvaluation {
  audioTest: any;
  audioTestId: number | string;
  cOFIssued: string;
  checkIn: boolean;
  comments: string;
  company: ICompany;
  companyId: number | string;
  createdAt: Date;
  data: any;
  dateIssued: Date;
  declaration: string;
  doctorReviewDate: Date;
  evaluationDate: Date;
  expiryDate: Date;
  forMobile: any;
  id: number | string;
  keystone: any;
  keystoneId: number | string;
  lungFunctionTest: any;
  lungFunctionTestId: any;
  medicalType: string;
  mobileUnit: string;
  mobileUnitId: string;
  nurse: User[];
  otherMedicalType: string;
  otherMedicalTypeId: number | string;
  patient: IPatient;
  patientId: number | string;
  referredBy: User;
  referredById: number | string;
  referredToDoctor: string;
  restriction: any;
  restrictionId: number | string;
  status: string;
  technician: User[];
  updatedAt: Date;
  visionTest: any;
  visionTestId: number | string;
  wAHDeclaration: string;
  questions: any[];
}
