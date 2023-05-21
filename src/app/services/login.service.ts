import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // url="http://localhost:8083";
  url = "http://localhost:8084";
  // requetHeader= new HttpHeaders({'No-Auth:'True'});

  constructor(private http: HttpClient) { }

  //calling the server to generate token
  generateToken(credentials: any) {
    //token generation 

      return this.http.post(`${this.url}/auth/v1/login`, credentials, {
        headers: new HttpHeaders({ 'No-Auth': 'True' })
      });
   
  }

  //for login user
  loginUser(token: any,roles:[]) {
    localStorage.setItem("token", token);
    this.setRoles(roles);
    return true;
  }

  //To check if user is logged in or not
  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === '' || token == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //for logging out the user
  logout() {
    this.clear();

    return true;
  }

  //for getting the token
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  //for getting bearer token
  getBearerToken() {
    return localStorage.getItem("bearerToken");
  }

  //for role based authentication

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') || '{}')
  }

  public clear(){
    localStorage.clear();
  }
  
  //role matchich for dynamic navbar

  public roleMatch(allowedRoles : any):boolean{
    let isMatch= false;
    const userRoles:any = this.getRoles();
    if(userRoles != null && userRoles){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++){
          if(userRoles[i].roleName===allowedRoles[j]){
            isMatch=true;
            return isMatch;
          }
          else{
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }

}