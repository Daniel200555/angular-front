import { Component, OnDestroy, OnInit } from '@angular/core';
import { FtpService } from '../ftp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInfo } from '../file-info';
import { MatDialog } from '@angular/material/dialog';
import { VideoComponent } from '../video/video.component';
import { CookieService } from 'ngx-cookie-service';
import { ImageComponent } from '../image/image.component';
import { DomSanitizer } from '@angular/platform-browser';;
import { Environment } from '../environment';
import { Observable, Subject } from 'rxjs';
import {LocalStorageService} from "../local-storage.service";
import {UploadFileComponent} from "../upload-file/upload-file.component";
import {UploadFolderComponent} from "../upload-folder/upload-folder.component";
import {MongoFileService} from "../mongo-file.service";
import {FileData} from "../file-data";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  env: Environment = new Environment();
  fileInfo: FileInfo = new FileInfo();
  down: FileInfo[];
  filesInfo: FileInfo[];
  fileData: FileData[];
  public temp = [];
  nickname: string;
  path: string;
  private blobtemp: Blob;
  private nickcookie;
  private password;
  // private blobs: Array<FileTemp> = new Array();
  base = "http://192.168.2.102:8989/stream?title=";

  constructor(private fileDataService: MongoFileService, private localStorage: LocalStorageService, private sanitizer: DomSanitizer,private matDialog: MatDialog, private serviceFtp: FtpService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.nickcookie = this.localStorage.getItem("nickname");
    this.password = this.localStorage.getItem("password");
    // if (this.cookieService.get('check') && ) {
    if (this.nickcookie != '' || this.password != '') {
      this.route.queryParams.subscribe(params => {
        this.nickname = params['nickname'];
        this.path = params['path'];
      });
      if (this.nickcookie !== this.nickname) {
        router.navigate(['']);
      }
      this.getAll(this.nickname, this.path);
    } else {
      router.navigate(['']);
    }
  // }else {

  // }

  }

  getAll(nickname: string, dir: string) {
    // this.serviceFtp.getFileInfoList(path).subscribe( data => {
    //   console.log(data);
    //   // data.sort((a,b) => a.name.localeCompare(b.name));
    //   // console.log(data);
    //   this.filesInfo = data;
    // })
    this.fileDataService.getFileDataList(nickname, dir).subscribe( data => {
      console.log(data.length);
      this.fileData = data;
    })
  }

  public getAllList(path: string) {
    var result = new Subject<FileInfo>;
    // var tempF = [];
    var blob;
    this.serviceFtp.getFileInfoList(path).subscribe( data => {
      // console.log(data);
      // for(let f of data) {
      //   this.temp.push(f);
      // }
      // this.temp = data;
      for(let f of data) {

      }
    })
    // console.log(this.temp.length);
  }

  getBlob(path: string, name: string): any {
    this.serviceFtp.download(path, name).subscribe( blob => {
      return blob;
    })
  }

  getSort(path: string) {
    this.serviceFtp.getSortByName(path).subscribe( data => {
      console.log(data);
      this.filesInfo = data;
    });
  }

  downloadFile(file: FileInfo) {
    const baseLink = 'http://' + this.env.ipServer + ':8989/download'
    const temp = '?path=' + file.path + '&name=' + file.name;
    window.open(baseLink + encodeURIComponent(temp), '_blank');
  }

  open(file: FileData) {
    if(file.format === 'NULL') {
      console.log(file.dir);
      window.open('http://'+ this.env.ipHost +'/home?nickname=' + this.nickname + '&path=' + file.dir, '_self');
    }
    if(!file.isFile) {
      if (file.type === 'VIDEO') {
        this.openVideo(file.dir);
      } else if (file.type === 'PICTURE') {
        this.openPicture(file.dir);
      }
    }
  }

  openVideo(src: string) {
    const dialogRef = this.matDialog.open(VideoComponent, {
      width: '60%',
      height: '60%',
      data: {
        path: src
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    });
  }

  openPicture(src: string) {
    const dialogRef = this.matDialog.open(ImageComponent, {
      // width: '60%',
      // height: '60%',
      autoFocus: true,
      data: {
        path: src
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    });
  }

  goToVideo(title: string, path: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['video'], {
      queryParams: {
        'path': path,
        'title': title
      }
    }));
    window.open(this.base + path, '_blank')
  }

  view(title: string, path: string) {
    const dialogRef = this.dialog.open(VideoComponent, {
      data: {
        'path': path,
        'title': title
      }
    });
  }

  logout() {
    this.localStorage.clearAll();
    this.router.navigate(['']);
  }

  downl(url: string): Blob {
    return new Blob([url], {type: 'video/mp4'});
  }


  download(file: FileData) {
    if (file.isFile) {
    } else if (!file.isFile) {
      // this.router.navigate(['compress'], {
      //   queryParams: {
      //     'user': this.nickname,
      //     'name': file.name,
      //     'path': file.path
      //   }
      // });
      window.open('http://' + this.env.ipServer + '/compress?user=' + this.nickname + '&name=' + file.filename + '&path=' + file.dir,'_blank')
    }
  }


  deleteDir(file: FileInfo) {
    this.serviceFtp.deleteDir(file.path).subscribe(data => {

    });
    // window.open('http://' + this.env.ipServer + '/home?nickname=' + this.nickname + '&path=' + this.path, '_self')
  }

  deleteFile(file: FileData) {
    this.fileDataService.deleteFile(this.nickname, file.dir).subscribe( data => {
      window.open('http://'+ this.env.ipHost +'/home?nickname=' + this.nickname + '&path=/', '_self');
    });
    // window.open('http://' + this.env.ipServer + '/home?nickname=' + this.nickname + '&path=' + this.path, '_self')
  }

  uploadOnlyFile() {
    const dialogRef = this.matDialog.open(UploadFileComponent, {
      width: '60%',
      height: '60%',
      data: {
        nickname: this.nickname,
        path: this.path
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    });
  }

  uploadDirectory() {
    const dialogRef = this.matDialog.open(UploadFolderComponent, {
      width: '60%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    });
  }

  protected readonly encodeURIComponent = encodeURIComponent;
}
