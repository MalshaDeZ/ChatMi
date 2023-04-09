import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  drop: boolean = true;
  username: string = '';
  users: string[] = ['Jane', 'John']

  constructor(private router: Router) {
  }

  setUser(name: string, index: number) {
    this.drop = false;
    if (index == 0) {
      localStorage.setItem('USER', this.users[0]);
      localStorage.setItem('OTHER_USER', this.users[1])
    } else {
      localStorage.setItem('USER', this.users[1]);
      localStorage.setItem('OTHER_USER', this.users[0])
    }

    this.username = name;
  }

  onLogin() {
    this.router.navigate(['/chat']);
  }
}
