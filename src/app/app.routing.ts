import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FullComponent } from './layouts/full/full.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';


export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                component: SearchArticlesComponent,
            },
            {
                path: 'search',
                component: SearchArticlesComponent,
            },
            {
                path: 'about',
                component: AboutComponent
            },
            // {
            //     path: 'admin',
            //     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
            //     canActivate: [AuthGuard],
            //     canLoad: [AuthGuard]
            // },
        ]
    },
];
