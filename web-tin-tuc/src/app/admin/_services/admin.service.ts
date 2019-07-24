    import { Injectable, ErrorHandler } from '@angular/core';
    import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
    import {Observable, throwError} from 'rxjs';
    import {catchError, tap, map} from 'rxjs/operators'; 
    
    import {AuthenticationService} from '../../_servises/authentication.service';
    import { user } from 'src/app/_models/User';
    import { News } from 'src/app/_models/News';
    import { Catalog } from 'src/app/_models/Catalog';


    @Injectable({
    providedIn: 'root'
    })
    export class AdminService {
        currentUser: user;
        url = 'http://127.0.0.1:3000/admin/';
        httpOptions;
        constructor(
            private http: HttpClient,
            private authenticateService: AuthenticationService,
        ) { 
            this.currentUser = authenticateService.currentUserValue;
            this.httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.currentUser.token })
              };
        }
        dataFake: user[] = [
            {id: 1, userName: 'khongminh123', role: 'User', email: 'luong.gc@gmail.com', fullName: 'Gia Cát Lượng', gender: 'male'},
            {id: 2, userName: 'ngochoang', role: 'User', email: 'hoang.nv@gmail.com', fullName: 'Không Nhớ', gender: 'male'},

        ]

        fakeNews: News[] = [
            {id: 1, title: 'Vụ thu hồi sổ đỏ loạt chung cư: Cần làm rõ trách nhiệm người ra quyết ...', author: this.dataFake[0], catalogId: 1 , updateAt: new Date(2018,12,2), createAt: new Date(2018,12,3)}
        ]

        fakeCatalog: Catalog[] = [
            {id: 1, name: 'Pháp luật', description: 'phap luat'}
        ]
        //user-manage
        getListUser(){  
            
            return this.http.get(this.url + 'users/', this.httpOptions).pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        addUser(user){
            return this.http.post(this.url + 'users/', user, this.httpOptions).pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        removaUser(id){
            return this.http.delete(this.url + 'users/' + id, this.httpOptions).pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        updateUser(id, user){
            return this.http.put(this.url + 'users/' + id, user, this.httpOptions).pipe(
                tap(),
                catchError(this.handleError),
            )
        }

        //News Manager

        getListNews() :News[]{
            return this.fakeNews;
        }

        addNews(){

        }

        removeNews(id){

        }

        updateNews(){

        }

        //catalog mng
        getListCatalog(){
            return this.http.get(this.url + 'catalogs', this.httpOptions).pipe(
                tap(),
                catchError(this.handleError)
            );
        }
        
        addCatalog(){

        }

        removeCatalog(id){

        }

        updateCatalog(){

        }

        getAuthor() :user[]{
            return this.dataFake;
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
