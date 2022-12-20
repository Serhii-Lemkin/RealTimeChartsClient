import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from 'src/_interfaces/usermodel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit{
  constructor(private router: Router, private http: HttpClient) {
    
  }
  ngOnInit(): void {
    let jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      this.jwtExists = true;
    } else {
      this.jwtExists = false;
    }
  }

  jwtExists!: boolean;
  user!: UserModel;

  logout = () => {
    let tmpUser = sessionStorage.getItem('currentUser');
    if (tmpUser == null) {
      this.router.navigate(['/login']);
      return;
    }
    if (tmpUser != null) this.user = JSON.parse(tmpUser);
    const json = JSON.stringify(this.user.userName);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(`${environment.apiURL}/api/user/logout`, json, {
        headers: headers,
      })
      .subscribe((data) => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      });
  };

  login() {
    this.router.navigate(['/login']);
  }
}
