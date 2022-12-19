import { UserModel } from 'src/_interfaces/usermodel';

export default class ReturnLoginModel {
  user!: UserModel;
  token!: string;
}
