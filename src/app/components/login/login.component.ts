import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import RegModel from 'src/models/RegModel';
import ReturnLoginModel from 'src/models/ReturnLoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}
  loginData: RegModel = new RegModel();
  reqSuccess = true;

  login() {
    console.log('inLogin');
    if (this.loginData.password === '' || this.loginData.userName === '') {
      return;
    }
    this.http
      .post(`${environment.apiURL}/api/auth/login`, this.loginData)
      .subscribe((data) => {
        if (!data) {
          this.reqSuccess = false;
          return;
        } else {
          let tmp = data as ReturnLoginModel;
          console.log(data);
          sessionStorage.setItem('currentUser', JSON.stringify(tmp.user));
          sessionStorage.setItem('jwt', JSON.stringify(tmp.token));
          this.router.navigate(['/']);
        }
      });
  }
}
