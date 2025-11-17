// src/app/features/docentes/docente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alumno } from '../../shared/models';
import { AuthService } from '../../shared/auth.service';

@Injectable({ providedIn: 'root' })
export class DocenteService {

  private base = `${environment.apiBase}/docentes`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /**
   * Devuelve los alumnos del docente que está logueado.
   * Por ahora usamos un id_docente fijo (5) para Domenica.
   */
  misAlumnos(): Observable<Alumno[]> {
    const user = this.auth.currentUser;
    console.log('[DocenteService] currentUser =', user);

    if (!user) {
      throw new Error('No hay usuario en sesión');
    }

    // 🔹 Id del docente Domenica (id_docente = 5)
    const idDocente = 5;

    // Este endpoint es el mismo que probaste en Postman:
    //   GET /api/docentes/5/alumnos
    return this.http.get<Alumno[]>(`${this.base}/${idDocente}/alumnos`);
  }



}
