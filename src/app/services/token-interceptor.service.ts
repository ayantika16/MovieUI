import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, raceWith, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    if(req.headers.get('No-Auth')==='True'){
      return next.handle(req.clone());
    }
    let headerToken= localStorage.getItem("token");
    // let headerToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3MzExNzA4MiwiaWF0IjoxNjczMDk5MDgyfQ.zyNBYQHLEiPnKQ7fZW1n8zbflXVng2cZS9ML9T8G9R3hCeTGEpeD2Ze3JFG4J72ACp4tbSKe8LLFnmI_vwfsQQ"
    console.log("Token in interceptor-  "+headerToken);
     req= req.clone({
      setHeaders:{
        Authorization: "Bearer "+headerToken
      }
    })
    return next.handle(req).pipe(
      catchError(
        (err:HttpErrorResponse)=> {
          console.log("Error Status is : "+err.status);
          if(err.status===401){
              alert("Password Wrong");
              console.log("Password Wrong");
              
          }else if(err.status===403){
            alert("403 wrong");
          }
          return throwError("Something is wrong");
        }
      )
    );
  }
}
