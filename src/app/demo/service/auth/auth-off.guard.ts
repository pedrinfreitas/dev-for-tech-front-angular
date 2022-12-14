import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthOffGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (!this.authService.isLogged()) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }
}
