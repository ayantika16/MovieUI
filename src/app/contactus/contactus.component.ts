import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit{

  addContact!:FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    
    //Creating the add contact form group by giving proper validations
    this.addContact=this.formBuilder.group({
      firstname:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      lastname:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      comment:['',[Validators.required]]
    });
  }

  //The function will be called when we want to show any error message upon filling wrong inputs in the form
  public myError = (controlName: string, errorName: string) =>{
    return this.addContact.controls[controlName].hasError(errorName);
    }

    //This function will be called upon submitting
  contactSubmit(){
    alert("Thanks for sharing. Submitted Successfully..");
  }

}
