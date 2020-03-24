import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    public linkedin: string = "https://www.linkedin.com/in/eng-luiz-bezerra/en";
    public git_front: string = "https://github.com/luluiz/covid19-scientific-researcher.git";
    public git_api: string = "https://github.com/luluiz/api-covid19-scientific-researcher.git";

    constructor() { }

    ngOnInit(): void {
    }

}
