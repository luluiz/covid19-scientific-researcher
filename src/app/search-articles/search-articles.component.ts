import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArticlesService } from '../shared/services/articles.service';

@Component({
    selector: 'app-search-articles',
    templateUrl: './search-articles.component.html',
    styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent implements OnInit {
    public loading: boolean;
    public qty_articles: number;

    constructor(
        private articleService: ArticlesService
    ) { }

    ngOnInit() {
        this.getQtyArticles();
    }

    getQtyArticles() {
        this.loading = true;
        this.articleService.count().pipe(take(1)).subscribe(response => {
            if (response.success) this.qty_articles = response.count;
        }, null, () => this.loading = false);
    }
}
