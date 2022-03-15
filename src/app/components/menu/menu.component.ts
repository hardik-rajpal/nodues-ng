import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls:['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  file!:any
  @ViewChild('filebox') filebox!:ElementRef;
  propagateClick(){
    this.filebox.nativeElement.click()
    //TODO: Pop up confirmation

  }
  updateFile(file:any){
    this.file = file;
  }
  submitFile(file:any){
    this.dataService.sendAdminFiles(this.file).subscribe((v:any)=>{
      console.log(v)
    })
  }
  constructor(private dataService:DataService) { }
  department:string = 'Hostel';
  //to be fetched from dataservice
  ngOnInit(): void {
    if(!localStorage.getItem('isAdmin')){
      window.location.href = '/home'
    }
  }

}
