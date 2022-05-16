import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import {saveAs} from 'file-saver';
import { objectMap } from 'src/app/utils';
import { mapServerRequirement, Requirement,dateToReadable } from 'src/app/dashboard/dashboard-components/product/product.component';
import { Event } from '@angular/router';
const recordHeader = 'StudentID,Balance,Comments,Last Updated'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls:['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  file!:any
  dataSource:Requirement[]=[]
  queriedDataSource:Requirement[]=[]
  displayedColumns:string[]=[
    'index',
    'rollNumber',
    'balance',
    'comments',
    'timePosted',
    'actions'
  ]
  dateToReadable:Function  = dateToReadable;
  clearBalance(id:number){
    this.dataService.clearBalance(id).subscribe((v:any)=>{
      console.log(v)
      window.location.reload()
    })
  }
   @ViewChild('filebox') filebox!:ElementRef;
  propagateClick(){
    this.filebox.nativeElement.click()
    //TODO: Pop up confirmation

  }
  updateTableData(ev:any){
    let qstr = ev.target.value;
    qstr =qstr.toLowerCase();
    this.queriedDataSource = this.dataSource.filter((req:Requirement,i:number,[])=>{
      return (
        req.rollNumber.toLowerCase().includes(qstr)
        ||
        req.comments.toLowerCase().includes(qstr)
        ||
        req.department.toLowerCase().includes(qstr))
    })
    return;
  }
  updateFile(file:any){
    this.file = file;
  }
  submitFile(file:any){
    this.dataService.sendAdminFiles(file).subscribe((v:any)=>{
      if(v.status==200){
        window.alert('Records Updated! 🧾')
        window.location.reload()
      }
      else{
        window.alert('Failed to update records. 😶')
        window.location.reload()
      }
    })
  }
  downloadRecords(){
    this.dataService.getAdminRecords().subscribe((data:any)=>{
      if(data.data.length>0){
        let string = [recordHeader,
          ...data.data.map((record:any,j:number,[])=>{
          return [record.roll_number,record.balance,record.comment,this.dateToReadable(record.time_posted)]
        })].join('\n')
        saveAs(new Blob([string],{
          type:'text/plain'
        }),
        'Records.csv'
        )
      }
    })
  }
  constructor(private dataService:DataService) { }
  department:string = 'Hostel';
  //to be fetched from dataservice
  ngOnInit(): void {
    if(!localStorage.getItem('isAdmin')){
      window.location.href = '/home'
    }
    this.dataService.getAdminRecords().subscribe((data:any)=>{
      console.log(data)
      if(data.data.length>0){
        this.dataSource=data.data.map((req:Requirement)=>mapServerRequirement(req))
        this.queriedDataSource = this.dataSource;
      }
      console.log(this.dataSource)
    })
  }

}
