import { Model } from "mongoose";

export abstract class BaseRepository<T> {
    private entity: Model<T>;

    constructor(entity: Model<T>) {
        this.entity = entity;
    }

    public async create(data: T | any): Promise<T | object> {
        try {
            const newData = new this.entity (data);
            await newData.save();
            return {
                data: newData
            }
        } catch (error) {
            throw error;
        }
    }

    public async update(data: T | any, filter: object): Promise <T | object> {
        try {
            const result = this.entity.updateOne(filter, data);
            return {
                code : result
            }
        } catch (error) {
            throw error;
        }
    }

    public async delete(filter: object): Promise <T | object> {
        try {
            const result = this.entity.deleteOne(filter);
            return {
                code : result
            }
        } catch (error) {
            throw error;
        }
    }
}