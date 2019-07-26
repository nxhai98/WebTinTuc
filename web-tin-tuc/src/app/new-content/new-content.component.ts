    import { Component, OnInit , Input} from '@angular/core';

    @Component({
        selector: 'app-new-content',
        templateUrl: './new-content.component.html',
        styleUrls: ['./new-content.component.css']
    })
    export class NewContentComponent implements OnInit {

        constructor(
        ) { }
        
        imgUrl = 'http://localhost:3000/imgs/'

        @Input() news;
        ngOnInit() {}

    }
