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
  queryMode=0;
  respMode=1;
  unrespMode=0;
  badgeMap:Function = (accepted:number)=>{
    return ["badge badge-danger","badge badge-primary","badge badge-success"][accepted]
  }
  captionMap:Function = (accepted:number)=>{
    return ["Rejected","Processing","Accepted"][accepted]
  }
  panelOpenState = false;
  step = 0;
  updateList(){
    console.log(this.pageNum)
    let uid= localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      this.queryMode===this.respMode?(this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))):this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))
      console.log(this.respondedQueries)
    })
  }
  ngOnInit() {
    let uid = localStorage.getItem('RN')!
    this.dataService.fetchQueries(uid,this.queryMode,this.pageNum).subscribe((resp:any)=>{
      this.queryMode===this.respMode?(this.respondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))):this.unrespondedQueries  = resp.data.map((q:any)=>mapServerQuery(q))
      this.pagenums=[]
      while((()=>{resp.count-=1;return resp.count})()>=0){
        this.pagenums.push(resp.count+1)
      }
      this.pagenums=this.pagenums.reverse()
      // console.log(resp)
      // console.log(this.pagenums)
    })
  }
  
}
export function mapServerQuery(query: any) {
  return {
    id:query.id,
    comment:query.comment,
    document:query.document,
    postTime:query.time_posted,
    status:query.status_check,
    response:query.response,
    requirement:mapServerRequirement(query.requirement)
  } as Query
}

