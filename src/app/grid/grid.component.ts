import { Component, OnInit } from '@angular/core';
import { CollectionView } from 'wijmo/wijmo';
import { DataService } from '../services/data.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  users$:Observable<User[]>;
  //users:User[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    // this.dataService.getUsers().subscribe(users => {
    //   this.users = users;
    //   //console.log(this.users);
    // });
    this.users$ = this.dataService.getUsers();
  }
  
}
