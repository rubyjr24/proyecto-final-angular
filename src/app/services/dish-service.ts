import { Injectable } from '@angular/core';
import { IDish } from '../interfaces/i-dish';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DishService {

    private endpoint = "http://localhost:3000/dishes";

    constructor(private http: HttpClient) { }

    getDishes(): Observable<IDish[]> {
        return this.http.get<IDish[]>(this.endpoint);
    }

    addDish(dish: IDish): Observable<IDish> {
        return this.http
            .post<IDish>(this.endpoint, dish)
            .pipe(
                catchError((resp: HttpErrorResponse) =>
                    throwError(
                        () =>
                            new Error(
                                `Error crear el plato. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`,
                            ),
                    ),
                ),
            );
    }

    editDish(dish: IDish): Observable<IDish> {
        return this.http
            .put<IDish>(this.endpoint + `/${dish.id}`, dish)
            .pipe(
                catchError((resp: HttpErrorResponse) =>
                    throwError(
                        () =>
                            new Error(
                                `Error crear el plato. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`,
                            ),
                    ),
                ),
            );
    }

    deleteDish(id: string): Observable<IDish> {
        return this.http.delete<IDish>(`${this.endpoint}/${id}`);
    }

}
