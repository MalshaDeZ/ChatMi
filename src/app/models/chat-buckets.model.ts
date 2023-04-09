import {ChatMessage} from "./chat-message.model";

export class ChatBuckets {
  time: Date;
  bubbleBuckets: ChatMessage[]


  constructor(time: Date, bubbleBucket: ChatMessage[]) {
    this.time = time;
    this.bubbleBuckets = bubbleBucket;
  }

  addBubble(message: ChatMessage) {
    this.bubbleBuckets.push(message);
  }
}
