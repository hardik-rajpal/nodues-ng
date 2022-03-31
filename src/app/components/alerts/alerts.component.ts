import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from 'src/app/data.service';
// import { query } from 'src/app/interfaces';
import { Query } from '../expansion/expansion.component';
import {ProductComponent} from 'src/app/dashboard/dashboard-components/product/product.component';
import { mapServerQuery } from '../expansion/expansion.component';
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
  queries:Query[] = []
  unrespondedQueries:Query[] = []
  respondedQueries:Query[] = []
  @ViewChildren('docLink') docLinks!:ElementRef[]
  productClass=ProductComponent
  constructor(private dataService:DataService) { }
  openDoc(query:Query){
    this.docLinks[this.queries.indexOf(query)].nativeElement.click()
  }
  respondToQuery(query:Query,accepted:boolean){
    this.dataService.respondToQuery(query.response,query.id,accepted).subscribe(resp=>{
      console.log(resp)
    })
  }
  ngOnInit(): void {
    this.dataService.fetchAllqueries(localStorage.getItem('RN')!).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.data){
        this.queries = resp.data.map((query:any)=>{
          return mapServerQuery(query)
        })
        this.respondedQueries = this.queries.filter(q=>q.status!==null)
        this.unrespondedQueries=this.queries.filter(q=>q.status===null)
      }
    })
  }
}
