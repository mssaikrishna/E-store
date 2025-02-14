import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  console.log('Loader Interceptor Triggered');
  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      console.log('Loader Interceptor Finalized');
      loaderService.hide();
    })
  );
};
