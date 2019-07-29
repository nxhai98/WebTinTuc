import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/Role';
import { LoginComponent } from './login/login.component';
import { NewContentComponent } from './new-content/new-content.component';
import { ListNewsViaCatalogComponent } from './list-news-via-catalog/list-news-via-catalog.component';

const appRouter: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(add => add.AdminModule),
        canActivate: [AuthGuard],
        data: {roles: [Role.admin]},
        //outlet: 'root',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'news/:id/content',
        component: NewContentComponent,
    },
    {
        path: 'news/catalog/:catalogId',
        component: ListNewsViaCatalogComponent,
    }
    ,
    {
        path: '**',
        redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(appRouter);
