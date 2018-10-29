import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface ICity {
    city: string;
    state: string;
  }

@Component({
    selector: 'city-detail-dialog',
    templateUrl: './city-detail-dialog.component.html',
    styleUrls: ['./city-detail-dialog.component.scss']
})

export class CityDetailDialog {

    constructor(
        public dialogRef: MatDialogRef<CityDetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ICity) {

        }

    closeDialog() {
        this.dialogRef.close()
    }
    
}