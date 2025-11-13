// src/app/admin/admin-home.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-home',
  imports: [RouterLink],
  template: `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="h4 mb-0">Panel de Administración</h2>

    <button class="btn btn-outline-danger btn-sm" (click)="logout()">
      Cerrar sesión
    </button>
  </div>

  <div class="row g-3">

    <!-- Bloque de Docentes -->
    <div class="col-md-6 col-lg-3">
      <div class="card shadow-sm h-100">
        <div class="card-body d-grid">
          <h5 class="card-title">Docentes</h5>
          <a class="btn btn-primary mb-2" routerLink="/admin/docentes/editar">Editar docentes</a>
          <a class="btn btn-outline-primary mb-2" routerLink="/admin/docentes/crear">Crear docente</a>
          <a class="btn btn-outline-danger" routerLink="/admin/docentes/borrar">Borrar docentes</a>
        </div>
      </div>
    </div>

    <!-- Bloque de Noticias -->
    <div class="col-md-6 col-lg-3">
      <div class="card shadow-sm h-100">
        <div class="card-body d-grid">
          <h5 class="card-title">Noticias</h5>
          <a class="btn btn-primary mb-2" routerLink="/admin/noticias/editar">Editar noticias</a>
          <a class="btn btn-outline-primary mb-2" routerLink="/admin/noticias/crear">Crear noticia</a>
          <a class="btn btn-outline-danger" routerLink="/admin/noticias/borrar">Borrar noticias</a>
        </div>
      </div>
    </div>

  </div>
  `
})
export class AdminHomeComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
