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
  loggedIn:boolean=true;
  authenticating:boolean = false;
  login(){
    window.location.href = this.dataService.GetLoginURL()
  }
  constructor(
    private dataService:DataService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){}
  ngOnInit(){
    const params = this.activatedRoute.snapshot.queryParams
    if(params.hasOwnProperty('code')){
      this.authenticating = true;
      const auth_code = params['code'];
      this.dataService.AuthenticateSSO(auth_code).subscribe(()=>{
        this.dataService.GetFillCurrentUser().subscribe((user)=>{
          window.alert(JSON.stringify(user))
          this.router.navigate(['home'])

        })
      })
    }
  }
}
