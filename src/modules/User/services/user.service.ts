import User, { IUser } from "../../../common/entity/user.entity";
import { Model, mongo } from "mongoose";
import { BaseRepository } from "../../../common/repository/base.repository";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export class UserService extends BaseRepository<IUser> {
    constructor(public readonly userRepository: Model<IUser>) {
        super(userRepository);
    }

    async createToken (data: any): Promise<any> {
        const user = await User.findOne({ username: data.username }).exec();
        if (user) {
            const match = await bcrypt.compare(data.password, user.password);
            if (match) {
                const payload = {
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    DOB: user.DOB
                }
                const accessToken = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '30s'});
                const refreshToken = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`);
                user.refresh_token = refreshToken;
                user.save();
                return {accessToken: accessToken, refreshToken: refreshToken};
            }
            else return null;
        }
        
    }

    async regenerateAccessToken(refreshToken: any): Promise<any> {
        const user = await User.findOne({ refresh_token: refreshToken }).exec();
        if (user) {
            const payload = {
                name: user.name,
                age: user.age,
                gender: user.gender,
                DOB: user.DOB
            }
            try {
                const user = await <any>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
                const accessToken = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '30s'});
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
            const user = await User.findOne({ username: data.username }).exec();
            if (user) throw new Error("Username has been already existed");
            const newData = new User(data);
            await newData.save();
            return {
                data: newData
            }
        } catch (error) {
            throw error;
        }
    }

    async searchUser(req: any): Promise<any> {
        
        User.schema.index({name : 'text'});

        // const filter_query : object= {$or: [
        //     {name: req.query.name},
        //     {location: (req.query.location)? req.query.location: undefined},
        //    ]
        // };
        const searchString={
            $text: {$search: req.query.name},
            location: (req.query.location)? req.query.location: undefined
          
        };
        let sort_query=[req.query.fieldSort,req.query.criteriaSort];
        
        console.log(sort_query);
        
        let perPage=16, Page;
        if (req.query.page) Page=Number(req.query.page); 
        else Page=1;
      
        const data = await User.find(searchString).sort([sort_query]).skip(perPage*(Page-1)).limit(perPage);
        return {data: data};
    }
}