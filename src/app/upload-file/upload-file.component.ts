import {Component, Inject, Optional} from '@angular/core';
import {FtpService} from "../ftp.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {

  private path: string;
  filename: string;
  private file: File;
  shortLink: string = "";
  loading: boolean = false;
  process: boolean = false;

  constructor(private serviceFtp: FtpService,@Optional() @Inject(MAT_DIALOG_DATA) public data: {path: string}) {
    this.path = data.path;

  }

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
    this.serviceFtp.uploadFile(this.path, this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      }
    );
  }

}
