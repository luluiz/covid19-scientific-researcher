import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
// import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(
        private router: Router,
        // private toast: ToastService,
    ) { }

    handler(e) {
        let errorMessage = '';
        // console.log('ERRO', e)
        if (e.error instanceof ErrorEvent) {
            // client-side error: Caso haja necessidade de algum tratamento específico.
            errorMessage = `${e.error}`;
        } if (e.error instanceof ProgressEvent) {
            errorMessage = 'Falha na comunicação com o servidor.';
        } else {
            // server-side error
            errorMessage = `${e.error}`;
        }

        // this.toast.show('info', errorMessage);
        if (e.status >= 0) this.redirect(e.status);
        return throwError(errorMessage);
    }

    redirect(status: number) {
        switch (status) {
            case 0:
                this.router.navigate(['404']);
                break;
            case 404:
                this.router.navigate(['404']);
                break;
            default:
                this.router.navigate(['404']);
                break;
        };
    }
}
