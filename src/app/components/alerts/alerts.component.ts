import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from 'src/app/data.service';
// import { query } from 'src/app/interfaces';
import { Query } from '../expansion/expansion.component';
import {ProductComponent} from 'src/app/dashboard/dashboard-components/product/product.component';
import { mapServerQuery } from '../expansion/expansion.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls:['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  unrespondedQueries:Query[] = []
  respondedQueries:Query[] = []
  pagenums = [1];
  respMode=0
  unrespMode=1
  queryMode=0
  pageNum=1
  @ViewChildren('docLink') docLinks!:ElementRef[]
  productClass=ProductComponent
  constructor(private dataService:DataService) { }
  updateList(){
    console.log(this.pageNum)
    let uid= localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      this.queryMode===this.respMode?(this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))):this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))
      console.log(resp)
    })
  }
  clearBalance(id:number){
    this.dataService.clearBalance(id).subscribe((v:any)=>{
      console.log(v)
    })
  }
  openDoc(query:Query){

  }
  respondToQuery(query:Query,accepted:boolean){
    this.dataService.respondToQuery(query.response,query.id,accepted).subscribe(resp=>{
      console.log(resp)
    })
  }
  ngOnInit(): void {
    let uid = localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      this.queryMode===this.respMode?(this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))):this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))
      this.pagenums=[]
      while((()=>{resp.count-=1;return resp.count})()>=0){
        this.pagenums.push(resp.count+1)
      }
      this.pagenums=this.pagenums.reverse()
      console.log(resp)
      console.log(this.pagenums)
    })
    // this.dataService.fetchAllqueries(localStorage.getItem('RN')!).subscribe((resp:any)=>{
    //   console.log(resp)
    //   if(resp.data){
    //     this.queries = resp.data.map((query:any)=>{
    //       return mapServerQuery(query)
    //     })
    //     this.respondedQueries = this.queries.filter(q=>q.status!==null)
    //     this.unrespondedQueries=this.queries.filter(q=>q.status===null)
    //   }
    // })
  }
}
