import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartnersTableComponent } from './components/partners-table/partners-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import { PartnerFormComponent } from './components/partner-form/partner-form.component';
import { MatButtonModule, MatFormField, MatFormFieldModule, MatInput, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';


import { WebsocketService } from './websocket.service';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { PartnerChartComponent } from './components/partner-chart/partner-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PartnersTableComponent,
    PartnerFormComponent,
    PartnerChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    WavesModule,
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
