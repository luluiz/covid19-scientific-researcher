import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
    @Output() response: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    public years: number[] = [2019, 2020];
    public months: { id: number, txt: string }[] = [{ id: 1, txt: 'Jan' }, { id: 2, txt: 'Feb' }, { id: 3, txt: 'Mar' }, { id: 4, txt: 'Apr' }, { id: 5, txt: 'May' }, { id: 6, txt: 'Jun' }, { id: 7, txt: 'Jul' }, { id: 8, txt: 'Aug' }, { id: 9, txt: 'Sep' }, { id: 10, txt: 'Oct' }, { id: 11, txt: 'Nov' }, { id: 12, txt: 'Dez' }];

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.iniciarForms()
    }

    iniciarForms() {
        this.form = this.fb.group({
            title: [null],
            authors: [null],
            abstract: [null],
            published_year: [new Date().getFullYear()],
            published_month: [new Date().getMonth() + 1],
            journal: [null],
            volume: [null],
            issue: [null],
            pages: [null],
            accession: [null],
            doi: [null],
            ref: [null],
            covidence: [null],
            study: [null],
            notes: [null],
            tags: [null],
            tags_array: [null],
            created_from: [null],
            created_to: [null],
        });

        this.valueChanges();
    }

    valueChanges() {
        this.txtFilter('title').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('authors').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('abstract').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('published_year').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('published_month').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('journal').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('volume').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('issue').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('pages').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('accession').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('doi').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('ref').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('covidence').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('study').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('notes').subscribe(_v => this.response.emit(this.form.value));
        // this.txtFilter('tags').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('created_from').subscribe(_v => this.response.emit(this.form.value));
        this.txtFilter('created_to').subscribe(_v => this.response.emit(this.form.value));
    }

    txtFilter(field: string): Observable<any> {
        return this.form.get(field).valueChanges.pipe(
            map(value => value ? value.trim() : null),
            filter(value => value ? value.length > 0 || value === '' : true),
            debounceTime(200),
            distinctUntilChanged(),
        );
    }
}
