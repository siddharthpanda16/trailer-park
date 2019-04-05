import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../services/userServices';
import { MovieService } from '../services/movieServices';
import { Movie } from '../models/movie';
import { User } from '../models/user';
import {CdkDragDrop, moveItemInArray, DragDropModule} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  user : User = new User();
  movies : Movie[] = [];
  saveDisabled :Boolean = true;

  constructor(private sharedData:DataService, private movieService:MovieService,
     private userService:UserService, private router: Router ) { }

  ngOnInit() {
    this.sharedData.currentUser.subscribe(user=> {
      if(  user.username==''){
      this.router.navigate(['/login']);

      }
      else{
        console.log("i am in playlist");
        this.setUser();
        this.getPlaylist();
        }
      });
    
  }

  public getPlaylist(): void {
    this.sharedData.currentUser.subscribe( currentUser => {
      this.user = currentUser;
      var playlist = this.user.cart;
      playlist.forEach( movieId => {
        this.movieService.getMovieById(movieId).subscribe( movie => {
          this.movies.push( movie );
        })
      });
    });
    // this.sharedData.allMovies.subscribe( movies => {
    //   movies.forEach(element => {
    //     this.movies.push( element );
    //   });
    // });
  }

  public setUser(){
    this.sharedData.currentUser.subscribe( user => {
      this.user = user;
    });
  }
  
  public drop(event: CdkDragDrop<string[]>) {
    this.saveDisabled = null;
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  public updateCart(){
    let movieIds:string[] = [];
    this.movies.forEach(movie => {
      movieIds.push(movie._id);
    }); 
    this.userService.updatePlaylist(this.user, movieIds);
    this.saveDisabled = true;
    console.log( movieIds);
  }

  public movieDetails(movie:Movie){
    this.router.navigateByUrl('/movie/'+movie._id);
  }

  public canPlay(movie:Movie){
    return this.user.plan >= movie.level;
  }

  public removeFromPlaylist(movie:Movie){
    this.userService.deleteFromPlaylist(this.user, movie._id);
  }

  public play(){
    
  }
}
