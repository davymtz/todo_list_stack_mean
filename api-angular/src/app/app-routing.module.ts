import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteListComponent } from "./favorite-list/favorite-list.component";
import { FavoriteEditComponent } from "./favorite-edit/favorite-edit.component";


const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: FavoriteListComponent},
    {path: 'edit/:id', component: FavoriteEditComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
