import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionsDialog } from './dialog-options';

export interface PeriodicElement {
  department: string;
  balance:number;
  status: string;
  comments:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {department: 'Hostel', status: 'Due',balance: 42, comments:'We know what you did.'},
  {department: 'Hostel', status: 'Cleared',balance:0,comments:'None'},
  
];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['department', 'status', 'comments','actions'];
  dataSource = ELEMENT_DATA;
  static badgeMap(status:string){
    return {
    'Due':'badge badge-danger',
    'Cleared':'badge badge-success'
  }[status];
  }
  myclass=ProductComponent;
  inquireDialog(element:PeriodicElement){
    
    this.dialog.open(DialogOptionsDialog,{
      data:element
    })
  }
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('isAdmin')){
      window.location.href = '/admin'
    }
    // this.inquireDialog(this.dataSource[0])
  }

}
