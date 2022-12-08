import { HttpClient } from '@angular/common/http';
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
    //this.router.navigate(['chat/' + code]);
  };
  dismiss = () => {
    this.getInvite.inviteReceived = false;
  }
}
