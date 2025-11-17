// src/app/shared/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const ok = auth.hasRole('ADMIN');
  if (!ok) {
    router.navigate(['/login']);
  }
  return ok;
};
