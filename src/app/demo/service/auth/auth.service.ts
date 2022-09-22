import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { map, tap } from 'rxjs/operators';

import { ILoginResponse } from './../../models/login.model';

const API_URL =
    'https://devfortech-school-authorization-service.azuremicroservices.io';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        'Access-Control-Allow-Headers':
            'Origin, Content-Type, X-Auth-Token, content-type',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user?: string;
    token?: string;

    // userSubject = new Subject<ILoginResponse>();

    constructor(private http: HttpClient, private router: Router) {
        this.hasToken() && this.decodeAdnNotify();
    }

    authenticate(
        username: string,
        password: string
    ) /*: Observable<ILoginResponse>*/ {
        return this.http
            .post<any>(
                `${API_URL}/auth/login`,
                { username, password },
                httpOptions
            )
            .pipe(
                tap((result) => console.log('result-->', result)),
                map((response) => {
                    this.setToken(response.accessToken);
                    return response;
                })
                //catchError((err) => of([]))
            );
    }

    // getUser() {
    //     return this.userSubject.asObservable();
    // }
    getUser() {
        if (this.user) {
            return this.user;
        }

        const userExists = localStorage.getItem('user');

        if (userExists) {
            this.user = userExists;
            return this.user;
        }
        return null;
    }

    setUser(user: string) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUsuario() {
        if (this.user) {
            return this.user;
        }

        const userLocalStorage = localStorage.getItem('user');

        if (userLocalStorage) {
            this.user = JSON.parse(userLocalStorage);
            return this.user;
        }
        return null;
    }

    hasToken() {
        return !!this.getToken();
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
        this.decodeAdnNotify();
    }

    getToken() {
        if (this.token) {
            return this.token;
        }

        const tokenExists = localStorage.getItem('token');

        if (tokenExists) {
            this.token = tokenExists;
            return this.token;
        }
        return null;
    }

    removeToken(): void {
        if (this.token) {
            localStorage.removeItem('token');
        }
    }

    decodeAdnNotify() {
        const user: ILoginResponse = jwt_decode(this.token || '');
        this.setUser(user.sub);

        // this.userSubject.next(user);
    }

    isLogged(): boolean {
        // return !!(this.getUsuario() && this.getToken());
        return this.hasToken();
    }

    logout() {
        this.user = undefined;
        this.token = undefined;
        localStorage.clear();
        this.router.navigate(['auth/login']);
    }
}
