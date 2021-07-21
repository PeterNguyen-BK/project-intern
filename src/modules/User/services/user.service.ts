import User, { IUser } from "../../../common/entity/user.entity";
import { Model, mongo } from "mongoose";
import { BaseRepository } from "../../../common/repository/base.repository";
import * as jwt from "jsonwebtoken";


export class UserService extends BaseRepository<IUser> {
    constructor(public readonly userRepository: Model<IUser>) {
        super(userRepository);
    }

    async createToken (obj: any): Promise<any> {
        const accessToken = jwt.sign(obj, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '30s'});
        const refreshToken = jwt.sign(obj, `${process.env.REFRESH_TOKEN_SECRET}`);
        return {accessToken: accessToken, refreshToken: refreshToken};
    }

    async getUsers(): Promise<any> {
        const data = await User.find();
        return {data: data}
    }

    async createID() {
        async function getRandomInt(max: number) {
            return Math.floor(Math.random() * max);
        }
        async function checkID(id: number){
            await User.findOne({idUser: id}, (err: any, doc: any) => {
                if (err) throw err;
                if (doc != null) {
                    return 1;
                }
            })
            return 0;
        }
        let id = await getRandomInt(1000000);
        let result = await checkID(id);
        while (result) {
            id = await getRandomInt(1000000);
            console.log(id);
            result = await checkID(id);
        }
        return id;
    }

    async createUser(data: any): Promise<any> {
        try {
            const newData = new User(data);
            let idUser = await this.createID();
            newData.idUser = idUser;
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