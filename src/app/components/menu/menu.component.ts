import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  @ViewChild('filebox') filebox!:ElementRef;
  propagateClick(){
    this.filebox.nativeElement.click()
    //TODO: Pop up confirmation

  }
  
  constructor(private dataService:DataService) { }
  department:string = 'Hostel';
  //to be fetched from dataservice
  ngOnInit(): void {
  }

}
