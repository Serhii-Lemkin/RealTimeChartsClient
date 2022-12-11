import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from 'src/app/services/signalr.register';
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
    public registerService: RegisterService,
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
    
    this.registerService.startConnection();
    this.registerService.addTransferChartDataListener(this.userName);
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
        this.router.navigate(['/home']);
      });
  }
}
