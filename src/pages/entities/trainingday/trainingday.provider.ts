import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Trainingday } from './trainingday.model';

@Injectable()
export class TrainingdayService {
    private resourceUrl = Api.API_URL + '/trainingdays';

    constructor(private http: HttpClient) { }

    create(trainingday: Trainingday): Observable<Trainingday> {
        return this.http.post(this.resourceUrl, trainingday);
    }

    update(trainingday: Trainingday): Observable<Trainingday> {
        return this.http.put(this.resourceUrl, trainingday);
    }

    find(id: number): Observable<Trainingday> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
