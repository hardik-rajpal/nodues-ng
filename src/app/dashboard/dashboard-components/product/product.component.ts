import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { DialogOptionsDialog } from './dialog-options';
//TODO: TAble on dashboard for admin. 
//TODO: button for verify request.
export interface Requirement {
  id:number;
  rollNumber:string;
  department: string;
  balance:number;
  status:string;
  comments:string;
  timePosted:Date;
}
const getStatus = (balance:number)=>{
  return balance>0?'Due':'Cleared'
}
const ELEMENT_DATA: Requirement[] = [
  // {id: 0,department: 'Hostel', status: getStatus(42),balance: 42, comments:'We know what you did.',timePosted:'0 AD'},
  // {id: 1,department: 'Hostel', status: getStatus(0),balance:0,comments:'None',timePosted:'0 AD'},
  
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
  inquireDialog(element:Requirement){
    
    this.dialog.open(DialogOptionsDialog,{
      data:element
    })
  }
  constructor(public dialog:MatDialog,private dataService:DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('isAdmin')){
      window.location.href = '/admin'
    }
    this.dataService.getAdminRecords().subscribe((v:any)=>{
      console.log(v)
      this.dataSource  = v.data.map((record:any,j:number,[])=>{
        return mapServerRequirement(record)
        //TODO: format timeposted
      })
    })
    // this.inquireDialog(this.dataSource[0])
  }

}
export function mapServerRequirement(record: any) {
  return {
    id:record.id,
    rollNumber:record.roll_number,
    balance:record.balance,
    comments:record.comment,
    department:record.department,
    status:getStatus(record.balance),
    timePosted:new Date(record.time_posted)
  } as Requirement
}

