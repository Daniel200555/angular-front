import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private env: Environment = new Environment();

  private base = 'http://'+ this.env.ipServer +':8981/login/';

  constructor(private httpClient: HttpClient) { }

  loginUser(login: Login): Observable<Object> {
    return this.httpClient.post(this.base, login);
  }

}
