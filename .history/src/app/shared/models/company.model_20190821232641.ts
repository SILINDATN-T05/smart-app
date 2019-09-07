export class ICompany {
  id: number | string;
  name: string;
  telephone: string;
  fax: string;
  status?: string;
  email: string;
  paymentFirst: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
