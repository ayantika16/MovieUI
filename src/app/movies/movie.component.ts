import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  pageTitle="Movies List";

  movies:Movie[] | undefined;
  constructor(private movieService:MovieService) { }

  filteredMovies:Movie[]|undefined;

  fname!:string;

  ngOnInit(): void {
   this.getMovies();
 
  // this.filteredMovies=this.movies;
  }

 
  private getMovies(){
    this.movieService.getMoviesList().subscribe(data=>{
      this.filteredMovies=data;
      this.movies=data;
      console.log(this.filteredMovies);
      
    },err=>{
      console.log(err);
    });
  }

  filterMov():void{
   
    
      //console.log(this.fname);

    if(this.fname!=''){
    this.filteredMovies=this.movies?.filter((m)=>{
      //console.log(m.movieName);
      return m.movieName?.toLowerCase()?.startsWith(this.fname.toLowerCase())
    });
  }else{
    this.filteredMovies=this.movies;
  }

}

}
