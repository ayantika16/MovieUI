import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ticket } from "../models/ticket";

@Injectable({
    providedIn: 'root'
})
export class TicketService{

    private baseURL="http://localhost:8090/api/v1/Ticket";

    constructor(private httpClient:HttpClient) { }

    getTickets():Observable<Ticket[]>{
      return this.httpClient.get<Ticket[]>(`${this.baseURL}/getTickets`);
    }

  bookTicket(ticket: Ticket, movieId: number):Observable<Ticket>{
    return this.httpClient.post<Ticket>(`${this.baseURL}/bookTicket/${movieId}`, ticket);
  }
}