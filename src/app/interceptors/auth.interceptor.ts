import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Clone the request and add auth header if user is logged in
  if (authService.isLoggedIn()) {
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${authService.getToken()}`
      ),
    });

    console.log('Interceptor: Request with Auth Header:', authReq);

    return next(authReq).pipe(
      catchError((error) => {
        // Handle 401 Unauthorized
        if (error.status === 401) {
          authService.logout();
          alert("Invalid")
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
  console.log('Interceptor: Sending request without Auth Header:', req);
  return next(req);
};
