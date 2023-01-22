import express from "express";
import cors from "cors";
import Routes from "./routes/wp.routes.js";
const app = express();
app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use("/api/", Routes);
app.use("/api/", Routes);
// app.use("/api/", commerceRoutes);

export default app;
