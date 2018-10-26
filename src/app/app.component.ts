import { Component } from '@angular/core';
import { MapService } from './services/map.service';
import { MapConfig } from './config/mapConfig';

@Component({
  selector: 'georadix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'georadix';
  mapOptions = {
    centreZoom: MapConfig.mapCentreUSA, 
    basemap: MapConfig.baseMaps['National Geographic']
  }

  constructor(
    private mapService: MapService)
  {
    //this.mapService.doSomething();
  }
}
