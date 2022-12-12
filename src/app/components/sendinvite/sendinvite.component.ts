import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import SenfInviteService from 'src/app/services/signalr.sendInvite';
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
  ) {
    console.log('UserFromList');
    console.log(this.invitedUserName);
  }
  sendInviteClick = () => {
    
this.sendInvite.inviteSent = true
    
    let json = JSON.stringify(this.currentUser.personalCode);
    console.log(json)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:4200"
    });
    this.http
      .post(
        'https://localhost:5001/api/invite/' + this.invitedUserName,
        json,
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        console.log('return from server ' + data);
      });
  };
  ngOnInit() {
    this.sendInvite.startConnection();
    this.sendInvite.addTransferChartDataListener(this.currentUser.personalCode);
  }
}
