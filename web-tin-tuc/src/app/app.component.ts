    import { Component, OnInit } from '@angular/core';
    import {AuthenticationService} from './_servises/authentication.service';
    import {Router} from '@angular/router';
    import { user } from './_models/User';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit{
        logOutAvalid = false;
        currentUser: user;
        constructor(
            private authentucationService:  AuthenticationService,
            private router : Router,
        ){
        }
        title = 'web-tin-tuc';
        logout(){
            this.authentucationService.logOut();
            this.router.navigate(['/login']);
            this.logOutAvalid = false;
            localStorage.removeItem('currentUser')
        }
        ngOnInit() {
        }
        
        userInSigin(){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));            
            if(this.currentUser){
                return true;
            }     
            else{
                return false
            }  
        }
    }
