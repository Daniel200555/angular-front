import {Component, Inject, Optional} from '@angular/core';
import {FtpService} from "../ftp.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MongoFileService} from "../mongo-file.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {

  private path: string;
  private nickname: string;
  filename: string;
  private file: File;
  shortLink: string = "";
  loading: boolean = false;
  process: boolean = false;

  constructor(private serviceMongo: MongoFileService, private serviceFtp: FtpService,@Optional() @Inject(MAT_DIALOG_DATA) public data: {nickname: string, path: string}) {
    this.path = data.path;
    this.nickname = data.nickname;
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length) {
  //     this.file = input.files;
  //   }
  // }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    // if (file) {
    //   this.filename = file.name;
    //   const formData = new FormData();
    //   formData.append("thumbnail", file);
    //   this.serviceFtp.uploadFile(this.path, formData).subscribe();
    // }
  }

  onUpload() {
    this.loading = !this.loading;
    this.process = true;
    console.log(this.file);
    // const formData: FormData = new FormData();
    // let temp: File | null = null;
    // for (let i = 0; i < this.file.length; i++) {
    //   temp = this.file.item(i);
    //   if (temp) {
    //     formData.append('file', temp);
    //   }
    // }
    // this.serviceFtp.uploadFile(this.path, this.file).subscribe(
      // (event: any) => {
      //   if (typeof (event) === 'object') {
      //     this.shortLink = event.link;
      //     this.loading = false;
      //   }
      // }
    // );
    this.serviceMongo.uploadFile(this.nickname, this.path, this.file).subscribe(data => {

    });
  }

}
