import { Component } from '@angular/core';
import { MapService } from './services/map.service';
import { MapConfig } from './config/mapConfig';

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
    private mapService: MapService)
  {
    this.stateButtonO$ = new Subject();
  }

  toggleStates() {
    this.stateButtonO$.next(); // simple case, no need for subject matter
  }

  gotoCity(stateModel) {
    this.mapService.centreViewOnCity(stateModel);
  }
}
