import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { UserRoute } from "./modules/User/routes/user.route";
import User from "./common/entity/user.entity";

async function run () {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: false
        });
        
    
        const app: Application = express();
    
        const userRoute: UserRoute = new UserRoute();
        
    
        userRoute.routes(app);
        // app.get('/', async (req: Request, res: Response) => {
        //     const result = await User.find();
        //     res.send(result);
        // })
    
        app.listen(`${process.env.PORT}`, (): void => {
            console.log("Server is running at http://localhost:5000");
        });
    }
    
    catch(error) {
        throw error;
    }
}

run();
