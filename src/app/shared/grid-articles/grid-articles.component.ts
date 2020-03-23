import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArticlesService } from '../services/articles.service';

@Component({
    selector: 'app-grid-articles',
    templateUrl: './grid-articles.component.html',
    styleUrls: ['./grid-articles.component.css']
})
export class GridArticlesComponent implements OnInit {

    constructor(
        private articleService: ArticlesService,
    ) { }

    ngOnInit(): void {
        this.getArticles();
    }

    getArticles() {
        this.articleService.get()
            .pipe(take(1))
            .subscribe(response => {
                if (response.success) {
                    console.log(response);
                } else {
                    // this.toast.show('error', response.message);
                }
            });
    }
}
