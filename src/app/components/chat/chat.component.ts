import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MessageService from 'src/app/services/signalr.messageserv';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  code: string
  constructor(
    private route: ActivatedRoute,
    private messanger: MessageService
    ) {
    this.code = this.route.snapshot.paramMap.get('code')!;
  }

  ngOnInit() {
    this.messanger.startConnection();
    this.messanger.addTransferChartDataListener(this.code);
  }

  sendMessage = () => {

  }
}
