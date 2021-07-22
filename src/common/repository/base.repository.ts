import { Model } from "mongoose";

export abstract class BaseRepository<T> {
    private entity: Model<T>;

    constructor(entity: Model<T>) {
        this.entity = entity;
    }

    public async getAllUsers(): Promise<T | object> {
        try {
            const users = await this.entity.find().exec();
            return {data: users};
        } catch(error) {
            throw error;
        }
    }

    public async getUser(filter: object): Promise<T | object> {
        try {
            const user = await this.entity.findOne(filter).exec();
            return {data: user};
        } catch(error) {
            throw error;
        }
    }

    public async create(data: any): Promise<T | object> {
        try {
            const newData = new this.entity(data);
            await newData.save();
            return {
                data: newData
            }
        } catch (error) {
            throw error;
        }
    }

    public async update(data: any, filter: object): Promise <T | object> {
        try {
            const result = this.entity.updateOne(filter, data);
            return {
                code : result
            }
        } catch (error) {
            throw error;
        }
    }

    public async delete(filter: object): Promise <any> {
        try {
            const user = await <any>this.entity.findOne(filter).exec();
            user.isDelete = true;
            await user.save();
            return true;
        } catch (error) {
            throw error;
        }
    }
}