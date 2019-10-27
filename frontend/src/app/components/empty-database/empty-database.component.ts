import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empty-database',
  templateUrl: './empty-database.component.html',
  styleUrls: ['./empty-database.component.css']
})
export class EmptyDatabaseComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  async emptyDatabase() {

    this.httpClient.delete('http://localhost:3000/partners').toPromise()
    .catch( err => {
      console.log(err);
    });
  }

}
