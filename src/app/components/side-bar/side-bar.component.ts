import {Component, Input} from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import {ChatBuckets} from "../../models/chat-buckets.model";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  @Input()
  chatBuckets: Array<ChatBuckets> = [];

}
