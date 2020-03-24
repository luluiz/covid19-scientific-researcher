import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @Input() tags: string[];
    @Input() authors: string[];
    @Input() journals: string[];
    @Output() response: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    public years: number[] = [2019, 2020];
    public months: { id: number, txt: string }[] = [{ id: 1, txt: 'Jan' }, { id: 2, txt: 'Feb' }, { id: 3, txt: 'Mar' }, { id: 4, txt: 'Apr' }, { id: 5, txt: 'May' }, { id: 6, txt: 'Jun' }, { id: 7, txt: 'Jul' }, { id: 8, txt: 'Aug' }, { id: 9, txt: 'Sep' }, { id: 10, txt: 'Oct' }, { id: 11, txt: 'Nov' }, { id: 12, txt: 'Dez' }];

    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public filteredTags: Observable<string[]>;
    public filteredAuthors: Observable<string[]>;
    public filteredJournals: Observable<string[]>;
    public tags_array: string[] = [];

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initForms()
    }

    initForms() {
        this.form = this.fb.group({
            title: [null],
            authors: [null],
            abstract: [null],
            // published_year: [new Date().getFullYear()],
            // published_month: [new Date().getMonth() + 1],
            journal: [null],
            volume: [null],
            // issue: [null],
            // pages: [null],
            // accession: [null],
            doi: [null],
            ref: [null],
            covidence: [null],
            study: [null],
            notes: [null],
            tags: [null],
            // tags_array: [null],
            // created_from: [null],
            // created_to: [null],
        });

        this.valueChanges();
    }

    valueChanges() {
        this.txtFilter('title').subscribe(_v => this.emit());
        this.txtFilter('authors').subscribe(_v => this.emit());
        this.txtFilter('abstract').subscribe(_v => this.emit());
        // this.txtFilter('published_year').subscribe(_v => this.emit());
        // this.txtFilter('published_month').subscribe(_v => this.emit());
        this.txtFilter('journal').subscribe(_v => this.emit());
        this.txtFilter('volume').subscribe(_v => this.emit());
        // this.txtFilter('issue').subscribe(_v => this.emit());
        // this.txtFilter('pages').subscribe(_v => this.emit());
        // this.txtFilter('accession').subscribe(_v => this.emit());
        this.txtFilter('doi').subscribe(_v => this.emit());
        this.txtFilter('ref').subscribe(_v => this.emit());
        this.txtFilter('covidence').subscribe(_v => this.emit());
        this.txtFilter('study').subscribe(_v => this.emit());
        this.txtFilter('notes').subscribe(_v => this.emit());
        // this.txtFilter('created_from').subscribe(_v => this.emit());
        // this.txtFilter('created_to').subscribe(_v => this.emit());

        this.filteredTags = this.form.get('tags').valueChanges.pipe(
            startWith(null),
            map((value: string | null) => value ? this._filterTags(value) : this.tags));

        this.filteredAuthors = this.form.get('authors').valueChanges.pipe(
            startWith(null),
            distinctUntilChanged(),
            map((value: string | null) => value && value.length > 2 ? this._filterAuthors(value) : []));

        this.filteredJournals = this.form.get('journal').valueChanges.pipe(
            startWith(null),
            distinctUntilChanged(),
            map((value: string | null) => value && value.length > 2 ? this._filterJournals(value) : []));
    }

    txtFilter(field: string): Observable<any> {
        return this.form.get(field).valueChanges.pipe(
            map(value => value ? value.trim() : null),
            filter(value => value ? value.length > 0 || value === '' : true),
            debounceTime(200),
            distinctUntilChanged(),
        );
    }

    emit() {
        let filters = this.form.value;
        filters.tags_array = this.tags_array;

        this.response.emit(filters);
    }

    addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value: string = event.value;

        // Add our tag
        if ((value || '').trim() && this.tags.includes(value))
            this.tags_array.push(value.trim());

        // Reset the input value
        if (input) input.value = '';

        this.form.patchValue({ tags: null });

        this.emit();
    }

    removeTag(tag: string): void {
        const index = this.tags_array.indexOf(tag);
        if (index >= 0) this.tags_array.splice(index, 1);

        this.emit();
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (this.tags.includes(event.option.viewValue))
            this.tags_array.push(event.option.viewValue.trim());
        this.tagInput.nativeElement.value = '';
        this.form.get('tags').setValue(null);

        this.emit();
    }

    private _filterTags(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.tags.filter(it => it.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterAuthors(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.authors.filter(it => it.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterJournals(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.journals.filter(it => it.toLowerCase().indexOf(filterValue) === 0);
    }

}
