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

    public async update(data: any, filter: any): Promise <T | object> {
        try {
            const result = await <any>this.entity.updateOne(filter, data);
            if (result.n != 0){
                return {
                    code : 200
                }
            }
            else {
                return {
                    code: 400
                }
            }
        } catch (error) {
            throw error;
        }
    }

    public async delete(filter: any): Promise <any> {
        try {
            const result = await <any>this.entity.findOne(filter).exec();
            result.isDelete = true;
            await result.save();
            return true;
        } catch (error) {
            throw error;
        }
    }
}