import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { patternValidator } from '../services/customValidator';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit{

  forgetUser:User=new User();
  u2:User|undefined;

  constructor(private loginService: LoginService, private formBuilder:FormBuilder, private notificationService: NotificationService){}

  updatePass!:FormGroup;

  passwordPattern : RegExp = new RegExp("^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")

  ngOnInit(): void {

    this.updatePass=this.formBuilder.group({
      username:['',[Validators.required]],
      petname:['',[Validators.required]],
      password:['',[Validators.required, Validators.minLength(8), patternValidator(this.passwordPattern)]]
      
    });
  }

  get username(){
    return this.updatePass.get("username");
  }

  get petname(){
    return this.updatePass.get("petname");
  }

  get password(){
    return this.updatePass.get("password");
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.updatePass.controls[controlName].hasError(errorName);
    }

    updatePassword():void{
      this.forgetUser.username=this.updatePass.value.username;
      this.forgetUser.petname=this.updatePass.value.petname;
      this.forgetUser.password=this.updatePass.value.password;
  
      this.loginService.updatePassword(this.forgetUser).subscribe(
        data=>{
          this.u2=data;
          console.log(this.u2);
        },error=>console.log(error)
      )

      this.notificationService.success(':: Password Updated Successfully');
  
    }
}
