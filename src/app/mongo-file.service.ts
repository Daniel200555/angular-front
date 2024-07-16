import { Injectable } from '@angular/core';
import {Environment} from "./environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileData} from "./file-data";
import {FileFront} from "./file-front";

@Injectable({
  providedIn: 'root'
})
export class MongoFileService {


  private env: Environment = new Environment();

  private base = 'http://'+ this.env.ipServer +':8989/';

  constructor(private httpClient: HttpClient) { }



  getFileDataList(nickname: string, dir: string): Observable<FileData[]> {
    return this.httpClient.get<FileData[]>(this.base + 'mongo/show?nickname=' + nickname + '&dir=' + dir);
  }

  deleteFile(nickname: string, dir: string): Observable<FileData[]> {
    return this.httpClient.get<FileData[]>(this.base + 'mongo/delete?nickname=' + nickname + '&dir=' + dir);
  }

  uploadFile(nickname: string, dir: string, files: File): Observable<FileData[]>{
    const formData: FormData = new FormData();
    formData.append('nickname', nickname);
    formData.append('dir', dir);
    formData.append('file', files)
    return this.httpClient.post<FileData[]>(this.base + 'mongo/add/file',formData);
  }

}
