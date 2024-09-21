import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./connection.js";
import urlRoutes from "./routes/url.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/", urlRoutes);

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});