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
  queries:Query[]=[]
  badgeMap:Function = (accepted:number)=>{
    return ["badge badge-danger","badge badge-primary","badge badge-success"][accepted]
  }
  captionMap:Function = (accepted:number)=>{
    return ["Rejected","Processing","Accepted"][accepted]
  }
  panelOpenState = false;
  step = 0;
  ngOnInit() {
    this.dataService.fetchAllqueries(localStorage.getItem('RN')!).subscribe((resp:any)=>{
      if(resp.data){
        this.queries = resp.data.map((query:any)=>{
          return mapServerQuery(query)
        })
      }
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

