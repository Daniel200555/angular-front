import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../login';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrl: './wellcome.component.css'
})
export class WellcomeComponent {

  private nickname: string;
  private password: string;
  login: Login = new Login();

   constructor(private loginService: LoginService, private localStorage: LocalStorageService, private router: Router) {
    this.nickname = this.localStorage.getItem("nickname");
    this.password = this.localStorage.getItem("password");
    if (this.nickname != '' && this.password != '') {
      this.login.nickname = this.nickname;
      this.login.password = this.password;
      this.loginUser();
    }
   }

   goToHome(nick: string) {
    this.router.navigate(['home'], {
      queryParams: {
        'nickname': nick,
        'path': nick
      }
    });
  }

  loginUser() {
    this.loginService.loginUser(this.login).subscribe( data => {
      console.log(data);
      this.localStorage.saveUser(this.login.nickname, this.login.password);
      this.goToHome(this.login.nickname);
    }, error => console.log(error));
  }

}
