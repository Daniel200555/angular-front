import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../login';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrl: './wellcome.component.css'
})
export class WellcomeComponent {

  private nickname: string;
  private password: string;
  login: Login = new Login();

   constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) {
    this.nickname = this.cookieService.get('nickname');
    this.password = this.cookieService.get('password');
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
      this.cookieService.set('nickname', this.login.nickname);
      this.cookieService.set('password', this.login.password);
      this.goToHome(this.login.nickname);
    }, error => console.log(error));  
  }

}