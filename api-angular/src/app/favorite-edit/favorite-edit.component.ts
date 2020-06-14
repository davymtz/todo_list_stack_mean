import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { favorite } from "../favorite-interface";
import { FavoriteService } from "../favorite.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-favorite-edit',
  templateUrl: './favorite-edit.component.html',
  styleUrls: ['./favorite-edit.component.css']
})
export class FavoriteEditComponent implements OnInit {
  public title = 'Edit panel';
  public favorite: favorite = {_id:"",activity:"",created_at:null,due_date_at:null,activity_checked:false};
  public due_date: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
      private route: ActivatedRoute,
      private favoriteService: FavoriteService,
      private location: Location,
      private datePipe: DatePipe
  ){}
  ngOnInit(): void {
    this.getDetail();
  }
  ngOnDestroy(): void {
      this.destroy$.next(true);
      // Unsubscribe from the Subject
      this.destroy$.unsubscribe();
  }
  getDetail(): void {
    const id = <string>this.route.snapshot.paramMap.get("id");
    this.favoriteService.getFavorite(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(favorite=> {
            this.favorite = favorite["result"][0];
            let date = (favorite["result"][0]["due_date_at"]!==null)?(new Date(favorite["result"][0]["due_date_at"]).toString()):"";
            this.due_date = this.datePipe.transform(date, 'yyyy-MM-dd','UTC');
        });
  }
  submit():void {
      this.favorite.due_date_at = <any>(this.due_date== "")? null: new Date(this.due_date).toISOString();
      this.favoriteService.updateFavorite(this.favorite)
          .subscribe((result)=>{
              console.log(result);
              if(result["favorito"]["ok"]==1 && result["favorito"]["nModified"]>0){
                alert("Registro actualizado correctamente");
                this.goBack();
              }
          });
  }
  goBack(): void{
    this.location.back();
  }

}
