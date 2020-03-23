import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { DashboardsRoutes } from './dashboards.routing';
,

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ChartistModule,
        ChartsModule,
        NgApexchartsModule,
        SharedModule,
        PerfectScrollbarModule,
        RouterModule.forChild(DashboardsRoutes)
    ],
    declarations: [Dashboard1Component],
    providers: [
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: { suppressScrollX: false, wheelSpeed: 1, wheelPropagation: true, } },
    ]
})
export class DashboardsModule { }
