import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '../../../shared/models/article.model';

@Component({
    selector: 'app-modal-abstract',
    templateUrl: './modal-abstract.component.html',
    styleUrls: ['./modal-abstract.component.css']
})
export class ModalAbstractComponent implements OnInit {
    public article: Article;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<any>,
    ) {
        console.log('data', data)
        this.article = data.article;
    }

    ngOnInit(): void {
    }

    close() {
        this.dialog.close();
    }

}
