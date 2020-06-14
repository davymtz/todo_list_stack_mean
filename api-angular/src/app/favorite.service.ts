import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { retry,catchError,map,tap } from "rxjs/operators";
import { favorite } from "./favorite-interface";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private REST_API_SERVER = 'http://localhost:3000/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private _http:HttpClient) {}

  getFavoritosIncomplete():Observable<favorite[]> {
    return this._http.get<favorite[]>(this.REST_API_SERVER+"favorite/incomplete").pipe(
      retry(3),
      tap(_=>console.log("Se conectó exitosamente a la BD [getFavoritosIncomplete]")),
      catchError(this.handleError<favorite[]>('getFavoritosIncomplete', "Disculpe los problemas, no se puede conectar a la base de datos",[]))
    );
  }
  getFavoritosComplete():Observable<favorite[]> {
      return this._http.get<favorite[]>(this.REST_API_SERVER+"favorite/complete").pipe(
          retry(3),
          tap(_=>console.log("Conexion exitosa para completos - [getFavoritosComplete]")),
          catchError(this.handleError<favorite[]>('getFavoritosComplete', "Disculpe los problemas, no se puede conectar a la base de datos",[]))
      );
  }
  getFavorite(id: string):Observable<favorite> {
    const url = `${this.REST_API_SERVER}favorite/search/${id}`;
    return this._http.get<favorite>(url,this.httpOptions).pipe(
        tap(result=>{ if(result) console.log("Registro obtenido con éxito") }),
        catchError(this.handleError<favorite>('getFavorito',"No se pudo obtener el registro"))
    );
  }

  addFavorite(object: favorite): Observable<favorite> {
    return this._http.post<favorite>(this.REST_API_SERVER+"favorite", object, this.httpOptions).pipe(
      tap(_=>console.log("Dato agregado con éxito")),
      catchError(this.handleError<favorite>('addFavorite',"No se pudo agregar el registro"))
    );
  }
  updateFavorite(favorite: favorite):Observable<any> {
      const id = favorite["_id"];
      const url = `${this.REST_API_SERVER}favorite/${id}`;
      return this._http.put(url,favorite, this.httpOptions).pipe(
          tap(result=>{
              if(result["favorito"]["ok"]==1 && result["favorito"]["nModified"]==0)
                  console.log("El proceso fue correcto, pero no se actualizó tal registro");
          }),
          catchError(this.handleError<favorite>('updateFavorite',"No se pudo actualizar el registro"))
      );
  }
  deleteFavorite(object: favorite): Observable<favorite> {
    const id = object["_id"];
    const url = `${this.REST_API_SERVER}favorite/${id}`;
    return this._http.delete<favorite>(url,this.httpOptions).pipe(
      tap((result)=>{
        if(result["favorito"]["ok"]==1 && result["favorito"]["deletedCount"]==0)
          console.log("El proceso fue correcto, pero no se eliminó tal registro");
      }),
      catchError(this.handleError<favorite>('deleteFavorite',"No se pudo eliminar el registro"))
    );
  }
  updateFavoriteCheck(object:favorite):Observable<any> {
      const id = object["_id"];
      const checked = object.activity_checked;
      const url = `${this.REST_API_SERVER}favorite/checked/${id}`;
      return this._http.put(url,{checked: checked}, this.httpOptions).pipe(
          tap(result=>{
              if(result["favorito"]["ok"]==1 && result["favorito"]["nModified"]==0)
                  console.log("El proceso fue correcto, pero no se actualizó tal registro, [updateFavoriteCheck]");
          }),
          catchError(this.handleError<favorite>('updateFavoriteCheck',"No se pudo actualizar el registro"))
      );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', message:string="",result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      if(message.length!=0)
        alert(message);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
