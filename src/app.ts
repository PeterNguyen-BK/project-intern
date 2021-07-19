import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";

try {
    mongoose.connect(`${process.env.MONGO_URL}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: false
    });

    const app = express();

    // app.use('/v1/users', )

    app.listen(`${process.env.PORT}`, (): void => {
        console.log("Server is running at http://localhost:5000");
    });
}

catch(error) {
    throw error;
}