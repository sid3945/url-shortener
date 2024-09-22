import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import {connectRedis} from "./config/redis.js";
import urlRoutes from "./routes/url.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import {isAuthenticated} from "./middlewares/auth.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRoutes);
app.use("/urls",isAuthenticated, urlRoutes);

connectDB();
connectRedis();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});