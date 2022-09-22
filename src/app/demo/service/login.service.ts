import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';

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
export class LoginService {
    constructor(private http: HttpClient, private auth: AuthService) {}

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
                    console.log(response);

                    this.auth.setToken(response.accessToken);
                    return response;
                })
                //catchError((err) => of([]))
            );

        // if (email && password) {
        //     return of({
        //         usuario: {
        //             nome: 'Pedro',
        //             sobrenome: 'Freitas',
        //             email: 'pedrinfreitas@gmail.com',
        //         },
        //         token: 'a1s2d3f4g5h6j76k8l9p0',
        //     }).pipe(
        //         delay(2000),
        //         tap((response) => {
        //             this.auth.setUsuario(response.usuario);
        //             this.auth.setToken(response.token);
        //         })
        //     );
        // }

        // return timer(2000).pipe(
        //     mergeMap(() => throwError('Usuario ou senha incorretos.'))
        // );
    }
}
