import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from './register';
import { Environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private env: Environment = new Environment();

  private base = 'http://'+ this.env.ipServer +':8981/register/';

  constructor(private httpClient: HttpClient) { }

  createUser(register: Register): Observable<Object> {
    return this.httpClient.post(this.base, register);
  }

}
