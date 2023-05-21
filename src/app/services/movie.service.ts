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
}