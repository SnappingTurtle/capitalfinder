import { Injectable } from '@angular/core';
import ol from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
//import Source from 'ol/Source';
import TileSource from 'ol/source';
import XYZ from 'ol/source/XYZ';
import Tile from 'ol/source/Tile';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;  // the openlayers map obejct
  labelColor: string;
  bsource: string = "http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}";

  constructor() {
    
   }

  initMapView(mapContainerElement: HTMLElement, mapOptions) {
    
    // instantiate the map
    this.map = new Map(
      {
        view: new View({
            projection: 'EPSG:4326',
            //center: mapOptions.centreZoom.centre,
            center: [-98.849, 40.366],
            //zoom: mapOptions.centreZoom.zoom
            zoom: 6
          }),
        target: mapContainerElement,
        layers: [
        ]
      }
    ); // end of OLMap declaration

    // set the basemap
    //;
    this.setBasemapLayer(this.bsource)

  }

  setBasemapLayer(basemap) {
    let source: TileSource;
  
    // check for requested basemap
    if (!basemap) {
      source = new OSM(); // used default openlayers source if none passed
    }
    else {
      source = new XYZ({
        url: basemap
      });
    }
    
    let tileLayer = new TileLayer({
      source: source
    });
    this.map.getLayers().insertAt(0, tileLayer); // basemap added at base
  }
}
