import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Upload } from '../shared/models/upload.model';
import { ArticlesService } from '../shared/services/articles.service';
import { UploadService } from '../shared/services/upload.service';

@Component({
    selector: 'app-search-articles',
    templateUrl: './search-articles.component.html',
    styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent implements OnInit {
    public loading: boolean;
    public qty_articles: number;
    public upload: Upload;

    constructor(
        private articleService: ArticlesService,
        private uploadService: UploadService
    ) { }

    ngOnInit() {
        this.getQtyArticles();
        this.getUpload();
    }

    getUpload() {
        this.loading = true;
        this.uploadService.get().pipe(take(1)).subscribe(response => {
            if (response.success) {
                this.upload = response.update;
            }
        }, null, () => this.loading = false);
    }

    getQtyArticles() {
        this.loading = true;
        this.articleService.count().pipe(take(1)).subscribe(response => {
            if (response.success) this.qty_articles = response.count;
        }, null, () => this.loading = false);
    }
}
