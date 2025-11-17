// src/app/admin/admin-home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-home',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container mt-4">
    <h2 class="h4 mb-2">Panel de administración</h2>
    <p class="text-muted mb-4">
      Desde aquí puedes gestionar docentes y noticias del colegio.
    </p>

    <div class="row g-3">
      <div class="col-md-4" *ngFor="let card of cards">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text small mb-3">{{ card.text }}</p>
            <a class="btn btn-primary mt-auto" [routerLink]="card.link">
              {{ card.button }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class AdminHomeComponent {
  cards = [
    {
      title: 'Crear docente',
      text: 'Registrar un nuevo docente en el sistema.',
      button: 'Crear docente',
      link: '/admin/docentes/crear',
    },
    {
      title: 'Editar docentes',
      text: 'Actualizar datos de docentes existentes.',
      button: 'Editar docentes',
      link: '/admin/docentes/editar',
    },
    {
      title: 'Eliminar docentes',
      text: 'Dar de baja docentes.',
      button: 'Eliminar docentes',
      link: '/admin/docentes/borrar',
    },
    {
      title: 'Crear noticia',
      text: 'Publicar una nueva noticia.',
      button: 'Crear noticia',
      link: '/admin/noticias/crear',
    },
    {
      title: 'Editar noticias',
      text: 'Modificar noticias publicadas.',
      button: 'Editar noticias',
      link: '/admin/noticias/editar',
    },
    {
      title: 'Eliminar noticias',
      text: 'Quitar noticias que ya no aplican.',
      button: 'Eliminar noticias',
      link: '/admin/noticias/borrar',
    },
  ];
}
