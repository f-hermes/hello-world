import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Attendee } from './attendee.model';

@Injectable()
export class AttendeeService {
    private resourceUrl = Api.API_URL + '/attendees';

    constructor(private http: HttpClient) { }

    create(attendee: Attendee): Observable<Attendee> {
        return this.http.post(this.resourceUrl, attendee);
    }

    update(attendee: Attendee): Observable<Attendee> {
        return this.http.put(this.resourceUrl, attendee);
    }

    find(id: number): Observable<Attendee> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
