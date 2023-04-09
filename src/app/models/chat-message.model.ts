export class ChatMessage {
  message: string
  time: number
  author: string
  receiver: string

  constructor(message: string, time: number, author: string, receiver: string) {
    this.message = message;
    this.time = time;
    this.author = author;
    this.receiver = receiver
  }
}
