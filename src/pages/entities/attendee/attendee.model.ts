import { BaseEntity } from './../../../models';

export class Attendee implements BaseEntity {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
    ) {
    }
}
