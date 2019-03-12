import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjFlexGridFilter } from 'wijmo/wijmo.angular2.grid.filter';
import { __metadata } from 'tslib';
import * as wjCore from 'wijmo/wijmo';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  users$:Observable<User[]>;
  grid: WjFlexGrid;
  filter: WjFlexGridFilter;
  showInactive: boolean = false;
  userCollection: wjCore.CollectionView;
  alreadyActiveAlert: boolean = false;
  alreadyInactiveAlert: boolean = false;

  constructor(private data:DataService) {
  }

  ngOnInit() {
    this.users$ = this.data.getUsers();
  }
  // Set the variables after the FlexGrid initializes
  initW3C(grid: WjFlexGrid, filter: WjFlexGridFilter){
    this.grid = grid;
    this.filter = filter;
    this.userCollection = new wjCore.CollectionView(this.grid.itemsSource);
  }
  // Hide/Show inactive users
  toggleInactive() {
    // Change status
    this.showInactive = !this.showInactive;
    if (this.showInactive == true) {
      // Show inactive users
      this.grid.itemsSource = this.userCollection.items;
    }
    else {
      // Filter and hide inactive users
      this.grid.itemsSource = this.filterInactive();
    }
  }
  // Filter inactive users, returns filtered users
  filterInactive() {
    let cv = new wjCore.CollectionView(this.grid.itemsSource);
    cv.filter = function(item) {
      if (this.filter) {
        return item.active == true;
      }
      return true;
    }
    cv.refresh();
    return cv.items;
  }
  // Set user to active
  setActive() {
    if (this.grid != null) {
      // Get an array of grid rows
      let rows = this.grid.rows;
      // Loop through each row in the grid
      for (let i = 0; i < rows.length; i++) {
        // Check if the row is selected
        if (rows[i].isSelected) {
          // Check if the user is already active
          if (rows[i]._data.active == true) {
            this.alreadyActiveAlert = true;
            setTimeout(function() {
              this.alreadyActiveAlert = false;
            }.bind(this), 2500);
            //console.log('Already active');
          }
          else {
            // Set the user to active
            this.grid.setCellData(i, 'active', true);
          }
        }
      }
    }
  }
  // Set user to inactive
  setInactive() {
    if (this.grid != null) {
      // Get an array of grid rows
      let rows = this.grid.rows;
      // Loop through each row in the grid
      for (let i = 0; i < rows.length; i++) {
        // Check if the row is selected
        if (rows[i].isSelected) {
          // Check if the user is already inactive
          if (rows[i]._data.active == false) {
            this.alreadyInactiveAlert = true;
            setTimeout(function() {
              this.alreadyInactiveAlert = false;
            }.bind(this), 2500);
            //console.log('Already inactive');
          }
          else {
            // Set the user to active
            this.grid.setCellData(i, 'active', false);
          }
        }
      }
      // Check if we are displaying inactive users
      if(this.showInactive == false) {
        // Filter the users to only show active
        this.grid.itemsSource = this.filterInactive();
      }
    }
  }
}
