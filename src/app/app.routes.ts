// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { docenteGuard } from './shared/docente.guard';
import { alumnoGuard } from './shared/alumno.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // públicas
  {
    path: 'inicio',
    loadComponent: () =>
      import('./shared/inicio.component').then(m => m.InicioComponent)
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
    path: 'login',
    loadComponent: () =>
      import('./shared/login.component').then(m => m.LoginComponent)
  },

  // 🔹 NUEVA RUTA: CONTACTO (pública)
  {
    path: 'contacto',
    loadComponent: () =>
      import('./shared/contacto.component').then(m => m.ContactoComponent)
  },

  // 🔒 Panel Docente
  {
    path: 'panel-docente',
    canActivate: [docenteGuard],
    loadComponent: () =>
      import('./features/docentes/docente-home.page')
        .then(m => m.DocenteHomeComponent)
  },

  // 🔒 Crear alumno (desde docente)
  {
    path: 'docente/crear',
    canActivate: [docenteGuard],
    loadComponent: () =>
      import('./features/docentes/docente-crear.page')
        .then(m => m.DocenteCrearPage)
  },

  // 🔒 Alumnos del docente
  {
    path: 'docente/alumnos',
    canActivate: [docenteGuard],
    loadComponent: () =>
      import('./features/alumnos/docente-alumnos.page')
        .then(m => m.DocenteAlumnosPage)
  },

  // 🔒 Registro de calificaciones
  {
    path: 'docente/calificaciones',
    canActivate: [docenteGuard],
    loadComponent: () =>
      import('./features/docentes/docente-calificaciones.page')
        .then(m => m.DocenteCalificacionesPage)
  },

  // 🔒 Vista de notas del alumno
  {
    path: 'alumno/notas',
    canActivate: [alumnoGuard],
    loadComponent: () =>
      import('./features/alumnos/alumno-notas.page')
        .then(m => m.AlumnoNotasPage)
  },

  // Admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-home').then(m => m.AdminHomeComponent)
  },
  {
    path: 'admin/docentes/editar',
    loadComponent: () =>
      import('./features/docentes/admin-docentes-edit.page')
        .then(m => m.AdminDocentesEditPage)
  },
  {
    path: 'admin/docentes/crear',
    loadComponent: () =>
      import('./features/docentes/admin-docentes-create.page')
        .then(m => m.AdminDocentesCreatePage)
  },
  {
    path: 'admin/docentes/borrar',
    loadComponent: () =>
      import('./features/docentes/admin-docentes-delete.page')
        .then(m => m.AdminDocentesDeletePage)
  },
  {
    path: 'admin/noticias/editar',
    loadComponent: () =>
      import('./features/noticias/admin-noticias-edit.page')
        .then(m => m.AdminNoticiasEditPage)
  },
  {
    path: 'admin/noticias/crear',
    loadComponent: () =>
      import('./features/noticias/admin-noticias-create.page')
        .then(m => m.AdminNoticiasCreatePage)
  },
  {
    path: 'admin/noticias/borrar',
    loadComponent: () =>
      import('./features/noticias/admin-noticias-delete.page')
        .then(m => m.AdminNoticiasDeletePage)
  },

  // comodín
  { path: '**', redirectTo: 'inicio' }
];
