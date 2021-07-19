import { Model } from "mongoose";

export abstract class BaseRepository<T> {
    private entity: Model<T>;

    constructor(entity: Model<T>) {
        this.entity = entity;
    }
}