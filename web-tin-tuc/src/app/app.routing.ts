import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes, Router} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashBoardComponent } from './admin/dash-board/dash-board.component';
import { Role } from './_models/Role';
import { LoginComponent } from './login/login.component';

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
        data: {roles: [Role.admin]}
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(appRouter);
