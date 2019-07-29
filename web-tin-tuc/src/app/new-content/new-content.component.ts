    import { Component, OnInit , Input} from '@angular/core';
    import {ActivatedRoute} from '@angular/router';
    import {UserService} from '../_servises/user.service';
import { News } from '../_models/News';

    @Component({
        selector: 'app-new-content',
        templateUrl: './new-content.component.html',
        styleUrls: ['./new-content.component.css']
    })
    export class NewContentComponent implements OnInit {

        constructor(
            private route: ActivatedRoute,
            private userSevice: UserService,
        ) { }
        
        imgUrl = 'http://localhost:3000/imgs/'

        news;
        ngOnInit() {
            this.route.params.subscribe(params =>{
                this.userSevice.getNewsById(params.id).subscribe(data =>{
                    this.news = data[0];
                    console.log(data)
                })
            })
        }

    }
