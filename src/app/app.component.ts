import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flexy-angular';
  adminUser:boolean = true;
  authenticating:boolean = false;
  constructor(
    private dataService:DataService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){}
  ngOnInit(){
    // window.alert('Here')
    
  }
}
