    import { Component, OnInit } from '@angular/core';
    import {AuthenticationService} from './_servises/authentication.service';
    import {Router, ActivatedRoute} from '@angular/router';
    import { user } from './_models/User';
    import { Catalog, CatalogFamily } from './_models/Catalog';
    import {UserService} from './_servises/user.service';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit{
        logOutAvalid = false;
        currentUser: user;
        listCatalog: Catalog[];
        listRootCatalog: CatalogFamily[] = [];
        constructor(
            private authentucationService:  AuthenticationService,
            private router : Router,
            private userService: UserService,
            private route: ActivatedRoute,
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
            this.userService.getListCatalog().subscribe(catalogs =>{
                this.listCatalog = catalogs;
                catalogs.forEach(item =>{
                    if(item.parentId == null){
                        this.listRootCatalog.push({catalog: item, child: [], displayChild: false});
                    }
                })
                this.listCatalog.forEach(item =>{
                    this.listRootCatalog.forEach(root => {
                        if(item.parentId == root.catalog.id){
                            root.child.push(item);
                        }
                    })
                });

            });
            this.route.url.subscribe(url => {
                console.log(url);
            })
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

        displayClildCatalog(id){
            this.listRootCatalog.forEach(root =>{
                if(root.catalog.id == id){
                    root.displayChild = true;
                }
            })
        }

        isDashboardOpen = false;
        isOpen(){
            return !this.router.isActive('admin/dashboard', true)
        }
    }
