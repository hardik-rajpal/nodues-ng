import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService } from "src/app/data.service";
import { PeriodicElement, ProductComponent } from "./product.component";

@Component({
    selector:'dialog-options',
    templateUrl:'./dialog-options.html',
    styleUrls: ['./dialog-options.scss']
  })
  export class DialogOptionsDialog implements OnInit{
    constructor(
      public dialogRef:MatDialogRef<DialogOptionsDialog>,
      @Inject(MAT_DIALOG_DATA) public data:PeriodicElement,
      public dataService:DataService
    ){}
    inquiryProof!:any;
    studentComments:string = "";
    updateData(){
    //   this.dataService.toggleVars(this.binSzValue,this.varSzValue).subscribe((v:any)=>{
    //     console.log(v)
    //   })
    }
    attachFile(file:any){
      this.inquiryProof = file;
    }
    submitInquiry(){
      let docID = ''
      if(this.inquiryProof!==null){
        this.dataService.uploadStudentProof(this.inquiryProof).subscribe((resp:any)=>{
          docID = resp.docID
          this.dataService.sendInquiry(this.studentComments,docID).subscribe(v=>{
            console.log(v)
          })
        })  
      }
      else{
          this.dataService.sendInquiry(this.studentComments,docID).subscribe(v=>{
            console.log(v)
          })
      }
      
    }
    homeClass = ProductComponent;
    binSzMin:number = 5;
    binSzMax:number=  50;
    binSzValue:number = 10;
    varSzMin:number = 5;
    varSzMax:number=  50;
    varSzValue:number = 10;  
    ngOnInit(){
    }
  }