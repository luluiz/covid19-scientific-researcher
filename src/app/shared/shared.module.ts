import { NgModule } from '@angular/core';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { GridArticlesComponent } from './grid-articles/grid-articles.component';
import { MenuItems } from './menu-items/menu-items';
import { UtilsService } from './services/utils.service';

@NgModule({
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        GridArticlesComponent,
        PerfectScrollbarModule
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        GridArticlesComponent
    ],
    providers: [
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: false, wheelSpeed: 1, wheelPropagation: true } },
        MenuItems,
        UtilsService,
    ]
})
export class SharedModule { }
