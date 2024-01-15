import { Component } from '@angular/core';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: Login = new Login();
  private nickname: string;
  private password: string;
  errorMessage: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) {
  
    // if (this.nickname != null && this.password != null) {
    //   this.login.nickname = this.nickname;
    //   this.login.password = this.password;
    //   this.loginUser();
    // } 
   }

  loginUser() {
    this.loginService.loginUser(this.login).subscribe( data => {
      console.log(data);
      this.cookieService.set('nickname', this.login.nickname);
      this.cookieService.set('password', this.login.password);
      this.goToHome(this.login.nickname);
    }, error => {
      console.log(error)
      this.errorMessage = true;
    });  
  }

  goToHome(nick: string) {
    this.router.navigate(['home'], {
      queryParams: {
        'nickname': nick,
        'path': nick,
        'check': true
      }
    });
  }

  // goToHome(nick: string) {
  //   this.router.navigate(['home']);
  // }

}
