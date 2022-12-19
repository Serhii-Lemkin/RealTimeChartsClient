import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import RegModel from 'src/models/RegModel';
import RegResponce from 'src/models/Responce';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private router: Router, private http: HttpClient) {
    let u = sessionStorage.getItem('currentUser');
    if (!u) {
      sessionStorage.clear;
    }
    if (this.regData.userName === '') {
      return;
    }
  }
  regData: RegModel = new RegModel();
  confirmPassword = '';
  userNameTaken = false;

  register() {
    if (this.confirmPassword !== this.regData.password) {
      return;
    }
    if (this.regData.password.length < 8) {
      return;
    }
    if (this.regData.userName === '' || this.regData.password === '') {
      return;
    }
    this.http
      .post(`${environment.apiURL}/api/auth/register`, this.regData)
      .subscribe((data) => {
        let tmp = data as RegResponce;
        console.log(tmp);
        if (tmp.success) {
          this.userNameTaken = false;
          this.router.navigate(['/login']);
        } else {
          this.userNameTaken = true;
        }
      });
  }

  register1() {
    if (this.regData.userName === '') return;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const json = JSON.stringify(this.regData);
    this.http
      .post(`${environment.apiURL}/api/user/reg`, json, {
        headers: headers,
      })
      .subscribe((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/home']);
      });
  }
}
