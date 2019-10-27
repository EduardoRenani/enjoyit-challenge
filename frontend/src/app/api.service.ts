import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partner } from './models/Partner';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getPartners(callback) {
    this.httpClient.get<Partner[]>(environment.backendUrl + '/partners').toPromise()
    .then( data => {
      callback(data);
    })
    .catch( err => {
      throw err;
    });
  }

  public postPartners(body, callback) {
    this.httpClient.post(environment.backendUrl + '/partners', body).toPromise()
    .then( data => {
      callback(data);
    })
    .catch( err => {
      throw err;
    });
  }
}

