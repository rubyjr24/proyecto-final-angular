import { Routes } from '@angular/router';
import { HomePage } from './components/pages/home-page/home-page';
import { MenuPage } from './components/pages/menu-page/menu-page';
import { FormDishPage } from './components/pages/form-dish-page/form-dish-page';
import { LoginPage } from './components/pages/login-page/login-page';

export const routes: Routes =  [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePage, title: 'Inicio' },
    { path: 'menu', component: MenuPage, title: 'Menú' },
    { path: 'admin', component: FormDishPage, title: 'Formulario de creación' },
    { path: 'login', component: LoginPage, title: 'Inicio de sesión' },
];