import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IStudents, IStudentsAPI } from './../components/students/students.model';

@Injectable()
export class StudentService {
    constructor(private http: HttpClient) {}

    getStudents() {
        return this.http
            .get<IStudentsAPI>('assets/demo/data/students.json')
            .pipe(
                map((e) => e.data),
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
