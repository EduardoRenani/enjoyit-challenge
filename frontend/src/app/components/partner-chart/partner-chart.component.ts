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
    const labelNames = data.map((partner) => {
      return partner.name + ' ' + partner.surname;
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

    const canvas = document.getElementById('partnerChart') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [{
            data: participations,
            backgroundColor: flattenedColorArray,
            borderColor: 'rgb(255, 255, 255)',
        }],
        labels: labelNames,
      },
      options: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 20,
          },
        }
      }
    });
  }

  updateChart(data) {
    const participations = data.map((partner) => {
      return partner.participation;
    });
    const labelNames = data.map((partner) => {
      return partner.name + ' ' + partner.surname;
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

    this.chart.data.datasets[0].data = participations;
    this.chart.data.datasets[0].backgroundColor = flattenedColorArray;
    this.chart.data.labels = labelNames;
    this.chart.update();
  }

  loadChartData(callback) {
    this.httpClient.get<Partner[]>('http://localhost:3000/partners').toPromise()
    .then( data => {
      callback(data);
    })
    .catch( err => {
      throw err;
    });
  }

  constructor(private httpClient: HttpClient, private ws: WebsocketService) { }

  ngOnInit() {
    try {
      this.loadChartData( (data) => {
        this.drawChart(data);
      });
    } catch (err) {
      alert(err);
    }


    this.ws.initSocket();
    this.ws
    .onEvent('UpdateDB')
    .subscribe((partner: any) => {
      try {
        this.loadChartData( (data) => {
          this.updateChart(data);
        });
      } catch (err) {
        alert(err);
      }
    });
  }

}
