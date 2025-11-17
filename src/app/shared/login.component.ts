// src/app/shared/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm mt-5">
        <div class="card-body">
          <h2 class="h4 mb-3 text-center">Iniciar Sesión</h2>

          <form (ngSubmit)="login()">
            <div class="mb-3">
              <label class="form-label">Usuario</label>
              <input [(ngModel)]="user" name="user" class="form-control" placeholder="Ingrese su usuario" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input [(ngModel)]="pass" name="pass" type="password" class="form-control" placeholder="Ingrese su contraseña" required>
            </div>

            <div class="d-grid mt-3">
              <button class="btn btn-primary" type="submit" [disabled]="loading">
                {{ loading ? 'Ingresando...' : 'Ingresar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `
})
export class LoginComponent {
  user = '';
  pass = '';
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    this.loading = true;

    this.auth.login(this.user, this.pass).subscribe({
      next: (u: AuthUser) => {
        this.loading = false;

        if (!u || !u.rol) {
          alert('Credenciales inválidas');
          return;
        }

        const rol = u.rol.nombre;
        console.log('Usuario logueado:', u.username, 'Rol:', rol);

        if (rol === 'ADMIN') {
          this.router.navigateByUrl('/admin', { replaceUrl: true });
        } else if (rol === 'DOCENTE') {
          this.router.navigateByUrl('/panel-docente', { replaceUrl: true });
        } else if (rol === 'ALUMNO') {
          this.router.navigateByUrl('/alumno/notas', { replaceUrl: true });
        } else {
          this.router.navigateByUrl('/inicio', { replaceUrl: true });
        }
      },
      error: err => {
        console.error(err);
        this.loading = false;
        alert('Error al iniciar sesión');
      }
    });
  }
}
