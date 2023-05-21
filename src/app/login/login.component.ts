import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { patternValidator } from '../services/customValidator';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

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
              private fb:FormBuilder) { }

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
                 this.router.navigate(["/movies"]);
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

}
