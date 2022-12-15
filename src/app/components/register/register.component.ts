import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    let u = sessionStorage.getItem('currentUser');
    if (!u) {
      sessionStorage.clear;
    }
    if (this.userName === '') {
      return;
    }
  }
  userName = '';

  register() {
    if(this.userName === "") return;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const json = JSON.stringify(this.userName);
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
