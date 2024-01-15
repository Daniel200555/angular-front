import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileInfo } from './file-info';
import { blob } from 'stream/consumers';
import { response } from 'express';
import { Environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class FtpService {

  private env: Environment = new Environment();

  private base = 'http://'+ this.env.ipServer +':8989/';

  constructor(private httpClient: HttpClient) { }

  // getFileInfoList(pathD: string): Observable<FileInfo[]> {
  //   return this.httpClient.get<FileInfo[]>(this.base + 'list', {
  //     params: {
  //       path: pathD
  //     }
  //   });
  // }

  getFileInfoList(pathD: string): Observable<FileInfo[]> {
    return this.httpClient.get<FileInfo[]>(this.base + 'list?path=/' + pathD + '/');
  }

  getSortByName(pathD: string): Observable<FileInfo[]> {
    return this.httpClient.get<FileInfo[]>(this.base + 'sort/name?path=/' + pathD + '/');
  }

  // download(path: string, name: string): Blob {
  //   var blob;
  //   this.httpClient.get(this.base + 'download?path=' + path + '&name=' + name, {responseType: 'blob'}).subscribe{response => {
  //     blob = new Blob([response.blob()], {type: 'video/mp4'})
  //   }};
  //   return blob;
  // }

  download(path: String, name: String): Observable<Blob> {
    return this.httpClient.get(this.base + 'download?path=' + path + '&name=' + name, {responseType: 'blob'});
  }

  downloadZip(user: String, file: String): Observable<Blob> {
    return this.httpClient.get(this.base + 'download/zip?user=' + user + '&file=' + file, {responseType: 'blob'});
  }

  compress(path: string, user: string, name: string): Observable<string> {
    return this.httpClient.get<string>(this.base + 'compress?path=' + path + '&user=' + user + '&name=' + name);
  }

  deleteCompress(user: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.base + 'delete/compress?user=' + user);
  }

  deleteDir(path: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.base + 'delete/directory?path=' + path);
  }

  // downloadZip(user: string, file: String): Observable<Blob> {
  //   return this.httpClient.get(this.base + 'dowload/zip?user=' + user + '&file=' + file);
  // }

  // download(path: String, name: String) {
  //   return this.httpClient.get(this.base + 'download?path=' + path + '&name=' + name, {responseType: 'blob' as 'json', reportProgress: true, observe: 'events'});
  // }

}
