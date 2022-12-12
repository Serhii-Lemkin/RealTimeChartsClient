import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const json = JSON.stringify(this.userName);
    this.http
      .post('https://localhost:5001/api/user/reg', json, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log(data);
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/home']);
      });
  }
}
