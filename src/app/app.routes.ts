import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then((m) => m.HomeComponent)
        },
    },
    {
        path: 'todos',
        loadComponent: () => {
            return import('./todo/todo.component').then((m) => m.TodoComponent)
        },
    }
];
