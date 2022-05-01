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
  respMode=1
  unrespMode=0
  queryMode=this.unrespMode;
  pageNum=1
  @ViewChildren('docLink') docLinks!:ElementRef[]
  productClass=ProductComponent
  constructor(private dataService:DataService) { }
  updatePageNums(count:number){
    this.pagenums=[];
    if(this.pageNum>count){this.pageNum = 1;}

    while((()=>{count-=1;return count})()>=0){
          this.pagenums.push(count+1)
        }
        this.pagenums=this.pagenums.reverse()
  }
  updateList(){
    console.log(this.pageNum)
    let uid= localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      if(this.queryMode===this.respMode){
        this.respondedQueries= resp.data.map((q:any)=>mapServerQuery(q))
      }
      else{
        (this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q)))
      }      
      this.updatePageNums(resp.count);
      console.log(resp)
    })
  }
  clearBalance(query:Query){
    this.dataService.clearBalance(query.requirement.id).subscribe((v:any)=>{
      this.dataService.respondToQuery('Balance Cleared. 🙂',query.id,true).subscribe((resp:any)=>{      
        window.location.reload();
      })
    })

  }
  openDoc(query:Query){
    window.open('http://10.105.177.120/api/records/get_file/'+query.document);
  }
  respondToQuery(query:Query,accepted:boolean){
    if(query.response.length===0){window.alert("Please type in a response for the student.");return;}
    this.dataService.respondToQuery(query.response,query.id,accepted).subscribe(resp=>{
      console.log(resp)
      window.location.reload();
    })
  }
  ngOnInit(): void {
    let uid = localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      this.queryMode===this.respMode?(this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))):this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))
      this.updatePageNums(resp.count)
      console.log(resp)
      console.log(this.pagenums)
    })
  }
}
