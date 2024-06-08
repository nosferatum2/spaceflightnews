import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SpaceFlightNewsApiService } from '@shared/services/space-flight-news-api/space-flight-news-api.service';

export const dataResolver: ResolveFn<any> = <T>(route: ActivatedRouteSnapshot): MaybeAsync<T | RedirectCommand> => {
  return inject(SpaceFlightNewsApiService).getItemById<T>(route.params['id']);
};
