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

  ngOnInit(): void {
   this.getMovies();
  }
  private getMovies(){
    this.movieService.getMoviesList().subscribe(data=>{
      this.movies=data;
      console.log(this.movies);
      
    },err=>{
      console.log(err);
    });
  }

}
