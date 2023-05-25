import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { User } from '../models/user';
import { patternValidator } from '../services/customValidator';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  sign_in:boolean=true;
  sign_up:boolean=false;

  pass_word:boolean=false;

  


  newUser:User=new User();
  u:User|undefined;

  forgetUser:User=new User();
  u2:User|undefined;

  signin():void{
  
    this.sign_in=true;
    this.sign_up=false;
  }

  signup():void{
   
    this.sign_up=true;
    this.sign_in=false;
  }

 

  addUser!: FormGroup;

  updatePass!:FormGroup;

  credentials={
    username:'',
    password:''
  } 
  
  get userName(){
    return this.loginForm.get('userName');
  }
  get password(){
    return this.loginForm.get('password');
  }
 constructor(private loginService:LoginService,
              private router:Router,
              private fb:FormBuilder,
              private notificationService: NotificationService,
              public dialog: MatDialog,
              private zone: NgZone) { }

  wrongPassword:boolean=false;
  emailPattern : RegExp = new RegExp ("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  passwordPattern : RegExp = new RegExp("^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")

  loginForm!: FormGroup;
  ngOnInit(): void {
    //Correst Username: admin@gmail.com
    //Correct Password: Admin@123
    this.loginForm = this.fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),patternValidator(this.passwordPattern)]]
    })

    this.addUser= this.fb.group({
      username2:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password2:['',[Validators.required, Validators.minLength(8), patternValidator(this.passwordPattern)]],
      email:['',[Validators.required,patternValidator(this.emailPattern)]],
      petname:['',[Validators.required]]
    });


    this.updatePass=this.fb.group({
      username3:['',[Validators.required]],
      petname2:['',[Validators.required]],
      password3:['',[Validators.required, Validators.minLength(8), patternValidator(this.passwordPattern)]]
      
    });


    
  }

  get username3(){
    return this.updatePass.get("username3");
  }

  get petname2(){
    return this.updatePass.get("petname2");
  }

  get password3(){
    return this.updatePass.get("password3");
  }

  
  forgetPet!:String;
  forget():void{
    this.loginService.forgotPassword(this.loginForm.value.username).subscribe(
      data=>{
        this.forgetPet=data;
        console.log(this.forgetPet);
      },error=>console.log(error)
    )
  }

  updatePassword():void{
    this.forgetUser.username=this.updatePass.value.username3;
    this.forgetUser.petname=this.updatePass.value.petname2;
    this.forgetUser.password=this.updatePass.value.password3;

    this.loginService.updatePassword(this.forgetUser).subscribe(
      data=>{
        this.u2=data;
        console.log(this.u2);
      },error=>console.log(error)
    )

  }


  get username2(){
    return this.addUser.get("username2");
  }

  get password2(){
    return this.addUser.get("password2");
  }

  get email(){
    return this.addUser.get("email");
  }

  get petname(){
    return this.addUser.get("petname");
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.addUser.controls[controlName].hasError(errorName);
    }

    public myError2 = (controlName: string, errorName: string) =>{
      return this.updatePass.controls[controlName].hasError(errorName);
      }


  addNewUser():void{


    this.newUser.username=this.addUser.value.username2;
    this.newUser.password=this.addUser.value.password2;
    this.newUser.email=this.addUser.value.email;
    this.newUser.petname=this.addUser.value.petname;

    this.loginService.addUser(this.newUser).subscribe(
      data=>{
        this.u=data;
        console.log(data);
      },error=>console.log(error)      
    )

    this.notificationService.success(':: User Added Successfully');
    this.sign_up=false;
    this.sign_in=true;
  }

  isCorrectPassword(){
    return this.wrongPassword;
  }
  removeError(): void{
    this.wrongPassword=false;
    console.log("remove Error called");
    
  }

  errorMsg='';

  onSubmit(){
    // console.log("Form is submitted");
    this.credentials.username = this.loginForm.value.userName!;
    this.credentials.password = this.loginForm.value.password!;
    console.log(this.credentials);
    // this.credentials=this.loginForm.value;
    if((this.credentials.username!=''&&this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)){
      console.log("We have to submit the form!");
      //token generate
      this.loginService.generateToken(this.credentials)!.subscribe(
        (response:any)=>{
          //success
          console.log("Response is: "+response);
          console.log(response.jwtToken);
          console.log(response.user.role);
          this.loginService.loginUser(response.jwtToken,response.user.role);
          const role = response.user.role[0].roleName;
          console.log(role);
              if(role=='ADMIN'){
                 this.router.navigate(["/movieticket"]);
              }
              else if(role=='USER'){
                this.router.navigate(['/movies'])
              }
              else{
                this.router.navigate(['/login']);
              }
         
          
         },
        error=>{
          //error
          // alert("Password or Username is Wrong");
          this.wrongPassword=true;
          this.errorMsg=error.error.message;
          this.loginForm.get('password')?.reset();
          this.isCorrectPassword();
          console.log("Value of wrong password : "+this.wrongPassword)
          console.log("Error status code is: "+error.status);
          console.log(error);
          this.credentials.password='';
          
        }
        
      )
    }
    else{
      console.log("Fields are empty");
      
    }
  }


  openDialog() {

    this.zone.run(() =>{
    this.dialog.open(ForgetpasswordComponent, {
      width:'400px'
        
    });
  });
}
}
