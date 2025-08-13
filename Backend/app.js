import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import paperRoutes from "./routes/paperRoute.js"
import authRoutes from "./routes/authRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import userRoutes from "./routes/userRoute.js"
import homeRoutes from  "./routes/home.js"
const app  = express();

// Configure CORS with specific options
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connected to MONGODB')})
.catch((err)=>{console.log("Error connceting to MONGODB" , err)})

app.use("/api/auth",authRoutes)
app.use("/api/papers",paperRoutes)
app.use("/api/admin",adminRoutes);
app.use("/api/users",userRoutes)
app.use("/api/home",homeRoutes)
app.use("/api/admin",adminRoutes)

app.get("/",(req,res)=>{
    res.json({message : "Pariksha api working"})
})

const PORT = process.env.PORT || 8000
app.listen(PORT , ()=>{
    console.log(`Listening on the port ${PORT} `)
})