import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import orderRoute from "./routes/orderRoute.js"
import reviewRoute from "./routes/reviewRoute.js"
import messageRoute from "./routes/messageRoute.js"
import conversationRoute from "./routes/conversationRoute.js"
import gigRoute from './routes/gigRoute.js'
import authRoute from './routes/auth.routes.js'
import cookieParser from "cookie-parser"
import cors from "cors" 

dotenv.config()
const app = express()
mongoose.set("strictQuery", true);

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:'http://localhost:5173',credentials:true}))

app.use('/api/auths',authRoute)
app.use('/api/users',userRoute)
app.use('/api/gigs',gigRoute)
app.use('/api/orders',orderRoute)
app.use('/api/messages',messageRoute)
app.use('/api/reviews',reviewRoute)
app.use('/api/conversations',conversationRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'something went wrong'

    return res.status(errorStatus).send(errorMessage)
})

app.listen(process.env.PORT,()=>{
    console.log(`port ${process.env.PORT} started`)
    connect()
})
