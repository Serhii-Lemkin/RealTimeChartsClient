import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import MessageService from 'src/app/services/signalr.messageserv';
import { MessageModel } from 'src/_interfaces/message.model';
import { UserModel } from 'src/_interfaces/usermodel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  currentUser!: UserModel;
  message!: MessageModel;
  code: string;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public messanger: MessageService,
    private router: Router
  ) {
    this.message = new MessageModel();
    this.code = this.route.snapshot.paramMap.get('code')!;
    let tmp = sessionStorage.getItem('currentUser');
    if (tmp) this.currentUser = JSON.parse(tmp);
    else this.router.navigate(['/']);
    this.message.from = this.currentUser.userName;
  }

  ngOnInit() {
    this.messanger.startConnection();
    this.messanger.addTransferDataListener(
      this.code,
      this.currentUser.userName
    );
  }

  sendMessage() {
    if (!this.message.messageText || this.message.messageText.trim() === '') {
      this.message.messageText = '';
      return;
    }
    this.message.code = this.code;
    this.message.date = new Date();
    this.http
      .post('https://localhost:5001/api/message', this.message)
      .subscribe((data) => console.log(data));
    this.message = new MessageModel(
      '',
      this.currentUser.userName,
      new Date(),
      ''
    );
  }
}
