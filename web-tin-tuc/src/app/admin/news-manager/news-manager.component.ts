    import { Component, OnInit } from '@angular/core';
    import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
    import {AdminService} from '../_services/admin.service';
    import { News } from 'src/app/_models/News';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { AddNewsComponent } from '../add-news/add-news.component';

    @Component({
        selector: 'app-news-manager',
        templateUrl: './news-manager.component.html',
        styleUrls: ['./news-manager.component.css']
    })
    export class NewsManagerComponent implements OnInit {

        listNews : News[];

        constructor(
            private adminService: AdminService,
            private dialog: MatDialog,
        ) { }

        ngOnInit() {
            this.listNews = this.adminService.getListNews();
        }

        onDelete(news){
            if(confirm('Are you sure to delete new has name: ' + news.title)){
                this.adminService.removeNews(news.id);
            }
        }

        onOpenNewsDetailDialog(news){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '1000px';
            dialogConfig.data = news;

            const dialogRef = this.dialog.open(NewsDetailComponent, dialogConfig);

            dialogRef.afterClosed().subscribe(result => {
                console.log(result);
                
            })
        }

        onOpenAddNewsDialog(){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '1000px';

            const dialogRef = this.dialog.open(AddNewsComponent, dialogConfig);

            dialogRef.afterClosed().subscribe(result => {
                console.log(result);

            })
        }

    }
