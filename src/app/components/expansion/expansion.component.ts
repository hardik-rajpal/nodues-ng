import { Component, OnInit } from '@angular/core';
import { mapServerRequirement, Requirement } from 'src/app/dashboard/dashboard-components/product/product.component';
import { DataService } from 'src/app/data.service';
export interface Query{
  id:number;
  requirement:Requirement;
  comment:string;
  status:boolean;
  postTime:string;
  response:string;
  document:string;//None or link to hosted document.
}
@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent implements OnInit{
  constructor(private dataService:DataService){}
  unrespondedQueries:Query[] = []
  respondedQueries:Query[] = []
  queries:Query[]=[]
  pagenums=[1]
  pageNum=1
  respMode:number=1;
  unrespMode:number=0;
  queryMode:number=this.unrespMode;
  badgeMap:Function = (accepted:number)=>{
    return ["badge badge-danger","badge badge-primary","badge badge-success"][accepted]
  }
  captionMap:Function = (accepted:number)=>{
    return ["Rejected","Processing","Accepted"][accepted]
  }
  panelOpenState = false;
  step = 0;
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
    console.log(this.queryMode)
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      if(this.queryMode===this.respMode){
        (this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q)))
      }
      else{
      (this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q)))
      }
      this.updatePageNums(resp.count);
      console.log(resp)
    })
  }
  ngOnInit() {
    let uid = localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      console.log(resp)
      this.queryMode===this.respMode
      ?
      (this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q)))
      :
      this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))
      this.updatePageNums(resp.count)
      console.log(this.queryMode,this.respMode,this.unrespMode)
      console.log(this.respondedQueries,this.unrespondedQueries)
      // console.log(this.pagenums)
    })
  }
  
}
export function mapServerQuery(query: any) {
  return {
    id:query.id,
    comment:query.comment,
    document:query.document_id,
    postTime:query.time_posted,
    status:query.status_check,
    response:query.response,
    requirement:mapServerRequirement(query.requirement)
  } as Query
}

