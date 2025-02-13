import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'shop',
    loadChildren: () => import('./shop.module').then(m => m.ShopModule),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
