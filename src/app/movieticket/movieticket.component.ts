import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Movie } from '../models/movie';
import { Ticket } from '../models/ticket';
import { MovieeditComponent } from '../movieedit/movieedit.component';
import { MovieService } from '../services/movie.service';
import { NotificationService } from '../services/notification.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-movieticket',
  templateUrl: './movieticket.component.html',
  styleUrls: ['./movieticket.component.css']
})
export class MovieticketComponent implements OnInit{
  panelOpenState = false;

  m:Movie|undefined;

  mov:boolean=true;
  tick:boolean=false;

  newMovie:Movie=new Movie();

  movies:Movie[] | undefined;
  tickets:Ticket[] | undefined;

  addMovie!:FormGroup;

    constructor(private notificationService:NotificationService, private movieService:MovieService, private ticketService:TicketService,
      private formBuilder:FormBuilder, public dialog: MatDialog,
      private zone: NgZone) { }

  ngOnInit(): void {
    this.getMovies();

    this.addMovie= this.formBuilder.group({
      movieId:[0,[Validators.required]],
      movieName:['',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      theatreName:['',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      imageUrl:['',[Validators.required]],
      directorName:['',[Validators.required]],
      screeningType:['',[Validators.required]],
      totalSeats:[100,[Validators.required, Validators.min(1)]],
      seatsAvailable:[100,[Validators.required, Validators.min(1)]]
    });
   }

   public myError = (controlName: string, errorName: string) =>{
    return this.addMovie.controls[controlName].hasError(errorName);
    }


    get movieId(){
      return this.addMovie.get("movieId");
    }
  
    get movieName(){
      return this.addMovie.get("movieName");
    }

    get theatreName(){
      return this.addMovie.get("theatreName");
    }

    get imageUrl(){
      return this.addMovie.get("imageUrl");
    }

    get directorName(){
      return this.addMovie.get("directorName");
    }

    get screeningType(){
      return this.addMovie.get("screeningType");
    }

    get totalSeats(){
      return this.addMovie.get("totalSeats");
    }

    get seatsAvailable(){
      return this.addMovie.get("seatsAvailable");
    }



    addNewMovie():void{

      this.newMovie.movieId=this.addMovie.value.movieId;
      this.newMovie.movieName=this.addMovie.value.movieName;
      this.newMovie.theatreName=this.addMovie.value.theatreName;
      this.newMovie.imageUrl=this.addMovie.value.imageUrl;
      this.newMovie.directorName=this.addMovie.value.directorName;
      this.newMovie.screeningType=this.addMovie.value.screeningType;
      this.newMovie.totalSeats=this.addMovie.value.totalSeats;
      this.newMovie.seatsAvailable=this.addMovie.value.seatsAvailable;


      this.movieService.addMovie(this.newMovie).subscribe(

        data=>{
          this.m=data;
          console.log(data);

          
          
        },error=>console.log(error)      
      )

      this.notificationService.success(':: Movie Added Successfully');


    }

   getMovies(){
    this.mov=true;
    this.tick=false;
    this.movieService.getMoviesList().subscribe(data=>{
      this.movies=data;
      console.log(this.movies);
      
    },err=>{
      console.log(err);
    });
  }

  getTickets(){
    this.tick=true;
    this.mov=false;
    this.ticketService.getTickets().subscribe(data=>{
      this.tickets=data;
      console.log(this.tickets);
      
    },err=>{
      console.log(err);
    });
  }

  deleteMovie(mo:Movie){

    if(confirm(`Are You Sure to Delete ${mo.movieId} ${mo.movieName} Details`)){
      this.movieService.deleteMovie(mo.movieId).subscribe(data=>{
        console.log(data);
      },err=>{console.log(err)})

      window.location.reload();

      this.notificationService.success(':: Movie Deleted Successfully');

    }else{
      window.location.reload();

    }

  }

  openDialog(mov:Movie) {

    this.zone.run(() =>{
    this.dialog.open(MovieeditComponent, {
      width:'900px',
        data:mov
    });
  });
}
}
