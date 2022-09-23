import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {AuthService} from './auth/auth.service';

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
}
