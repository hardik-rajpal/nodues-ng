import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscriber } from 'rxjs';
import { API } from 'src/api';
import { environment } from 'src/environments/environment';
import * as uriTemplates from 'uri-templates';
const SSOHOST = environment.sso_host;
const CLIENT_ID = environment.sso_client_id;
const SSO_REDIR = environment.host;
@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser: any;
  loggedIn!: boolean;
  public LS_USER = 'user_profile';
  constructor(private http:HttpClient) {}
  GetLoginURL() {
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'basic profile picture sex ldap phone insti_address program secondary_emails';

    return `${SSOHOST}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  }
  /**
   * Fill URI Templates according to RFC 6570
   * @param uriTemplate URI Template to fill
   * @param options Options to fill URI with
   */
   FillURITemplate(uriTemplate: string, options: any): string {
    const URITemplate = uriTemplates(uriTemplate);
    return URITemplate.fill(options);
  }
  FireGET<T>(uriTemplate: string, options: any = {}): Observable<T> {
    return this.http.get<T>(this.FillURITemplate('http://localhost:4200/' + uriTemplate, options));
  }
  GetFillCurrentUser():Observable<any>{
    return new Observable(observer=>{
      this.FireGET(API.LoggedInUser).subscribe((result:any)=>{
        this.logInUser(observer,result.profile,false)
      })
    })
  }
  logInUser(observer: Subscriber<any>, profile: any, setLocal: boolean) {
    this.loggedIn = true;
    this.currentUser = profile
    if(setLocal){
      localStorage.setItem(this.LS_USER,JSON.stringify(profile))
    }
    observer.next(this.currentUser)
  }
  AuthenticateSSO(code:string){
    return this.FireGET(API.Login,{code:code,redir:SSO_REDIR});
  }
}
