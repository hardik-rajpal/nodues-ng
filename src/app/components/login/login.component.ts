import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticating: boolean = false;
  
  login(){
    window.location.href = this.dataService.GetLoginURL()
  }
  constructor(private dataService:DataService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams
    // window.alert()
    if(window.location.href.split('?code=').length>1){
      this.authenticating = true;
      const auth_code = window.location.href.split('?code=')[1];
      // window.alert('code:'+auth_code)
      this.dataService.AuthenticateSSO(auth_code).subscribe((v)=>{
        window.alert(JSON.stringify(v))
        // this.dataService.GetFillCurrentUser().subscribe((user)=>{
        //   window.alert(JSON.stringify(user))
        //   this.router.navigate(['home'])

        // })
      })
    }
  }

}
