    import { Component, OnInit } from '@angular/core';
    import {AdminService} from '../_services/admin.service';
    import { Catalog } from 'src/app/_models/Catalog';
    import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CatalogAddComponent } from '../catalog-add/catalog-add.component';
import { CatalogDetailComponent } from '../catalog-detail/catalog-detail.component';


    @Component({
        selector: 'app-catalog-manager',
        templateUrl: './catalog-manager.component.html',
        styleUrls: ['./catalog-manager.component.css']
    })
    export class CatalogManagerComponent implements OnInit {

        listCatalog;
        constructor(
            private adminService: AdminService,
            private dialog: MatDialog,
        ) { }

        ngOnInit() {
            this.adminService.getListCatalog().subscribe(data => {
                this.listCatalog = data;
            });
        }

        openAddDialog(){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '600px';

            const catalogRef = this.dialog.open(CatalogAddComponent, dialogConfig);

            catalogRef.afterClosed().subscribe(result =>{

            })
        }

        openDetailDialog(catalog){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '600px';
            dialogConfig.data = catalog;

            const catalogRef = this.dialog.open(CatalogDetailComponent,dialogConfig);

            catalogRef.afterClosed().subscribe(result => {})
        }

        onDelete(catalog: Catalog){
            if(confirm("Are you sure to delete catalog: " + catalog.name)){
                this.adminService.removeCatalog(catalog.id);
            }
        }

    }
