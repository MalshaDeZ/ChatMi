import {Component} from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import {ChatMessage} from "../../models/chat-message.model";
import {ChatBuckets} from "../../models/chat-buckets.model";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent {


  received: ChatMessage[] = [];
  sent: ChatMessage[] = [];
  chatBucket: Array<ChatBuckets> = [];
  currentUser: string = ''
  otherUser: string = ''

  constructor(private WebsocketService: WebsocketService) {
    this.chatBucket = [];
    WebsocketService.messages.subscribe(msg => {
      this.received.push(msg);
      this.sortMessagesToBuckets(msg);
      console.log("Response from websocket: " + msg);
    });

    if (localStorage.getItem('USER')) {
      // @ts-ignore
      this.currentUser = localStorage.getItem(`USER`).toString();
    }
    if (localStorage.getItem('OTHER_USER')) {
      // @ts-ignore
      this.otherUser = localStorage.getItem(`OTHER_USER`).toString();
    }
  }

  private sortMessagesToBuckets(message: ChatMessage) {
    let messageDate = new Date(message.time)
    if (this.chatBucket.length === 0) {
      this.addANewBucket(message, messageDate);
    } else {
      if (this.chatBucket[this.chatBucket.length - 1].time.setHours(0, 0, 0, 0) === messageDate.setHours(0, 0, 0, 0)) {
        this.chatBucket[this.chatBucket.length - 1].bubbleBuckets.push(message);
      } else {
        this.addANewBucket(message, messageDate);
      }
    }
    console.log(this.chatBucket, 'chat bucket ');
  }

  private addANewBucket(message: ChatMessage, messageDate: Date) {
    let messageBucket: ChatMessage[] = []
    messageBucket.push(message)
    this.chatBucket.push(new ChatBuckets(messageDate, messageBucket))
  }

  sendMsg(content: string) {

    let message = new ChatMessage(content, Date.now(), this.currentUser, 'mia')

    this.sent.push(message);
    this.sortMessagesToBuckets(message);
    this.WebsocketService.messages.next(message);
  }
}
