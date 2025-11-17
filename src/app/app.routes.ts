// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { docenteGuard } from './shared/docente.guard';
import { alumnoGuard } from './shared/alumno.guard';
import { adminGuard } from './shared/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // ===== RUTAS PÚBLICAS =====
  {
    path: 'inicio',
    loadComponent: () =>
      import('./shared/inicio.component')
        .then(m => m.InicioComponent)
  },
  {
    path: 'docentes',
    loadComponent: () =>
      import('./features/docentes/docentes-list.component')
        .then(m => m.DocentesListComponent)
  },
  {
    path: 'docentes/:id',
    loadComponent: () =>
      import('./features/docentes/docente-detail.component')
        .then(m => m.DocenteDetailComponent)
  },
  {
    path: 'noticias',
    loadComponent: () =>
      import('./features/noticias/noticias-list.component')
        .then(m => m.NoticiasListComponent)
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./shared/contacto.component')
        .then(m => m.ContactoComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/login.component')
        .then(m => m.LoginComponent)
  },

  // ===== PANEL DOCENTE - LISTA DE ALUMNOS =====
  {
    path: 'panel-docente/alumnos',
    canActivate: [docenteGuard],
    loadComponent: () =>
      import('./features/docentes/docente-alumnos.page')
        .then(m => m.DocenteAlumnosPage)
  },

  // ===== PANEL DOCENTE (home) =====
  {
    path: 'panel-docente',
    canActivate: [docenteGuard],
    loadComponent: () =>
      import('./features/docentes/docente-home.page')
        .then(m => m.DocenteHomeComponent)
  },

  // ===== PANEL ALUMNO (notas) =====
  {
    path: 'alumno',
    canActivate: [alumnoGuard],
    children: [
      {
        path: 'notas',
        loadComponent: () =>
          import('./features/alumnos/alumno-notas.page')
            .then(m => m.AlumnoNotasPage)
      },
      { path: '', redirectTo: 'notas', pathMatch: 'full' }
    ]
  },

  // ===== PANEL ADMIN =====
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./admin/admin-home')
        .then(m => m.AdminHomeComponent)
  },

  // ===== CUALQUIER OTRA COSA =====
  { path: '**', redirectTo: 'inicio' }
];
