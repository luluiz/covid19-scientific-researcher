import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private readonly API = environment.API;

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
    ) { }


    get(): Observable<any> {
        return this.http.get(this.API + 'update')
            .pipe(timeout(environment.http_timeout), catchError(erro => this.errorHandlerService.handler(erro)));
    }
}
