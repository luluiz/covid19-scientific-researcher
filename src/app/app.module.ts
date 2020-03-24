import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MaterialModule } from './material-module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { AboutComponent } from './about/about.component';
import { ArticlesTableComponent } from './search-articles/articles-table/articles-table.component';
import { FiltersComponent } from './search-articles/articles-table/filters/filters.component';
import { ModalAbstractComponent } from './search-articles/articles-table/modal-abstract/modal-abstract.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        NgMultiSelectDropDownModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        SpinnerComponent,
        AppBlankComponent,
        AppSidebarComponent,
        AppBreadcrumbComponent,
        SearchArticlesComponent,
        AboutComponent,
        ArticlesTableComponent,
        FiltersComponent,
        ModalAbstractComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
