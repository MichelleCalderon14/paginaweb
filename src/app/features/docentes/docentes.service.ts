// src/app/features/docentes/docentes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  DocentePerfil,
  FormacionAcademica,
  ExperienciaProfesional,
  Reconocimiento
} from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class DocentesService {

  private base = `${environment.apiBase}/docentes`;

  constructor(private http: HttpClient) {}

  // ======== PÚBLICO (lista, detalle) ========

  listar(): Observable<DocentePerfil[]> {
    return this.http.get<DocentePerfil[]>(this.base);
  }

  obtenerPorId(id: number): Observable<DocentePerfil> {
    return this.http.get<DocentePerfil>(`${this.base}/${id}`);
  }

  formaciones(idDocente: number): Observable<FormacionAcademica[]> {
    return this.http.get<FormacionAcademica[]>(
      `${this.base}/${idDocente}/formaciones`
    );
  }

  experiencias(idDocente: number): Observable<ExperienciaProfesional[]> {
    return this.http.get<ExperienciaProfesional[]>(
      `${this.base}/${idDocente}/experiencias`
    );
  }

  reconocimientos(idDocente: number): Observable<Reconocimiento[]> {
    return this.http.get<Reconocimiento[]>(
      `${this.base}/${idDocente}/reconocimientos`
    );
  }

  // ======== ADMIN (si lo usas) ========

  create(payload: Partial<DocentePerfil>): Observable<DocentePerfil> {
    return this.http.post<DocentePerfil>(this.base, payload);
  }

  update(id: number, payload: Partial<DocentePerfil>): Observable<DocentePerfil> {
    return this.http.put<DocentePerfil>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  addFormacion(idDocente: number, dto: Partial<FormacionAcademica>):
    Observable<FormacionAcademica> {
    return this.http.post<FormacionAcademica>(
      `${this.base}/${idDocente}/formaciones`,
      dto
    );
  }

  deleteFormacion(idFormacion: number): Observable<void> {
    // ajusta la URL a tu backend si es distinta
    return this.http.delete<void>(
      `${environment.apiBase}/docentes-formaciones/${idFormacion}`
    );
  }

  addExperiencia(idDocente: number, dto: Partial<ExperienciaProfesional>):
    Observable<ExperienciaProfesional> {
    return this.http.post<ExperienciaProfesional>(
      `${this.base}/${idDocente}/experiencias`,
      dto
    );
  }

  deleteExperiencia(idExperiencia: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBase}/docentes-experiencias/${idExperiencia}`
    );
  }

  addReconocimiento(idDocente: number, dto: Partial<Reconocimiento>):
    Observable<Reconocimiento> {
    return this.http.post<Reconocimiento>(
      `${this.base}/${idDocente}/reconocimientos`,
      dto
    );
  }

  deleteReconocimiento(idReconocimiento: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBase}/docentes-reconocimientos/${idReconocimiento}`
    );
  }
}
