import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteService } from "../favorite.service";
import { favorite } from "../favorite-interface";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit, OnDestroy {

  public title:string="ToDo List";
  public favorites: favorite[];
  public favoritesComplete: favorite[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private favoriteService:FavoriteService) { }

  ngOnInit(): void {
    this.getIncompleteTask();
    this.getCompleteTask();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the Subject
    this.destroy$.unsubscribe();
  }
  getCompleteTask():void {
    this.favoriteService.getFavoritosComplete()
        .pipe(takeUntil(this.destroy$))
        .subscribe(data=>this.favoritesComplete = data["result"]);
  }
  getIncompleteTask():void {
    this.favoriteService.getFavoritosIncomplete()
        .pipe(takeUntil(this.destroy$))
        .subscribe(data=>this.favorites = data["result"]);
  }
  updateCheck(object: favorite):void{
    this.favoriteService.updateFavoriteCheck(object)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
              if(data.favorito.nModified>0){
                  this.getIncompleteTask();
                  this.getCompleteTask();
              }
          });
  }
  add(activity:string,due_date:string):void {
    activity = activity.trim();
    if(!activity){
      alert("Debe escribir una actividad");
      return;
    }
    let created_at = new Date(Date.now()).toISOString();
    let due_date_at = <any>(due_date == "")? null: new Date(due_date).toISOString();
    let activity_checked = false;
    console.log(created_at);
    this.favoriteService.addFavorite({activity,created_at,due_date_at,activity_checked} as favorite)
        .pipe(takeUntil(this.destroy$))
        .subscribe(favorite=>{
          if(typeof favorite !=="undefined")
            this.favorites.push(favorite["favorite"]);
        });
  }
  delete(favorite:favorite):void {
    this.favoriteService.deleteFavorite(favorite)
        .pipe(takeUntil(this.destroy$))
        .subscribe(favoriteResult=>{
          if(favoriteResult["favorito"]["deletedCount"] > 0)
            this.favorites = this.favorites.filter(h => h._id !== favorite._id);
        });
  }
  stringAsDate(date_str: string){
    return new Date(date_str).toString();
  }
}
