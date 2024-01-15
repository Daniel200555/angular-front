import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Environment } from '../environment';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

  private env: Environment = new Environment();

  private path: string;
  private title: string;
  private base = 'http://'+ this.env.ipServer +':8989/stream/picture?title=';
  result: string;


  constructor(public dialogRef: MatDialogRef<ImageComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: {path: string}) {
    this.path = data.path;
    this.result = this.base + this.path;
    console.log(this.result);
  }

}