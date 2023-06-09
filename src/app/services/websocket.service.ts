// src\app\services\websocket.service.ts
import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChatMessage} from "../models/chat-message.model";

const CHAT_URL = "wss://socketsbay.com/wss/v2/1/demo/";

export interface Message {
  source: string;
  content: string;
}

@Injectable()
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent> | undefined;
  public messages: Subject<ChatMessage>;

  constructor() {
    this.messages = <Subject<ChatMessage>>this.connect(CHAT_URL).pipe(
      map(
        (response: MessageEvent): ChatMessage => {
          console.log(response.data);
          let data = JSON.parse(response.data)
          console.log(data , 'parsed');
          return  new ChatMessage(data.message,data.time , data.author, data.receiver);
        }
      )
    );
  }

  public connect(url:string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url:string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    // @ts-ignore
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
