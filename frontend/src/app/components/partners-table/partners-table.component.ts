import { Component, OnInit, ErrorHandler } from '@angular/core';
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
    'No',
    'name',
    'surname',
    'participation',
  ];

  loadPartners(callback) {
    this.httpClient.get<Partner[]>('http://localhost:3000/partners').toPromise()
    .then( data => {
      callback(data);
    })
    .catch( err => {
      throw ErrorHandler;
    });
  }

  constructor(private ws: WebsocketService, private httpClient: HttpClient) { }

  ngOnInit() {
    try {
      this.loadPartners( (data) => {
        this.partnersTableDataSource.data = data;
      });
    } catch (err) {
      alert(err);
    }


    this.ws.initSocket();
    this.ws
    .onEvent('NewPartner')
    .subscribe((partner: any) => {
      try {
        this.loadPartners( (data) => {
          this.partnersTableDataSource.data = data;
        });
      } catch (err) {
        alert(err);
      }
    });

    }

}
