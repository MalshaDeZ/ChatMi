import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChatMessage} from "../../models/chat-message.model";
import {ChatBuckets} from "../../models/chat-buckets.model";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent {

  @Input()
  timeBuckets: ChatBuckets[] = [];

  currentUser = ''

  sendMessageForm = new FormGroup({
    newMessage: new FormControl('')
  });

  @Output()
  sendMessage = new EventEmitter<string>()
  otherUser: string = '';

  constructor(private sanitization: DomSanitizer) {
    if (localStorage.getItem('USER')) {
      // @ts-ignore
      this.currentUser = localStorage.getItem(`USER`).toString();
    }
    if (localStorage.getItem('OTHER_USER')) {
      // @ts-ignore
      this.otherUser = localStorage.getItem(`OTHER_USER`).toString();
    }
    const chatBox = document.querySelector('.chat-box');
    // @ts-ignore
    // chatBox.style.backgroundImage = 'url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Flink-background&psig=AOvVaw3oU9z3kogTSxE1sJ1SF9cO&ust=1681147917078000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJiz7ZSqnf4CFQAAAAAdAAAAABAE)';
    // // @ts-ignore
    // chatBox.style.backgroundRepeat = 'no-repeat';
    // // @ts-ignore
    // chatBox.style.backgroundSize = 'cover';
  }

  // Return trust style
  getSafeUrl(filePreviewUrl:string){
    filePreviewUrl='https://picsum.photos/200/300.jpg'
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }
  sendMsg() {
    let msg: string = ''
    if (this.sendMessageForm.value.newMessage) {
      msg = this.sendMessageForm.value.newMessage;
    }
    this.sendMessage.emit(msg);
    this.sendMessageForm.reset();
  }

  isMe(author: string) {
    return author === this.currentUser;
  }
}
