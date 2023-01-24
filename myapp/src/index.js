import app from "./app.js";
import dotenv from "dotenv";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
// import randomEmoji from "random-unicode-emoji";
import schedule from "node-schedule";
const port = process.env.PORT || 8000;
dotenv.config();

// const client = new Client();
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
});

console.log(port);
try {
  // const mongoose = require("mongoose");
  app.listen(port, () => {
    console.log("Server is running on port", port);
    let date = new Date();
    let hour = date.getHours();
    console.log(hour);
  });
} catch (e) {
  console.log(e);
}

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  // ss
});
client.initialize();

export default client;
