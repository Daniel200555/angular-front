import { Component } from '@angular/core';
import { Register } from '../register';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  register: Register = new Register();

  constructor (private registerService: RegisterService, private router: Router) { }

  createUser() {
    this.registerService.createUser(this.register).subscribe( data => {
      console.log(data);
      this.goToHome(this.register.nickname);
    }, error => console.log(error));  
  }

  goToHome(nick: string) {
    this.router.navigate(['home'], {
      queryParams: {
        'nickname': nick,
        'path': nick
      }
    });
  }

}
