import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IStudents, IStudentsApi, IStudentsAPIResponse } from './../components/students/students.model';

const API_URL = 'https://devfortech-school-crud.azuremicroservices.io';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        // Authorization:
        //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbeyJpZCI6MSwiZGVzY3JpcHRpb24iOiJBRE1JTiIsImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE2NjM4NTIzNTUsImV4cCI6MTY2MzkxMjgzNX0.4jF7ScxzNLQT5vXGrCnPZjOPJ8lXGiIlyRZadIrBv68',
        // 'Access-Control-Allow-Headers':
        //     'Origin, Content-Type, X-Auth-Token, content-type',
    }),
};
@Injectable()
export class StudentService {
    constructor(private http: HttpClient) {}

    getStudents() {
        return this.http
            .get<IStudentsAPIResponse>(`${API_URL}/crud/aluno`, httpOptions)
            .pipe(
                map((response) => {
                    const format: IStudents[] =
                        response._embedded.studentDTOList.map((student) => ({
                            id: student.id?.toString(),
                            name: student.pessoa?.name,
                            phone: student.pessoa?.phoneNumber,
                            fees: student.fees?.toString(),
                            email: student.pessoa?.emailAddress,
                            street: student.pessoa?.addres?.street,
                            city: student.pessoa?.addres?.city,
                            country: student.pessoa?.addres?.country,
                            state: student.pessoa?.addres?.state,
                            cep: student.pessoa?.addres?.postalCode,
                        }));
                    return format;
                }),
                catchError((error) => {
                    console.warn(error);
                    return of([]);
                })
            );
    }

    createStudents(student: IStudents) {
        const studentFormat: IStudentsApi = {
            fees: +(student.fees || 0),
            pessoa: {
                name: student.name,
                phoneNumber: student.phone?.replace(/\D/g, ''),
                emailAddress: student.email,
                addres: {
                    street: student.street,
                    city: student.city,
                    country: student.country,
                    postalCode: student.cep?.replace(/\D/g, ''),
                    state: student.state,
                },
            },
            createUser: student.createUser || false,
        };

        return this.http.post<IStudentsApi>(
            `${API_URL}/crud/aluno`,
            studentFormat,
            httpOptions
        );
        // .pipe(
        //     catchError((error) => {
        //         console.warn(error);
        //         return of([]);
        //     })
        // );
    }

    deleteStudents(id: number) {
        return this.http.delete(`${API_URL}/crud/aluno/${id}`, httpOptions);
        // .pipe(
        //     catchError((error) => {
        //         console.warn(error);
        //         return of([]);
        //     })
        // );
    }

    updateStudents(student: IStudents) {
        const studentFormat: IStudentsApi = {
            id: +student.id!,
            fees: +(student.fees || 0),
            pessoa: {
                name: student.name,
                phoneNumber: student.phone?.replace(/\D/g, ''),
                emailAddress: student.email,
                addres: {
                    street: student.street,
                    city: student.city,
                    country: student.country,
                    postalCode: student.cep?.replace(/\D/g, ''),
                    state: student.state,
                },
            },
            createUser: student.createUser || false,
        };

        return this.http.put<IStudentsApi>(
            `${API_URL}/crud/aluno/${studentFormat.id}`,
            studentFormat,
            httpOptions
        );
        // .pipe(
        //     catchError((error) => {
        //         console.warn(error);
        //         return of([]);
        //     })
        // );
    }
}
