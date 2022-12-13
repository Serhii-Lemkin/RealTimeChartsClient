import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import SenfInviteService from 'src/app/services/signalr.sendInvite';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/_interfaces/usermodel';

@Component({
  selector: 'app-sendinvite',
  templateUrl: './sendinvite.component.html',
  styleUrls: ['./sendinvite.component.css'],
})
export class SendinviteComponent {
  //username
  @Input() invitedUserName!: string;
  //me
  @Input() currentUser!: UserModel;
  constructor(
    private router: Router,
    public sendInvite: SenfInviteService,
    private http: HttpClient
  ) {this.sendInvite.inviteSent = false;}
  sendInviteClick = () => {
    this.sendInvite.inviteSent = true;
    let json = JSON.stringify(this.currentUser.personalCode);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(`${environment.apiURL}/api/invite/${this.invitedUserName}`, json, {
        headers: headers,
      })
      .subscribe((data) => {});
  };
  ngOnInit() {
    this.sendInvite.startConnection();
    this.sendInvite.addTransferChartDataListener(this.currentUser.personalCode);
  }
}
