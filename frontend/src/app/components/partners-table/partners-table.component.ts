import { Component, OnInit } from '@angular/core';
import { Partner } from '../../models/Partner';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../websocket.service';

@Component({
  selector: 'app-partners-table',
  templateUrl: './partners-table.component.html',
  styleUrls: ['./partners-table.component.css']
})
export class PartnersTableComponent implements OnInit {

  partnersTableDataSource = new MatTableDataSource<Partner>();
  displayedColumns: string[] = [
    'name',
    'surname',
    'participation',
  ];

  loadPartners() {
    this.httpClient.get<Partner[]>('http://localhost:3000/partners').toPromise()
    .then( data => {
      this.partnersTableDataSource.data = data;
    })
    .catch( err => {
      console.log(err);
    });
  }

  constructor(private ws: WebsocketService, private httpClient: HttpClient) { }

  ngOnInit() {

    this.loadPartners();


    this.ws.initSocket();
    this.ws
    .onEvent('NewPartner')
    .subscribe((partner: any) => {
      this.loadPartners();
    });

    }

}
