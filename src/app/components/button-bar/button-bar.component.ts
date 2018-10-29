import { Component, OnInit } from '@angular/core';

// use button mediator to manage and communicate button state
import { ButtonMediatorService } from './button-mediator.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'georadix-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.scss']
})
export class ButtonBarComponent implements OnInit {

  stateButtonState = false;
  constructor(
    private buttonService: ButtonMediatorService,
    private mapService: MapService
  ) { }

  ngOnInit() {

  }

}
