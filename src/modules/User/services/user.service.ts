import User, { IUser } from "../../../common/entity/user.entity";
import { Model, mongo } from "mongoose";
import { BaseRepository } from "../../../common/repository/base.repository";
import * as jwt from "jsonwebtoken";


export class UserService extends BaseRepository<IUser> {
    constructor(public readonly userRepository: Model<IUser>) {
        super(userRepository);
    }

    async createToken (data: any): Promise<any> {
        const user = await User.findOne({ username: data.username }).exec();
        if (user) {
            if (user.password == data.password) {
                const accessToken = jwt.sign(data, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '30s'});
                const refreshToken = jwt.sign(data, `${process.env.REFRESH_TOKEN_SECRET}`);
                user.refresh_token = refreshToken;
                user.save();
                return {accessToken: accessToken, refreshToken: refreshToken};
            }
            else return null;
        }
        
    }

    async regenerateAccessToken(refreshToken: any): Promise<any> {
        const isExist = await User.findOne({ refresh_token: refreshToken }).exec();
        console.log(isExist);
        if (isExist) {
            try {
                const user = await <any>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
                const accessToken = jwt.sign({username: user.username, password: user.password}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '30s'});
                return {accessToken: accessToken};
            }
            catch(err) {
                throw err;
            }
        } else return null;
    }

    async getUsers(): Promise<any> {
        const data = await User.find();
        return {data: data}
    }

    async createUser(data: any): Promise<any> {
        try {
            const newData = new User(data);
            await newData.save();
            return {
                data: newData
            }
        } catch (error) {
            throw error;
        }
    }

    async updateUser(data: any, filter: any): Promise<any> {
        try {
            const result = User.updateOne(filter, data);
            return {
                code : result
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(filter: any): Promise<any> {
        try {
            const result = User.deleteOne(filter);
            return {
                code : result
            }
        } catch (error) {
            throw error;
        }
    }

    async searchUser(req: any): Promise<any> {
        
        User.schema.index({name : 'text'});
        const filter_query : object= {$or: [
            {name: req.query.name},
            {location: (req.query.location)? req.query.location: undefined},
           ]
        };
     
        let sort_query=[];
        sort_query.push(req.query.fieldSort);
        sort_query.push(req.query.criteriaSort);
        
        console.log(sort_query);
        
        let perPage=16, Page;
        if (req.query.page) Page=Number(req.query.page); 
        else Page=1;
      
        const data = await User.find(filter_query).sort([sort_query]).skip(perPage*(Page-1)).limit(perPage);
        return {data: data};
    }
}