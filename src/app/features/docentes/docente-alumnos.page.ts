// src/app/features/docentes/docente-alumnos.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DocenteService } from './docente.service';
import { AuthService } from '../../shared/auth.service';
import { Alumno } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-docente-alumnos',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 class="h4 mb-1">Mis alumnos</h2>
          <p class="mb-0 text-muted">
            Docente:
            <strong>{{ auth.currentUsername }}</strong>
          </p>
        </div>

        <a routerLink="/panel-docente" class="btn btn-outline-secondary btn-sm">
          ⬅ Volver al panel
        </a>
      </div>

      <div *ngIf="loading" class="alert alert-info">
        Cargando alumnos...
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error">
        <div *ngIf="alumnos.length === 0" class="alert alert-warning">
          No hay alumnos asignados a este docente.
        </div>

        <div *ngIf="alumnos.length > 0" class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-primary">
              <tr>
                <th>#</th>
                <th>Cédula</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha nacimiento</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of alumnos; let i = index">
                <td>{{ i + 1 }}</td>
                <td>{{ a.cedula }}</td>
                <td>{{ a.nombres }}</td>
                <td>{{ a.apellidos }}</td>
                <td>{{ a.fecha_nacimiento || '-' }}</td>
                <td>{{ a.email || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DocenteAlumnosPage implements OnInit {
  alumnos: Alumno[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private docenteService: DocenteService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.docenteService.misAlumnos().subscribe({
      next: data => {
        this.alumnos = data || [];
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de alumnos.';
        this.loading = false;
      }
    });
  }
}
