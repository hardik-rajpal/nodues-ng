import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter, HostListener, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('files') filesBox!:ElementRef
  @Output('fileRec') fileRec:EventEmitter<any> = new EventEmitter();
  @Output('submitFile') submitFile:EventEmitter<any> = new EventEmitter();
  @Input('showSubmitBtn') showSubmitBtn:boolean = true;
  files:any[] = []
  finalData!:any;
  dragAreaClass!:string;
  error!:string;
  fileNames:string[] = []
  progress:number = 0;
  submitted:boolean = false;
  onFileChange(event:any){
    let files:FileList = event.target.files;
    this.saveFiles(files);
  }
  shorten(name:string){
    return (name.length<10)?name:name.slice(0,10)+'...'
  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files:FileList){
    if(files.length>1) {this.error = "Only one file at a time allowed."}
    else{
      this.error = ""
      this.files = [files[0]];
      this.fileNames = [files[0].name]
      this.fileRec.emit(files[0])
    }
  }
  
  
  
  
  
  propagateClick(){
    this.filesBox.nativeElement.click()
  }
  updateFile(ev:any){
    for(let file of ev.target.files){
      if(!this.files.includes(file)){
        this.files.push(file)
        this.fileNames.push(file.name);
      }
    }
    this.fileRec.emit(this.files[0])

  }
  submit(){
    this.submitFile.emit(this.files[0])
    this.fileRec.emit(this.files[0])
    console.log(this.files[0])
    this.submitted = true
  }
  constructor(private server:DataService) { }

  ngOnInit(): void {
    this.dragAreaClass = 'dragarea';
  }

}
