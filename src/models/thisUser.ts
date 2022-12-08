import { UserModel } from 'src/_interfaces/usermodel';

export default class ThisUser {
  user!: UserModel;

  constructor() {
    let tmpUser = sessionStorage.getItem('currentUser');
      if (tmpUser != null) this.user = JSON.parse(tmpUser);
  }
}
