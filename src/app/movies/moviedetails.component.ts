import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie';
import { Ticket } from '../models/ticket';
import { MovieService } from '../services/movie.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit, OnDestroy{

  tick:Ticket|undefined;

  movieId:number=0;
  mov!:Movie | null | undefined;
  sub!:Subscription;
  errorMessage:string='';

  ticket:Ticket= new Ticket();

  showForm:boolean=false;

  main:boolean=true;


  pageTitle:string='Book Your Tickets';

  addTicket!: FormGroup;
  

  //Injecting activatedroute, router
  constructor(private activatedRoute:ActivatedRoute, private router:Router,private movieService:MovieService,
      private ticketService: TicketService, private formBuilder:FormBuilder){}


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

    this.addTicket= this.formBuilder.group({
      bookingName:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      bookedSeats:[1,[Validators.required, Validators.min(1)]]
    });

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.addTicket.controls[controlName].hasError(errorName);
    }

    get bookingName(){
      return this.addTicket.get("bookingName");
    }
  
    get bookedSeats(){
      return this.addTicket.get("bookedSeats");
    }

  //It will navigate to the movies page
  back():void{
    this.router.navigate(['movies']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  bookTicket():void{

    this.ticket.movie_id_fk=this.mov?.movieId;
    console.log(this.addTicket.value.bookingName);
    this.ticket.bookingName=this.addTicket.value.bookingName;
    this.ticket.bookedSeats=this.addTicket.value.bookedSeats;

    this.ticketService.bookTicket(this.ticket, this.mov?.movieId).subscribe(
      data=>{
        this.tick=data;
        console.log(data);
      },error=>console.log(error)      
    )

    this.main=false;
  }

  navigateMovies():void{
    this.router.navigate(['/movies']);
  }

  callForm():void{
    this.showForm=true;
  }
}
