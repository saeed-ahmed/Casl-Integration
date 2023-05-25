export interface IEmployee{
  firstName:string;
  lastName:string;
  Age:number;
}
export interface IUser{
  userId: number;
  id:number;
  title:string;
  body:string;
}
export interface IRole {
  id: number;
  name: string;
  subjects?: Array<ISubject>;
}
export interface ISubject {
  id: number;
  roleId: number;
  name: string;
  actions: Array<IAction>;
}
export interface IAction {
  name: string;
  hasPermission: boolean;
}
export interface IArticle {
  roleId: number;
  print: boolean;
  favorite: boolean;
  shareArticle: boolean;
  submitFeedback: boolean;
}
export interface IPayment {
  roleId: number;
  viewPayment: boolean;
  submitPayment: boolean;
  editPayment: boolean;
  paymentTransfer: boolean;
}
export interface IPaymentHistory {
  roleId: number;
  viewPaymentHistory: boolean;
  editPaymentHistory: boolean;
  sharePaymentHistory: boolean;
}

export class Role {
  public currentRole: IRole;
  constructor(role: IRole) {
    this.currentRole = role;
  }
}
export class Article {
  public aSubject: IArticle;
  constructor(article: IArticle) {
    this.aSubject = article;
  }
}
export class Payment {
  public aSubject: IPayment;
  constructor(subject: IPayment) {
    this.aSubject = subject;
  }
}
export class PaymentHistory {
  public aSubject: IPaymentHistory;
  constructor(paymentHistory: IPaymentHistory) {
    this.aSubject = paymentHistory;
  }
}
