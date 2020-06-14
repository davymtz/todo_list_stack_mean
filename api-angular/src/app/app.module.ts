import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { FavoriteEditComponent } from './favorite-edit/favorite-edit.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteListComponent,
    FavoriteEditComponent
  ],
  imports: [
    BrowserModule,FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
