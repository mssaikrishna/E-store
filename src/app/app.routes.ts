import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () => import('./shop.module').then(m => m.ShopModule)
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
