import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    history: [{ time: { type: Number } }],
    timeStamps: { type: Date, required: true } // Ensure correct type is used
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
