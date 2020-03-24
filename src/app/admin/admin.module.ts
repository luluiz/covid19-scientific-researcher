import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutes } from './admin.routing';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    declarations: [UploadComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ]
})
export class AdminModule { }
