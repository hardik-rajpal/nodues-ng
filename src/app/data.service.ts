import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Observer, Subscriber } from 'rxjs';
import { API } from 'src/api';
import { environment } from 'src/environments/environment';
import * as uriTemplates from 'uri-templates';
import { Requirement } from './dashboard/dashboard-components/product/product.component';
const SSOHOST = environment.sso_host;
const CLIENT_ID = environment.sso_client_id;
const SSO_REDIR = (environment.host+'login');
const apibaseUrl  = 'http://10.105.177.120/';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser: any;
  loggedIn!: boolean;
  public LS_USER = 'user_profile';
  constructor(private http:HttpClient, private cookieService:CookieService) {}
  createAuthorizationHeader(headers: HttpHeaders) {
    console.log(this.cookieService.get('csrftoken'))
    headers.append('X-CSRFToken',this.cookieService.get('csrftoken')); 
  }
  GetLoginURL() {
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'basic profile picture sex ldap phone insti_address program secondary_emails';

    return `${SSOHOST}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  }
  clearBalance(reqid:number){
    return this.http.get(apibaseUrl+API.clearBalance+`?reqID=${reqid}`)
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
    options["withCredentials"] = true;
    console.log(options)
    return this.http.get<T>(this.FillURITemplate('http://localhost:8000/' + uriTemplate, options));
  }
  GetFillCurrentUser():Observable<any>{
    return new Observable(observer=>{
      this.FireGET(API.LoggedInUser).subscribe((result:any)=>{
        this.logInUser(observer,result.profile,false)
      })
    })
  }
  respondToQuery(response:string,queryID:number,accepted:boolean){
    return this.http.put(apibaseUrl+API.submitquery,{
      response:response,
      queryID:queryID,
      userID:localStorage.getItem('RN')!,
      accepted:accepted,
    })
  }
  getAdminRecords(){
    return this.http.get(apibaseUrl+API.SubmitFile+`?userID=${localStorage.getItem('RN')!}`)
  }
  logInUser(observer: Subscriber<any>, profile: any, setLocal: boolean) {
    this.loggedIn = true;
    this.currentUser = profile
    if(setLocal){
      localStorage.setItem(this.LS_USER,JSON.stringify(profile))
    }
    observer.next(this.currentUser)
  }
  fetchAllqueries(userID:string){
    return this.http.get(apibaseUrl+API.submitquery+'?userID='+userID,{withCredentials: false})
  }
  fetchQueries(userID:string,responded:number,pageNum:number){
    return this.http.get(apibaseUrl+API.submitquery+`?userID=${userID}&responded=${responded}&page=${pageNum}`)
  }
  AuthenticateSSO(code:string){
    let redir = SSO_REDIR
    return this.http.get(`http://10.105.177.120/api/accounts/login?code=${code}&redir=${redir}`,);
  }
  sendAdminFiles(file:any){
    let uploadData = new FormData();
    console.log(file.name);
    uploadData.append('file',file,file.name)
    uploadData.append('userID',localStorage.getItem('RN')!)
    //userid should supply department etc.
    //add a field only if necessary
    window.alert(uploadData.get('userID'))
    let header = new HttpHeaders();
    this.createAuthorizationHeader(header);
    return this.http.post(apibaseUrl+API.SubmitFile,uploadData, {headers:header, withCredentials:true})
  }
  uploadStudentProof(file:any){
    let fdata = new FormData()
    fdata.append('file',file)
    console.log('here in upload')
    let header = new HttpHeaders();
    this.createAuthorizationHeader(header);
    return this.http.post(apibaseUrl+API.uploadProof,fdata, {headers:header, withCredentials: true})
  }
  sendquery(req:Requirement,comments:string,docID:string){
    let header = new HttpHeaders();
    this.createAuthorizationHeader(header);
    return this.http.post(apibaseUrl+API.submitquery, {
      reqID:req.id,
      comment:comments,
      docID:docID
    }, {headers: header, withCredentials: true,})

  }
}
