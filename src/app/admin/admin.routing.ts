import { Routes } from "@angular/router";
import { UploadComponent } from "./upload/upload.component";

export const AdminRoutes: Routes = [
    {
        path: 'upload',
        component: UploadComponent,
        // canActivate: [FinanceiroGuard],
        // canLoad: [FinanceiroGuard]
    }
];