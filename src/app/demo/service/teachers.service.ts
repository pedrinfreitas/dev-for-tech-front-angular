import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';
import { ITeachers, ITeachersApi, ITeachersAPIResponse } from '../components/teachers/teachers.model';

const API_URL = environment.gatewayUrl;

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    }),
};
@Injectable()
export class TeacherService {
    constructor(private http: HttpClient) {}


    getQtdeTeachers() {
        return this.http
            .get<ITeachersAPIResponse>(`${API_URL}/crud/professor`, httpOptions)
            .pipe(
                map((response) => response.page?.totalElements),
                catchError((error) => {
                    console.warn(error);
                    return of(0);
                })
            );
    }

    getTeachers() {
        return this.http
            .get<ITeachersAPIResponse>(`${API_URL}/crud/professor`, httpOptions)
            .pipe(
                map((response) => {
                    const format: ITeachers[] =
                        response._embedded.teacherDTOList.map((teacher) => ({
                            id: teacher.id?.toString(),
                            name: teacher.pessoa?.name,
                            phone: teacher.pessoa?.phoneNumber,
                            salary: teacher.salary?.toString(),
                            email: teacher.pessoa?.emailAddress,
                            street: teacher.pessoa?.addres?.street,
                            city: teacher.pessoa?.addres?.city,
                            country: teacher.pessoa?.addres?.country,
                            state: teacher.pessoa?.addres?.state,
                            cep: teacher.pessoa?.addres?.postalCode,
                            createUser: teacher.createUser
                        }));
                    return format;
                }),
                catchError((error) => {
                    console.warn(error);
                    return of([]);
                })
            );
    }

    createTeachers(teacher: ITeachers) {
        const teacherFormat: ITeachersApi = {
            salary: +(teacher.salary || 0),
            pessoa: {
                name: teacher.name,
                phoneNumber: teacher.phone?.replace(/\D/g, ''),
                emailAddress: teacher.email,
                addres: {
                    street: teacher.street,
                    city: teacher.city,
                    country: teacher.country,
                    postalCode: teacher.cep?.replace(/\D/g, ''),
                    state: teacher.state,
                },
            },
            createUser: teacher.createUser,
        };

        return this.http.post<ITeachersApi>(
            `${API_URL}/crud/professor`,
            teacherFormat,
            httpOptions
        );
    }

    deleteTeachers(id: number) {
        return this.http.delete(`${API_URL}/crud/professor/${id}`, httpOptions);
    }

    updateTeachers(teacher: ITeachers) {
        const teacherFormat: ITeachersApi = {
            id: +teacher.id!,
            salary: +(teacher.salary || 0),
            pessoa: {
                name: teacher.name,
                phoneNumber: teacher.phone?.replace(/\D/g, ''),
                emailAddress: teacher.email,
                addres: {
                    street: teacher.street,
                    city: teacher.city,
                    country: teacher.country,
                    postalCode: teacher.cep?.replace(/\D/g, ''),
                    state: teacher.state,
                },
            },
            createUser: teacher.createUser,
        };

        return this.http.put<ITeachersApi>(
            `${API_URL}/crud/professor/${teacherFormat.id}`,
            teacherFormat,
            httpOptions
        );
    }
}
