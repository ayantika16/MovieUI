import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";


@Injectable({
    providedIn: 'root'
})
export class MovieService{

    private baseURL="http://localhost:8090/api/v1/moviebooking";

    constructor(private httpClient:HttpClient) { }

  getMoviesList():Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.baseURL}/getAllMovies`);
  }

  getMovieById(movieId: number):Observable<Movie>{
    return this.httpClient.get<Movie>(`${this.baseURL}/searchByMovieId/${movieId}`);
  }

  addMovie(movie: Movie):Observable<Movie>{
    return this.httpClient.post<Movie>(`${this.baseURL}/addMovie`, movie);
  }

  updateMovie(movie: Movie):Observable<Movie>{
    return this.httpClient.put<Movie>(`${this.baseURL}/updateMovie`, movie);
  }

  deleteMovie(movieId: number):Observable<String>{
    return this.httpClient.delete<String>(`${this.baseURL}/deleteMovie/${movieId}`);
  }


}