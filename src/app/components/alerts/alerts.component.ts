import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Inquiry } from 'src/app/interfaces';
import {ProductComponent} from 'src/app/dashboard/dashboard-components/product/product.component';
interface alerts {
  border: string;
  background: string;
  color: string;
  icon: string;
  iconColor: string;
  message: string;
}

interface desc {
  background: string,
  color: string,
  icon: string,
  iconColor: string,
  heading: string,
  title: string,
  subheading: string,
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls:['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  inquiries:Inquiry[] = []
  @ViewChildren('docLink') docLinks!:ElementRef[]
  productClass=ProductComponent
  constructor(private dataService:DataService) { }
  openDoc(inquiry:Inquiry){
    this.docLinks[this.inquiries.indexOf(inquiry)].nativeElement.click()
  }
  ngOnInit(): void {
    // this.dataService.fetchAllInquiries(localStorage.getItem('RN')!).subscribe(v=>{

    // })
    this.inquiries = [
      {
        departmentID:'Distribution',
        comment:'The star sticker was barely visible',
        status:0,
        studentID:'Gustavo',
        document:'https://i.imgur.com/4VPpbQ3b.jpg',
      },
      {
        departmentID:'Distribution',
        comment:'The star sticker was well hidden',
        status:0,
        studentID:'Fring',
        document:'https://i.imgur.com/JYuFysLb.jpg'
      }
    ]
  }
}
