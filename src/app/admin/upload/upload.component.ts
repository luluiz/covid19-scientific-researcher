import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ArticlesService } from '../../shared/services/articles.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean;

    constructor(
        private fb: FormBuilder,
        private articleService: ArticlesService
    ) { }

    ngOnInit(): void {
        this.initForms();
    }

    initForms() {
        this.form = this.fb.group({
            file: [null, Validators.required],
            description: [{ value: null, disabled: true }],
            size: [{ value: null, disabled: true }],
        });
    }

    upload() {
        this.loading = true;
        this.articleService.uploadCSV(this.form.get('file').value)
            .pipe(take(1))
            .subscribe(response => {
                if (response.success) {
                    window.alert(response.message);
                    this.form.reset();
                } else {
                    window.alert(response.message);
                }
            }, null, () => this.loading = false);
    }

    setFile(_file: any) {
        console.log('files', _file.files[0])
        let file = _file.files[0];
        this.form.patchValue({ file: file, description: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
    }

}
