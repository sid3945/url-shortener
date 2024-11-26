import express from "express";
import dotenv from "dotenv";
import {connectRedis} from "./config/redis.js";
import urlRoutes from "./routes/url.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/urls", urlRoutes);

connectRedis();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});