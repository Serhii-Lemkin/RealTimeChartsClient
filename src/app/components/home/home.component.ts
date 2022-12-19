import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/_interfaces/usermodel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import ActiveUsers from 'src/app/services/signalr.activeUsers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent implements OnInit {
  user!: UserModel;

  //activeUsers: UserModel[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    public getActiveService: ActiveUsers
  ) {
    let tmpUser = sessionStorage.getItem('currentUser');
    if (!tmpUser) this.router.navigate(['/login']);
    if (tmpUser) this.user = JSON.parse(tmpUser);
  }
  private startHttpRequest = () => {
    this.http.get(`${environment.apiURL}/api/user`).subscribe((data) => {
      if (data === 'UserName Taken') {
        console.log(data);
      } else {
        this.getActiveService.data = data as UserModel[];
      }
    });
  };
  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.getActiveService.startConnection();
    this.getActiveService.addTransferChartDataListener();
    this.startHttpRequest();
  }
}
