import { Routes } from '@angular/router';
import { Dashboard1Component } from './dashboard1/dashboard1.component';


export const DashboardsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: Dashboard1Component,
                data: {
                    title: 'Dashboard 2',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Dashboard 2' }
                    ]
                }
            },
            // {
            //     path: 'dashboard2',
            //     component: Dashboard2Component,
            //     data: {
            //         title: 'Dashboard 2',
            //         urls: [
            //             { title: 'Dashboard', url: '/dashboard' },
            //             { title: 'Dashboard 2' }
            //         ]
            //     }
            // }
        ]
    }
];
