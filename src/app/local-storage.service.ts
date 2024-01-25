import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  saveUser(nickname: string, password: string) {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("password", password);
  }

  clearAll() {
    localStorage.clear();
  }

  clearByKey(key: string) {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

}
