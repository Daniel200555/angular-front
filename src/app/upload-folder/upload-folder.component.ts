import { Component } from '@angular/core';
import {strings} from "@material/dialog";

@Component({
  selector: 'app-upload-folder',
  templateUrl: './upload-folder.component.html',
  styleUrl: './upload-folder.component.css'
})
export class UploadFolderComponent {

  private file: FileList;

  uploadFolder(event: any) {
    this.file = event.target.files;
    console.log(this.file.length);
  }

  onUpload() {
    for(let i = 0; i < this.file.length; i++) {
      const f = this.file[i];
      if (f.webkitRelativePath.split('/').length >= 1) {
        for (let j = 0; j < f.webkitRelativePath.split('/').length; j++) {
          console.log(f.webkitRelativePath.split('/')[j]);
        }
      }
    }
  }

  dir(file: FileList) {
    for(let i = 0; i < this.file.length; i++) {
      const f = this.file[i];

    }
  }
}
