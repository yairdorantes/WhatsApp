import { wp } from "../controllers/WS.js";
import { Router } from "express";

const router = Router();

router.get("/send", wp.sendMessage);
export default router;
