import { NgModule } from '@angular/core';
// import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { MenuItems } from './menu-items/menu-items';

@NgModule({
    // imports: [
    //     CommonModule,
    //     MaterialModule,
    //     FormsModule,
    //     FlexLayoutModule,
    //     ReactiveFormsModule,
    // ],
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        // InputComponent
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        // InputComponent
    ],
    providers: [
        MenuItems,
    ],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
