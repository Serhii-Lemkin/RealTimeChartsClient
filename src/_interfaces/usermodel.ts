export interface UserModel {
  _id: string;
  userName: string;
  lastRequest: Date;
  personalCode: string;
  passwordHash: string;
  passwordSalt:string;
}
