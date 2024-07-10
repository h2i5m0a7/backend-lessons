import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: './env'
})



connectDB() // connectDB function is an asynchornous function that always return a promise . if promise is returend we can use .then and .catch
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED ",err);
})