import { AbstractControl, ValidatorFn } from "@angular/forms";
import { DatePipe, formatDate } from '@angular/common';


export function patternValidator(validPattern:RegExp):ValidatorFn{
    return (control:AbstractControl):{[key:string]:any}|null =>{
        const pattern = !validPattern.test(control.value);
        return pattern ?{'validPattern':{value:control.value}}:null;
    }
}