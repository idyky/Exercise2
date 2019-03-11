import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { EventArgs } from 'wijmo/wijmo';
import { CellRangeEventArgs, CellRange, HitTestInfo } from 'wijmo/wijmo.grid';
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
  displayInactive: boolean = true;
  userCollection: wjCore.CollectionView;

  constructor(private data:DataService) {
  }

  ngOnInit() {
    this.users$ = this.data.getUsers();
  }

  initW3C(grid: WjFlexGrid, filter: WjFlexGridFilter){
    this.grid = grid;
    this.filter = filter;

    this.userCollection = new wjCore.CollectionView(this.grid.itemsSource);
  }

  resizedColumn(grid, e) {
    console.log('resizedColumn');
    grid.autoSizeRows();
    grid.select(new CellRange(1, 1), true);
  }

  changedFilter(e: WjFlexGridFilter) {
    console.log(e);
  } 

  toggleInactive() {
    this.displayInactive = !this.displayInactive;
    console.log(this.displayInactive);
    if (this.displayInactive == true) {
      this.grid.itemsSource = this.userCollection.items;
    }
    else {
      this.grid.itemsSource = this.filterInactive();
    }
  }

  filterInactive() {
    let cv = new wjCore.CollectionView(this.grid.itemsSource);
      cv.filter = function(item) {
        if (this.filter) {
          return item.active == true;
        }
        return true;
      }
      //console.log(d.items);
      //console.log(this.grid.itemsSource);
      cv.refresh();
      return cv.items;
  }

  setActive() {
    if (this.grid != null) {
      var rows = this.grid.rows;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].isSelected) {
          if (rows[i]._data.active == true) {
            console.log('Already active');
          }
          else {
            this.grid.setCellData(i, 'active', true);
          }
        }
      }
    }
  }

  setInactive() {
    if (this.grid != null) {
      var rows = this.grid.rows;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].isSelected) {
          if (rows[i]._data.active == false) {
            console.log('Already inactive');
          }
          else {
            this.grid.setCellData(i, 'active', false);
            if(this.displayInactive == false) {
              this.grid.itemsSource = this.filterInactive();
            }
          }
        }
      }
    }
  }
}
