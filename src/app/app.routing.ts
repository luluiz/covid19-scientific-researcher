import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';


export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboards/dashboard1',
                pathMatch: 'full'
            },
            {
                path: 'dashboards',
                loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
            },
        ]
    },
    // {
    //     path: '',
    //     component: AppBlankComponent,
    //     children: [
    //         {
    //             path: 'authentication',
    //             loadChildren:
    //                 () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    //         }
    //     ]
    // },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
