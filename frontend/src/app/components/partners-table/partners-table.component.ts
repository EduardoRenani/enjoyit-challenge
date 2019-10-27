import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Partner } from '../../models/Partner';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../websocket.service';
import { ApiService } from '../../api.service';

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

  constructor(private ws: WebsocketService, private api: ApiService) { }

  ngOnInit() {

    try {
      this.api.getPartners( (data) => {
        this.partnersTableDataSource.data = data;
      });
    } catch (err) {
      alert(err);
    }

    this.ws.initSocket();
    this.ws
    .onEvent('UpdateDB')
    .subscribe((partner: any) => {
      try {
        this.api.getPartners( (data) => {
          this.partnersTableDataSource.data = data;
        });
      } catch (err) {
        alert(err);
      }
    });

    }

}
