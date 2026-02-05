import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-dialog',
  templateUrl: './yes-dialog.component.html',
  styleUrls: ['./yes-dialog.component.scss'],
})
export class YesDialogComponent {
  // Add your image paths here
  images = [
    'assets/photos/photo1.jpg',
    'assets/photos/photo2.jpg',
    'assets/photos/photo3.jpg',
    'assets/photos/photo4.jpg',
  ];

  constructor(public dialogRef: MatDialogRef<YesDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
