import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IStudents, IStudentsAPI } from './../components/students/students.model';

const API_URL = 'https://devfortech-school-crud.azuremicroservices.io';
// 'https://devfortech-school-authorization-service.azuremicroservices.io';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        // 'Access-Control-Allow-Headers':
        //     'Origin, Content-Type, X-Auth-Token, content-type',
    }),
};
@Injectable()
export class StudentService {
    constructor(private http: HttpClient) {}

    getStudents() {
        return this.http
            .get<IStudentsAPI>(`${API_URL}/crud/aluno`)
            .pipe(
                map((response) => {
                    console.log(response);

                    return response.data}),
                catchError((error) => {
                    console.warn(error);
                    return of([]);
                })
            );
    }

    createStudents(students: IStudents) {
        return this.http
            .post<IStudents>('assets/demo/data/students.json', {
                body: students,
            })
            .pipe(
                catchError((error) => {
                    console.warn(error);
                    return of([]);
                })
            );
    }
}
