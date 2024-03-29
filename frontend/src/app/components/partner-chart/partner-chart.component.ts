import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WebsocketService } from '../../websocket.service';
import { ApiService } from '../../api.service';


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

  constructor(private api: ApiService, private ws: WebsocketService) { }

  ngOnInit() {
    try {
      this.api.getPartners( (data) => {
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
        this.api.getPartners( (data) => {
          this.updateChart(data);
        });
      } catch (err) {
        alert(err);
      }
    });
  }

}
