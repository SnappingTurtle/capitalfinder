import { Injectable } from '@angular/core';

// angular http client
import { HttpClient } from '@angular/common/http';

// peer events from the button mediator
import { ButtonMediatorService } from '../components/button-bar/button-mediator.service';

// for popup observable
import { Subject } from 'rxjs';

// openlayers stuff
import Map from 'ol/Map';
import View from 'ol/View';
import TileSource from 'ol/source';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

// map config stuff not passed in the initMapView call from app
import { MapConfig } from '../config/mapConfig';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;  // the openlayers map obejct
  labelColor: string;  // could use for graticules
  stateData: any;
  defaultSymbolStyle: Style;
  stateLayer: VectorLayer;
  stateHistory: Array<any> = [];  // holds up to 5 visits
  stateHistoryPointer: number = 0; // points to current visit
  readonly MAX_HISTORY: number = 5;

  // for city popup will emit event to app component
  cityPopupO$: Subject<any>

  // from mapconfig
  stateSource = MapConfig.stateSource;
  bsource: string = "http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"

  constructor(
    private http: HttpClient,
    private buttonService: ButtonMediatorService) {

      // subscribe for system level navigation gestures
      this.buttonService.navigateBackButtonClickO$.subscribe(() => {
        this.gotoPreviousVisit();
      })
      this.buttonService.navigateForwardButtonClickO$.subscribe(() => {
        this.gotoNextVisit();
      })

      this.initData();

      this.cityPopupO$ = new Subject();

   }
   
  initData() {
    this.getStateCapitals();
    this.createSymbolStyle();
  }

  initMapView(mapContainerElement: HTMLElement, mapOptions?) {
    // instantiate the map
    this.map = new Map(
      {
        view: new View({
            projection: 'EPSG:4326',
            center: mapOptions.mapCentre,
            zoom: mapOptions.mapZoom
         }),
        target: mapContainerElement,
        layers: [
        ]
      }
    ); // end of OLMap declaration

    // set the basemap - blank defaults to OSM.org
    this.setBasemapLayer(mapOptions.basemap.url);

    // add any listeners
    this.addMapListeners();

  }

  setBasemapLayer(basemap?) {
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

  addMapListeners() {
    this.map.on('singleclick', (e:any) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        this.cityPopupO$.next(feature); // tell app component of click on feature
      })
    })
  }

  getStateCapitals() {
    this.http.get(this.stateSource)
      .subscribe(data => 
        {
          this.stateData = data;
          this.visualizeStateCapitals();
        });
  }

  visualizeStateCapitals() {
    this.createFeatureLayer('stateCapitals');
    this.placeFeaturesOnMap()
  }

  // map util methods ------------------------
  createFeatureLayer(layerId) {
    let source = new VectorSource({
      features: []
    })
    let layer = new VectorLayer({
      source: source,
      visible: true
      
    })
    layer["id"] = layerId;
    this.stateLayer = layer;
    this.map.getLayers().push(layer); // insert at top
  }
  placeFeaturesOnMap() {

    let states = this.stateData;
    for (let i = 0; i < states.length; i++) {
      let point: Point = new Point([states[i].lon, states[i].lat]);
      let feature: Feature = new Feature({
        geometry: point
      })
      feature['stateModel'] = states[i];
      feature.setStyle(this.defaultSymbolStyle);
      this.stateLayer.getSource().addFeature(feature);
    }

  }

  createSymbolStyle() : Style {
    var iconStyle = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.05,
        src: '../../assets/bluemapicon.png'
      }))
    });
    this.defaultSymbolStyle = iconStyle;
    return iconStyle;
  }

  centreViewOnCity(stateModel: any, newVisit: boolean = true) {
    this.map.getView().setCenter([stateModel.lon, stateModel.lat]);
    this.map.getView().setZoom(10);
    if (newVisit === true) {
      this.addHistory(stateModel);
    }
    
  }

  // custom history stack to go back and forth
  addHistory(stateModel) {
    if (this.stateHistory.length === this.MAX_HISTORY) {
      this.stateHistory.shift();
    }
    this.stateHistory.push(stateModel);
    this.stateHistoryPointer = this.stateHistory.length - 1; // always place on top despite visit state
    
  }
  gotoPreviousVisit() {
    if (this.stateHistoryPointer === 0) {
      return;
    }
    this.stateHistoryPointer = this.stateHistoryPointer - 1;
    this.centreViewOnCity(this.stateHistory[this.stateHistoryPointer], false);
  }
  gotoNextVisit() {
    if (this.stateHistoryPointer === this.MAX_HISTORY-1 || !this.stateHistory[this.stateHistoryPointer + 1] ) {
      return;
    }
    this.stateHistoryPointer = this.stateHistoryPointer + 1;
    this.centreViewOnCity(this.stateHistory[this.stateHistoryPointer], false);
  }

}
