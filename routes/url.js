import express from "express";
import { generateShortUrl, getOriginalUrl } from "../controllers/url.js";

const router = express.Router();

router.post("/", generateShortUrl);
router.get("/:id", getOriginalUrl);

export default router;