import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

/*
  get isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }*/

  public loggedIn=false;
  //public role:string|null=localStorage.getItem("roleName");

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    //this.loggedIn=this.loginService.isLoggedIn();
  }

  logoutUser(){
    this.loginService.logout();
    // location.reload();
    
    this.router.navigate(['login']);
    // window.location.href="/login";
    
  }
  isLoggedIn(){
    return this.loginService.isLoggedIn();
  }

  isRoleMatch(roles:[]|any):boolean{
    return this.loginService.roleMatch(roles);
  }



}
