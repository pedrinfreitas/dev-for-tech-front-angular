import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {IStudents, IStudentsAPIResponse} from './../components/students/students.model';

const API_URL = 'https://devfortech-school-crud.azuremicroservices.io';
// 'https://devfortech-school-authorization-service.azuremicroservices.io';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbeyJpZCI6MSwiZGVzY3JpcHRpb24iOiJBRE1JTiIsImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE2NjM4NTIzNTUsImV4cCI6MTY2MzkxMjgzNX0.4jF7ScxzNLQT5vXGrCnPZjOPJ8lXGiIlyRZadIrBv68',
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
                    const formatacao: IStudents[] =
                        response._embedded.studentDTOList.map((student) => ({
                            id: student.id?.toString(),
                            name: student.pessoa?.name,
                            phone: student.pessoa?.phoneNumber,
                            fees: student.fees,
                            email: student.pessoa?.emailAddress,
                            street: student.pessoa?.addres?.street,
                            city: student.pessoa?.addres?.city,
                            country: student.pessoa?.addres?.country,
                            state: student.pessoa?.addres?.state,
                            cep: student.pessoa?.addres?.postalCode,
                        }));
                    return formatacao;
                }),
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
