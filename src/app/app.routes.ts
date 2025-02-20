import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'shop',
    loadChildren: () => import('./shop.module').then(m => m.ShopModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard, RoleGuard], // Restrict access to admins
    data: { role: 'admin' }, // Specify the required role
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
