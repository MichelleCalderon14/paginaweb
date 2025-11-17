// src/app/shared/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

// ===== Tipos de usuario/rol que llegan del backend =====
export type RolNombre = 'ADMIN' | 'DOCENTE' | 'ALUMNO';

export interface AuthRol {
  id_rol: number;
  nombre: RolNombre;
}

export interface AuthUser {
  id_usuario: number;
  username: string;
  email?: string;
  activo: boolean;
  rol: AuthRol;
}

// Respuesta del endpoint /api/auth/login
export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Con proxy de Angular apuntamos solo a /api
  private apiUrl = '/api/auth/login';

  private USER_KEY = 'app.auth.user';
  private TOKEN_KEY = 'app.auth.token';

  constructor(private http: HttpClient) {}

  // === LOGIN ===
  login(username: string, password: string): Observable<AuthUser> {
    const body = { username, password };

    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      tap(res => {
        // Guardar token y usuario completo
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
      }),
      map(res => res.user)
    );
  }

  // === LOGOUT ===
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // === Accessores de token/usuario ===
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  hasRole(rol: RolNombre): boolean {
    const u = this.getUser();
    return !!u && u.rol?.nombre === rol;
  }

  // ========= helpers de compatibilidad =========
  // Para el código que usa this.auth.currentUser
  get currentUser(): AuthUser | null {
    return this.getUser();
  }

  get currentRole(): RolNombre | null {
    const u = this.getUser();
    return u?.rol?.nombre ?? null;
  }

  get currentUsername(): string | null {
    const u = this.getUser();
    return u?.username ?? null;
  }
}
