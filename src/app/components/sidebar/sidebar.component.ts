import { Component, OnInit, Input } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

// to receive notifications of app state button
import { Subject } from 'rxjs';
import { ButtonMediatorService } from '../../components/button-bar/button-mediator.service'; // holds button state

@Component({
  selector: 'georadix-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    /* animates opening of sidebar when configured as "left" and state implicates a left state */
    trigger(
     'openLeftSidebarDrawer', [
        state('left-closed', style({left: '{{closedOffsetX}}' + 'px',  width: '{{sidebarWidth}}' + 'px', top: '{{offsetTop}}' + 'px'}), { params: { closedOffsetX: -400, sidebarWidth: '400', offsetTop: 50 }}),
        state('left-open', style({left: '{{openOffsetX}}' + 'px', width: '{{sidebarWidth}}' + 'px', top: '{{offsetTop}}' + 'px'}), { params: { openOffsetX: 0, sidebarWidth: '400', offsetTop: 0 }}),
        transition('left-closed => left-open', [animate('250ms ease-in')], {delay: 10000}),
        transition('left-open => left-closed', animate('250ms ease-out'))
     ]
    ),
    /* animates opening of sidebar when configured as "right" and state implicates a right state */
    trigger(
      'openRightSidebarDrawer', [
         state('right-closed', style({right: '{{closedOffsetX}}' + 'px', width: '{{sidebarWidth}}' + 'px', top: '{{offsetTop}}' + 'px'}), { params: { closedOffsetX: 0, sidebarWidth: '400', offsetTop: 0}}),
         state('right-open', style({right: '{{openOffsetX}}' + 'px', width: '{{sidebarWidth}}' + 'px', top: '{{offsetTop}}' + 'px'}), { params: { openOffsetX: 400, sidebarWidth: '400', offsetTop: 0}}),
         transition('right-closed => right-open', [animate('250ms ease-in')], {delay: 10000}),
         transition('right-open => right-closed', animate('250ms ease-out'))
      ]
     ),
    
  ]
})
export class SidebarComponent implements OnInit {

  @Input() closedOffsetX: number = 100;
  @Input() openOffsetX: number;
  @Input() offsetTop: number;
  @Input() sidebarWidth: number;
  @Input() sidebarMode: string;
  @Input() heightPercent: number = 100;

  openState: string= "inactive";
  readonly DEFAULT_WIDTH: string = '400';
  sidebarDrawerState = 'left-closed';
  
  constructor(
    private buttonService: ButtonMediatorService
  ) { }

  ngOnInit() {
    this.sidebarDrawerState = this.sidebarMode==='left' ? 'left-closed' : 'right-closed';
    this.buttonService.stateSidebarButtonStateO$.subscribe(() => {
      this.toggle();
    })

  }

  // support for left or right configured sidebar
  toggle() {

    switch (this.sidebarDrawerState) {
      case 'left-open': {
        this.sidebarDrawerState = 'left-closed';
        break;
      }
      case 'left-closed': {
        this.sidebarDrawerState = 'left-open';
        break;
      }
      case 'right-open': {
        this.sidebarDrawerState = 'right-closed';
        break;
      }
      case 'right-closed': {
        this.sidebarDrawerState = 'right-open';
        break;
      }
    }
  }


}
