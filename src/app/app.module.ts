import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import {WebsocketService} from "./services/websocket.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StartPageComponent } from './start-page/start-page.component';
import {RouterOutlet} from "@angular/router";
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', component: StartPageComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    SideBarComponent,
    ChatContentComponent,
    StartPageComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
