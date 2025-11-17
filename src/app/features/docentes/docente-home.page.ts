// src/app/features/docentes/docente-home.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  standalone: true,
  selector: 'app-docente-home',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <h2 class="h4 mb-3">
        Panel docente
      </h2>
      <p class="mb-4">
        Docente: <strong>{{ auth.currentUsername }}</strong>
      </p>

      <div class="row g-3">
        <!-- Tarjeta: mis alumnos -->
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Mis alumnos</h5>
              <p class="card-text flex-grow-1">
                Ver la lista de alumnos inscritos con este docente.
              </p>
              <a
                routerLink="/panel-docente/alumnos"
                class="btn btn-outline-primary mt-2"
              >
                Ver alumnos
              </a>
            </div>
          </div>
        </div>

        <!-- Tarjeta: registrar calificaciones -->
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Registrar calificaciones</h5>
              <p class="card-text flex-grow-1">
                Ingresar o actualizar notas de los alumnos.
              </p>
              <button class="btn btn-outline-success mt-2" disabled>
                Registrar notas
              </button>
            </div>
          </div>
        </div>

        <!-- Tarjeta: resumen de notas -->
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Resumen de notas</h5>
              <p class="card-text flex-grow-1">
                Ver el resumen de calificaciones por curso.
              </p>
              <button class="btn btn-outline-secondary mt-2" disabled>
                Ver resumen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DocenteHomeComponent {
  constructor(public auth: AuthService) {}
}
