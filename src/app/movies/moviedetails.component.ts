import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit, OnDestroy{

  movieId:number=0;
  mov!:Movie | null | undefined;
  sub!:Subscription;
  errorMessage:string='';

  //Injecting activatedroute, router
  constructor(private activatedRoute:ActivatedRoute, private router:Router,private movieService:MovieService){}


  ngOnInit(): void {
    this.sub= this.activatedRoute.paramMap.subscribe((params)=>{
      let idd=params.get('movieId');

      if(idd){
        this.movieId=Number(idd);
      }

      //It will fetch the provide by giving it's id
      this.movieService.getMovieById(this.movieId).subscribe(
        (resp)=>{
          this.mov=resp;
          console.log(this.mov);
        },
        err=>{
          this.errorMessage=err;
          console.log(err);
        }

      )
    })
  }

  //It will navigate to the movies page
  back():void{
    this.router.navigate(['movies']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
