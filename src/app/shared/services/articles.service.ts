import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Article } from '../models/article.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {
    private readonly API = environment.API;

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
    ) { }

    get(filters?: Article): Observable<any> {
        let query: any = {};
        if (filters?._id) query._id = filters._id;
        if (filters?.title) query.title = filters.title;
        if (filters?.authors) query.authors = filters.authors;
        if (filters?.abstract) query.abstract = filters.abstract;
        if (filters?.published_year) query.published_year = filters.published_year;
        if (filters?.published_month) query.published_month = filters.published_month;
        if (filters?.journal) query.journal = filters.journal;
        if (filters?.volume) query.volume = filters.volume;
        if (filters?.issue) query.issue = filters.issue;
        if (filters?.pages) query.pages = filters.pages;
        if (filters?.accession) query.accession = filters.accession;
        if (filters?.doi) query.doi = filters.doi;
        if (filters?.ref) query.ref = filters.ref;
        if (filters?.covidence) query.covidence = filters.covidence;
        if (filters?.study) query.study = filters.study;
        if (filters?.notes) query.notes = filters.notes;
        if (filters?.tags) query.tags = filters.tags;

        return this.http.get(this.API + '/article', { params: query })
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }

    // editarImagemItem(id_cotacao: string, id_item: string, file: File): Observable<any> {
    //     let id_oficina = this.authService.getIdOficina();
    //     let formData = new FormData();
    //     formData.append('file', file);

    //     return this.http.put(this.API + 'cotacao/imagem/' + id_oficina + '/' + id_cotacao + '/' + id_item, formData)
    //         .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    // }
}
