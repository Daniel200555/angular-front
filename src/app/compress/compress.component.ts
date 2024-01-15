import { Component } from '@angular/core';
import { FtpService } from '../ftp.service';
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { Environment } from '../environment';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compress',
  templateUrl: './compress.component.html',
  styleUrl: './compress.component.css'
})
export class CompressComponent {

  progress = true;
  delete = false;
  private environment: Environment = new Environment();
  private base: string = 'http://' + this.environment.ipServer + ':8989/download/zip/';

  private filename: string;
  private urlFile: string;
  private nickcookie: string;

  private nickname: string;
  private path: string;
  private filen: string;

  constructor(private serviceFtp: FtpService, private cookieService: CookieService, private route: ActivatedRoute) {
    // this.nickcookie = this.cookieService.get('nickname');
    // this.filename = cookieService.get('filename');
    // this.urlFile = cookieService.get('url')
    // if (this.urlFile != null || this.urlFile != '') {
    //   this.progress = false;
    // } else {
    //   if (this.filename != null || this.filename != '') {
    //     this.delete = true;
    //   } else {
    //     this.route.queryParams.subscribe(params => {
    //       this.nickname = params['user'];
    //       this.path = params['path'];
    //       this.filen = params['name'];
    //     });
    //     this.compress();
    //   }
    // }
    this.route.queryParams.subscribe(params => {
      this.nickname = params['user'];
      this.path = params['path'];
      this.filen = params['name'];
    });
    this.compress();
  }

  compress() {
    this.cookieService.set('filename', this.filen);
    this.serviceFtp.compress(this.path, this.nickname, this.filen).subscribe( data => {
      // while (data == null || data == '' || data == "") {
      //   console.log("In progress");
      //   this.progress = true;
      // }
    })
    
    this.cookieService.set('url', this.base + this.cookieService.get('filename') + '?user=' + this.nickname);
    this.progress = false;
  }

  download() {
    // var temp = this.base + this.filen + '?user=' + this.nickname;
    var temp = this.cookieService.get('url');
    window.open(temp, '_blank');
  }

  cancel() {

  }

}
