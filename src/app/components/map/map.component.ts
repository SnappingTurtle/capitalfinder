import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'georadix-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mapOptions: any;
  @Input() theZoom: number;

  constructor(
    private mapService: MapService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    // call map service to init self with dom reference and input config
    this.mapService.initMapView(this.elementRef.nativeElement.firstChild, this.mapOptions);
  }

}
