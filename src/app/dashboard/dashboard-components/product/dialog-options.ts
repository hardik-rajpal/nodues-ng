import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService } from "src/app/data.service";
import { Requirement, ProductComponent } from "./product.component";

@Component({
    selector:'dialog-options',
    templateUrl:'./dialog-options.html',
    styleUrls: ['./dialog-options.scss']
  })
  export class DialogOptionsDialog implements OnInit{
    constructor(
      public dialogRef:MatDialogRef<DialogOptionsDialog>,
      @Inject(MAT_DIALOG_DATA) public data:Requirement,
      public dataService:DataService
    ){}
    queryProof!:any;
    studentComments:string = "";
    updateData(){
    //   this.dataService.toggleVars(this.binSzValue,this.varSzValue).subscribe((v:any)=>{
    //     console.log(v)
    //   })
    }
    attachFile(file:any){
      console.log(file)
      this.queryProof = file;
    }
    submitquery(){
      let docID = ''
      console.log(this.queryProof)
      if(this.queryProof!==undefined){
        this.dataService.uploadStudentProof(this.queryProof).subscribe((resp:any)=>{
          docID = resp.docID
          this.dataService.sendquery(this.data,this.studentComments,docID).subscribe(v=>{
            window.alert('Query Posted!');
            this.dialogRef.close();
          })
        })  
      }
      else{
          this.dataService.sendquery(this.data,this.studentComments,docID).subscribe(v=>{
            window.alert('Query Posted!')
            console.log(v)
            this.dialogRef.close()
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