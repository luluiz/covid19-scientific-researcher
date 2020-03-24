import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Article } from '../../shared/models/article.model';
import { ArticlesService } from '../../shared/services/articles.service';
import { ModalAbstractComponent } from './modal-abstract/modal-abstract.component';

@Component({
    selector: 'app-articles-table',
    templateUrl: './articles-table.component.html',
    styleUrls: ['./articles-table.component.css']
})
export class ArticlesTableComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @Input() qty_articles: number;
    // public columns: string[] = ['title', 'authors', 'abstract', 'published_year', 'published_month', 'journal', 'volume', 'issue', 'pages', 'accession', 'doi', 'ref', 'covidence', 'study', 'notes', 'tags', 'created', 'updated', 'open'];
    public columns: string[] = ['title', 'authors', 'journal', 'doi', 'ref', 'open'];
    public length: number = 0;
    public pageSize: number = 25;
    public pageSizeOptions: number[] = [25, 50, 100, 200];
    public itensDS = new MatTableDataSource<Article[]>();

    constructor(
        private articleService: ArticlesService,
        private dialog: MatDialog
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes && !changes.qty_articles.firstChange)
        // this.length = this.qty_articles;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getArticles();
    }

    getArticles(_filters?: any) {
        // console.log('filters', _filters);
        let sort = this.getSort();
        let pag = this.getPagination();
        let filters = _filters ? _filters : null;

        this.articleService.get(filters, pag.limit, pag.skip, sort.sort, sort.direction)
            .pipe(take(1))
            .subscribe(response => {
                if (response.success) {
                    // console.log(response);
                    this.itensDS.data = response.articles;
                    this.length = response.length;
                } else {
                    // this.toast.show('error', response.message);
                }
            });
    }

    getSort(): { sort: string, direction: string } {
        if (this.sort) return {
            sort: this.sort.active,
            direction: this.sort.direction
        };
        else return null;
    }

    getPagination(): { limit: number, skip: number } {
        if (this.paginator) return {
            limit: this.paginator.pageSize,
            skip: (this.paginator.pageSize * this.paginator.pageIndex),
        };
        else return null;
    }

    open(it: Article) {
        let doi_url: string = 'https://doi.org/';
        window.open(doi_url + it.doi)
    }

    abstract(it: Article) {
        this.dialog.open(ModalAbstractComponent, {
            autoFocus: false,
            data: { article: it }
        });
    }
}
