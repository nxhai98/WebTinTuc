    import { Injectable, ErrorHandler } from '@angular/core';
    import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
    import {Observable, throwError} from 'rxjs';
    import {catchError, tap, map} from 'rxjs/operators'; 
    import {AuthenticationService} from './authentication.service';
import { Catalog } from '../_models/Catalog';
import { News } from '../_models/News';


    @Injectable({
    providedIn: 'root'
    })
    export class UserService {

        constructor(
            private http: HttpClient,
            private auth: AuthenticationService
        ) { }
        url = 'http://127.0.0.1:3000/';
        

        getNewsByPage(page){
            return this.http.get(this.url + 'news/page/' + page).pipe(
                tap(),
                catchError(this.handleError)
            );
        }

        getNewsByCatalog(page, catalogId){
            return this.http.get(this.url + 'news/catalog/' + catalogId + '/page/' + page).pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        getNewCountByCatalog(catalogId){
            return this.http.get<number>(this.url + 'news/catalog/' + catalogId + '/page').pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        getMaxPage(){
            return this.http.get<number>(this.url + 'news/page/').pipe(
                tap(),
                catchError(this.handleError)
            );
        }

        getNewsById(id: number){
            return this.http.get<News>(this.url + 'news/id/' + id).pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        getListCatalog(){
            return this.http.get<Catalog[]>(this.url + 'admin/catalogs/').pipe(
                tap(),
                catchError(this.handleError)
            );
        }

        getListChildCatalog(id){
            return this.http.get(this.url + 'admin/catalogs/' + id).pipe(
                tap(),
                catchError(this.handleError)
            );
        }




        private handleError(error: HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error("An error occurred:", error.error.message);
            } else {
                // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
                console.error(
                    `Backend returned code ${error.status}, ` + `body was: ${error.error}`
                );
            }
            // return an observable with a user-facing error message
            return throwError(error);
        }
    }
