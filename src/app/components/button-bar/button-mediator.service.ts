import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ButtonMediatorService {

  // state sidebar mediation
  stateSidebarButtonState=false;
  stateSidebarButtonStateO$: Subject<any>; // observable subject to communicate state to peers

  // forward and back button mediation
  navigateBackButtonClickO$: Subject<any>;
  navigateForwardButtonClickO$: Subject<any>
  constructor() { 
    this.stateSidebarButtonStateO$ = new Subject();
    this.navigateBackButtonClickO$ = new Subject();
    this.navigateForwardButtonClickO$ = new Subject();
  }

  toggleStates() {
    this.stateSidebarButtonState = !this.stateSidebarButtonState;
    this.stateSidebarButtonStateO$.next(this.stateSidebarButtonState);
  }

  back() {
    this.navigateBackButtonClickO$.next();
  }
  forward() {
    this.navigateForwardButtonClickO$.next();
  }
}
