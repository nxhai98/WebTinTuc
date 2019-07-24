    import { Component, OnInit, Input, Inject } from '@angular/core';
    import {FormBuilder, FormGroup, Validators} from '@angular/forms';
    import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
    import {AdminService} from '../_services/admin.service';
    import { News } from 'src/app/_models/News';
    import { Catalog } from 'src/app/_models/Catalog';
import { user } from 'src/app/_models/User';

    @Component({
        selector: 'app-add-news',
        templateUrl: './add-news.component.html',
        styleUrls: ['./add-news.component.css']
    })
    export class AddNewsComponent implements OnInit {

        addForm: FormGroup;
        catalogList: Catalog[];
        listAuthor: user[];
        constructor(
            private formBuilder: FormBuilder,
            private adminSevice: AdminService,
            public matdialogRef: MatDialogRef<AddNewsComponent>,
            @Inject(MAT_DIALOG_DATA) public data: News,
        ) { }

        ngOnInit() {
            this.catalogList = this.adminSevice.getListCatalog();
            this.listAuthor = this.adminSevice.getAuthor();
            this.addForm = this.formBuilder.group({
                title: ['', Validators.required],
                author: ['', Validators.required],
                catalogId: ['', Validators.required],
                description: [''],
                content: [''],
            });
        }

        get f(){
            return this.addForm.controls;
        }

        close(){
            this.matdialogRef.close();
        }

        submitted = false;

        onSubmit(){
            this.submitted = true;

            if(this.addForm.invalid){
                return;
            }

            this.matdialogRef.close(this.addForm.value);
        }


    }
