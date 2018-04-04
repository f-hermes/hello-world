import { BaseEntity } from './../../../models';

export class Trainingday implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public date?: any,
    ) {
    }
}
