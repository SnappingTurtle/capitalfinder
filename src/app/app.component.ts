import { Component } from '@angular/core';
import { MapService } from './services/map.service';
import { MapConfig } from './config/mapConfig';

// for popup
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityDetailDialog } from './components/city-popup/city-detail-dialog.component';

import { Subject } from 'rxjs';

@Component({
  selector: 'georadix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'georadix';
  appTitleText="Georadix Example App";
  mapOptions = {
    mapCentre: MapConfig.mapCentre,
    mapZoom: MapConfig.mapZoom,
    basemap: MapConfig.baseMaps[MapConfig.basemap]
  }
  stateButtonO$: Subject<any>; // communicate button gesture

  constructor(
    private mapService: MapService,
    public dialog: MatDialog)
  {
    this.stateButtonO$ = new Subject();
    this.mapService.cityPopupO$.subscribe(feature => {
      this.openDialog(feature);
    })
  }

  toggleStates() {
    this.stateButtonO$.next(); // simple case, no need for subject matter
  }

  gotoCity(stateModel) {
    this.mapService.centreViewOnCity(stateModel);
  }

  // call openDialog on symbol click to pop a modal city detail component 
  openDialog(stateModel): void {
    const dialogRef = this.dialog.open(CityDetailDialog,{
      width: '250px',
      data: stateModel.stateModel
    })
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('modal dialog closed for ' + stateModel.city);
      })
  }
}
