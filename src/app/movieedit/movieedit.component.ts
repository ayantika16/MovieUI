import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-movieedit',
  templateUrl: './movieedit.component.html',
  styleUrls: ['./movieedit.component.css']
})
export class MovieeditComponent implements OnInit{

  m:Movie|undefined;

  updatedMovie:Movie=new Movie();

  editMovie!:FormGroup;

  constructor(private notificationService:NotificationService, private movieService:MovieService,private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: Movie) {}

  ngOnInit(): void {

    this.editMovie= this.formBuilder.group({
      movieId:[this.data.movieId,[Validators.required]],
      movieName:[this.data.movieName,[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      theatreName:[this.data.theatreName,[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      imageUrl:[this.data.imageUrl,[Validators.required]],
      directorName:[this.data.directorName,[Validators.required]],
      screeningType:[this.data.screeningType,[Validators.required]],
      totalSeats:[this.data.totalSeats,[Validators.required, Validators.min(1)]],
      seatsAvailable:[this.data.seatsAvailable,[Validators.required, Validators.min(1)]]
    });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.editMovie.controls[controlName].hasError(errorName);
    }

    get movieId(){
      return this.editMovie.get("movieId");
    }
  
    get movieName(){
      return this.editMovie.get("movieName");
    }

    get theatreName(){
      return this.editMovie.get("theatreName");
    }

    get imageUrl(){
      return this.editMovie.get("imageUrl");
    }

    get directorName(){
      return this.editMovie.get("directorName");
    }

    get screeningType(){
      return this.editMovie.get("screeningType");
    }

    get totalSeats(){
      return this.editMovie.get("totalSeats");
    }

    get seatsAvailable(){
      return this.editMovie.get("seatsAvailable");
    }

    editNewMovie():void{

      this.updatedMovie.movieId=this.editMovie.value.movieId;
      this.updatedMovie.movieName=this.editMovie.value.movieName;
      this.updatedMovie.theatreName=this.editMovie.value.theatreName;
      this.updatedMovie.imageUrl=this.editMovie.value.imageUrl;
      this.updatedMovie.directorName=this.editMovie.value.directorName;
      this.updatedMovie.screeningType=this.editMovie.value.screeningType;
      this.updatedMovie.totalSeats=this.editMovie.value.totalSeats;
      this.updatedMovie.seatsAvailable=this.editMovie.value.seatsAvailable;


      this.movieService.updateMovie(this.updatedMovie).subscribe(
        data=>{
          this.m=data;
          console.log(data);
          
          
        },error=>console.log(error)      
      )

      window.location.reload();

      this.notificationService.success(':: Movie Updated Successfully');

    }

}
