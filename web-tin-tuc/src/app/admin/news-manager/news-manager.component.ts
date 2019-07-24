    import { Component, OnInit } from '@angular/core';
    import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
    import {AdminService} from '../_services/admin.service';
    import { News } from 'src/app/_models/News';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { AddNewsComponent } from '../add-news/add-news.component';
import { delay } from 'q';

    @Component({
        selector: 'app-news-manager',
        templateUrl: './news-manager.component.html',
        styleUrls: ['./news-manager.component.css']
    })
    export class NewsManagerComponent implements OnInit {

        listNews;
        currentPage = 1;
        constructor(
            private adminService: AdminService,
            private dialog: MatDialog,
        ) { }

        ngOnInit() {
            this.adminService.getListNews(this.currentPage).subscribe(list=>{
                this.listNews = list;
            });
        }

        onDelete(news){
            if(confirm('Are you sure to delete new has name: ' + news.title)){
                this.adminService.removeNews(news.id).subscribe(data=>{
                    this.adminService.getListNews(this.currentPage).subscribe(list=>{
                        this.listNews = list;
                    })
                });
            }
        }

        onOpenNewsDetailDialog(news){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '1000px';
            var dialogRef;

            this.adminService.getNewsById(news.id).subscribe(data=>{
                console.log(data);
                
                dialogConfig.data = data[0];
                dialogRef = this.dialog.open(NewsDetailComponent, dialogConfig);
                dialogRef.afterClosed().subscribe(result => {
                    if(result){
                        let formData = new FormData();
                        
                        formData.append('file', result.illustration);
                        console.log(result);

                        console.log(formData);
                        

                        result.illustration = formData;
                                            
                        this.adminService.updateNews(data[0].id, result).subscribe(res =>{
                            this.adminService.getListNews(this.currentPage).subscribe(list => {
                                this.listNews = list;
                            })
                        })
                    }
                })

            })
            
            
        }

        onOpenAddNewsDialog(){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '1000px';

            const dialogRef = this.dialog.open(AddNewsComponent, dialogConfig);

            dialogRef.afterClosed().subscribe(result => {
                if(result){
                    let formData = new FormData();
                        
                    formData.append('file', result.illustration);                    
                    this.adminService.addNews(result, formData).subscribe(data => {
                        this.adminService.addIllus(formData).subscribe(data =>{
                            console.log('asd');
                            
                        })
                        this.currentPage = 1;
                        this.adminService.getListNews(this.currentPage).subscribe(list=>{
                            this.listNews = list;
                        })
                    })
                }
            })
        }

    }
