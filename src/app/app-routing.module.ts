import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movies/movie.component';
import { MoviedetailsComponent } from './movies/moviedetails.component';
import { MovieticketComponent } from './movieticket/movieticket.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',component:HomepageComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'aboutus', component:AboutusComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'movies',component:MovieComponent, canActivate:[AuthGuard]
},
{path:'movies/:movieId', component: MoviedetailsComponent},
{path:'movieticket', component: MovieticketComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
