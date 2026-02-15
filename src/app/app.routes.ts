import { Routes } from '@angular/router';
import { HomePage } from './components/pages/home-page/home-page';
import { MenuPage } from './components/pages/menu-page/menu-page';
import { FormDishPage } from './components/pages/form-dish-page/form-dish-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { AuthGuard } from './guards/auth-guard';
import { ChefGuard } from './guards/chef-guard';

export const routes: Routes =  [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePage, title: 'Inicio' },
    { path: 'menu', component: MenuPage, title: 'Menú', canActivate: [AuthGuard]},
    { path: 'admin', component: FormDishPage, title: 'Admin', canActivate: [AuthGuard, ChefGuard]},
    { path: 'login', component: LoginPage, title: 'Inicio de sesión' },
];