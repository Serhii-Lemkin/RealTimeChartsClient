export class MessageModel {
  constructor(
    public code: string = '',
    public from: string = '',
    public date: Date = new Date(),
    public messageText: string = ''
  ) {}
}
