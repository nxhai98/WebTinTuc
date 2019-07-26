    import { Component, OnInit } from '@angular/core';
    import {UserService} from '../_servises/user.service';
    import {CatalogFamily, Catalog} from '../_models/Catalog';
import { templateJitUrl } from '@angular/compiler';

    @Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
    export class HomeComponent implements OnInit {
        imgUrl = 'http://localhost:3000/imgs/'
        newUrl = 'http://localhost:3000/news/id/'
        currentPage = 1;
        listNews;
        listCatalog: Catalog[];
        listRootCatalog: CatalogFamily[] = [];
        isnewsSelected = false;
        selectedNews;
        constructor(
            private userService: UserService,
        ) { 
            this.userService.getListCatalog().subscribe(catalogs =>{
                this.listCatalog = catalogs;
                catalogs.forEach(item =>{
                    if(item.parentId == null){
                        this.listRootCatalog.push({catalog: item, child: []});
                    }

                })
            });
        }

        ngOnInit() {
            this.userService.getNewsByPage(this.currentPage).subscribe(list=>{
                this.listNews = list;
            })
        }

        onSelect(newsId){
            this.userService.getNewsById(newsId).subscribe(data =>{
                console.log(data);
                
                this.selectedNews = data[0];
                this.isnewsSelected = true;
            })
        }

    }
