import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/_interfaces/usermodel';
import InviteService from '../../services/signalr.inviteservice';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
})
export class InviteComponent {
  currentUser!: UserModel;
  inviteCode!: UserModel
  constructor(
    private router: Router,
    private http: HttpClient,
    public getInvite: InviteService
  ) {
    let tmp = sessionStorage.getItem('currentUser');
    if (tmp !== null) this.currentUser = JSON.parse(tmp);
    else this.router.navigate(['/']);
  }


  ngOnInit() {
    this.getInvite.startConnection();
    this.getInvite.addTransferChartDataListener(this.currentUser.userName);
  }

  accept = (code: string) => {
    this.getInvite.inviteReceived = false;
    let json = JSON.stringify("accept");
    console.log(json);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    });
    this.http
      .post('https://localhost:5001/api/invite/react/' + this.getInvite.data, json, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log('return from server ' + data);
        this.inviteCode = data as UserModel;
        this.router.navigate(['chat/' + this.inviteCode.personalCode]);
      });
  };
  dismiss = () => {
    this.getInvite.inviteReceived = false;
  }
}
