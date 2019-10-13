import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * An interface that must implement every component that can be asked to check if it can be
 * deactivated due to a route navigation.
 */
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | boolean;
}

/**
 * Guards routes from being deactivated without warning the user.
 * It is an asynchronous guard that asks the user before deactivating the route.
 * Returns an Observable<boolean> or boolean to indicate if the route can be deactivated or not.
 */

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | boolean {
    return component.canDeactivate();
  }
}
