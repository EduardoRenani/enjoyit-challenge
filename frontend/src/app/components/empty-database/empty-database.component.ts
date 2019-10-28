import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-empty-database',
  templateUrl: './empty-database.component.html',
  styleUrls: ['./empty-database.component.css']
})
export class EmptyDatabaseComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  async emptyDatabase() {
    try {
      this.api.deleteAllPartners( (data) => {
      });
    } catch (err) {
      alert(err);
    }
  }

}
