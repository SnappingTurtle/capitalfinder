import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapService } from './services/map.service';
import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// for animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material components
import { MaterialModule } from './modules/material/material.module';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';

// for button bar mediation
import { ButtonMediatorService } from './components/button-bar/button-mediator.service';
import { CityDetailDialog } from './components/city-popup/city-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    ButtonBarComponent,
    CityDetailDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    MapService,
    ButtonMediatorService
  ],
  entryComponents: [
    CityDetailDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
