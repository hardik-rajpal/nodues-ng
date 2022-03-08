import { Component, OnInit } from '@angular/core';

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
  badgeMap:Function =(status:string)=> {
    return {
    'Due':'badge badge-danger',
    'Cleared':'badge badge-success'
  }[status];
  }
  actionsMap:Function = (status:string)=>{
    return {
      'Due':['Inquire','Pay'],
      'Cleared':['Save']
    }[status]
  }
  colorMap:Function = (action:string)=>{
    return {
      'Inquire':'primary',
      'Pay':'accent',
      'Save':'primary'
    }[action]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
