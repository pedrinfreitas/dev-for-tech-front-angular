import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface IAddress {
    cep?: string;
    logradouro?: string;
    complemento?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
}

@Injectable()
export class AddressService {
    constructor(private http: HttpClient) {}

    buscarPorCep(cep: string): Observable<IAddress> {
        return this.http
            .get<IAddress>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(
                catchError((error) => {
                    console.warn(error);
                    return of({});
                })
            );
    }
}
