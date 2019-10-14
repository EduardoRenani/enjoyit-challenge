import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Partner } from '../../models/Partner';
import { HttpClient } from '@angular/common/http';
import { DateAdapter } from '@angular/material';
import { partition } from 'rxjs';
import { FasDirective } from 'angular-bootstrap-md';
import { WebsocketService } from '../../websocket.service';


@Component({
  selector: 'app-partner-chart',
  templateUrl: './partner-chart.component.html',
  styleUrls: ['./partner-chart.component.css']
})
export class PartnerChartComponent implements OnInit {



  chart: any = [];

  drawChart(data) {
    const participations = data.map((partner) => {
      return partner.participation;
    });
    const names = data.map((partner) => {
      return partner.name;
    });
    const colorSet = [
      'rgb(0,63,92)',
      'rgb(88,80,141)',
      'rgb(188,80,144)',
      'rgb(255,99,97)',
      'rgb(255,166,0)'
    ];
    const bgColors = Array(participations.length).fill(colorSet);
    const flattenedColorArray = [].concat(...bgColors);

    this.chart = new Chart('partnerChart', {
      type: 'doughnut',
      data: {
        datasets: [{
            data: participations,
            backgroundColor: flattenedColorArray,
            borderColor: 'rgb(255, 255, 255)',
        }],
        labels: names,
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  loadChartData() {
    this.httpClient.get<Partner[]>('http://localhost:3000/partners').toPromise()
    .then( data => {
      this.drawChart(data);
    })
    .catch( err => {
      console.log(err);
    });
  }

  constructor(private httpClient: HttpClient, private ws: WebsocketService) { }

  ngOnInit() {
    this.loadChartData();

    this.ws.initSocket();
    this.ws
    .onEvent('NewPartner')
    .subscribe((partner: any) => {
      this.loadChartData();
    });
  }

}
