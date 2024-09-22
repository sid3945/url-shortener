import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User.js";
import { createSession } from "../services/SessionService.js";

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });

    } catch (error){

    }
}

async function login(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    console.log("trying to login with user", user);
    if(!user){
        res.status(400).json({message: "Invalid email or password"});
    }

    const sessionId = uuidv4();
    createSession(sessionId, user._id);
    res.cookie("sessionId", sessionId);
    res.status(200).json({message: "Login successful"});
}

export { register, login };
