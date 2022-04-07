import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import {saveAs} from 'file-saver';
import { objectMap } from 'src/app/utils';
import { mapServerRequirement, Requirement } from 'src/app/dashboard/dashboard-components/product/product.component';
const recordHeader = 'StudentID,Balance,Comments,Last Updated'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls:['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  file!:any
  dataSource:Requirement[]=[]
  displayedColumns:string[]=[
    'index',
    'rollNumber',
    'balance',
    'comments',
    'timePosted'
  ]
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

  updateFile(file:any){
    this.file = file;
  }
  submitFile(file:any){
    this.dataService.sendAdminFiles(file).subscribe((v:any)=>{
      if(v.status==200){
        window.alert('Records Updated! 🧾')
      }
      else{
        window.alert('Failed to update records. 😶')
      }
    })
  }
  downloadRecords(){
    this.dataService.getAdminRecords().subscribe((data:any)=>{
      if(data.data.length>0){
        let string = [recordHeader,
          ...data.data.map((record:any,j:number,[])=>{
          return [record.roll_number,record.balance,record.comment,record.time_posted]
        })].join('\n')
        saveAs(new Blob([string],{
          type:'text/plain'
        }),
        'Records'
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
      }
      console.log(this.dataSource)
    })
  }

}
