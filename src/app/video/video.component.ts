import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FtpService } from '../ftp.service';
import { Title } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Environment } from '../environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

  private env: Environment = new Environment();

  private path: string;
  private title: string;
  private base = 'http://'+ this.env.ipServer +':8989/stream/video?title=';
  result: string;

  // constructor(private ftpService: FtpService, private route: ActivatedRoute, private titleService: Title) {
  //   this.route.queryParams.subscribe(params => {
  //     this.path = params['path'];
  //     this.title = params['title'];
  //   });
  //   this.titleService.setTitle(this.title);
  //   this.result = this.base + this.path;
  //   console.log(this.result);
  // }

  // constructor(public dialogRef: MatDialogRef<VideoComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  //   this.title = data.title;
  //   this.path = data.path;
  //   this.result = this.base + this.path;
  //   console.log(this.result);
  // }

  constructor(public dialogRef: MatDialogRef<VideoComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: {path: string}) {
      // console.log(data.path);
      // this.result = this.base = data.path;
    this.path = data.path;
    this.result = this.base + encodeURIComponent(this.path);
    console.log(this.result);
  }

}
