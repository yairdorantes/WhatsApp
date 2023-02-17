import { wp } from "../controllers/WS.js";
import { Router } from "express";
import { data } from "../controllers/Datas.js";

const router = Router();

router.get("/send", wp.sendMessage);
router.post("/reminder", wp.setReminder);
router.get("/send-code/:phone", data.sendCode);
router.post("/verify-code", data.verifyCode);
router.get("/my-reminders/:phone", wp.getReminders);

export default router;
