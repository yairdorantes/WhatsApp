import app from "./app.js";
import dotenv from "dotenv";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import randomEmoji from "random-unicode-emoji";

const port = process.env.PORT || 8000;
dotenv.config();

// const client = new Client();
const client = new Client({
  puppeteer: { args: ["--no-sandbox"], headless: true },
});

console.log(port);
try {
  // const mongoose = require("mongoose");
  app.listen(port, () => {
    console.log("Server is running on port", port);
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

let intervalo;
let intervalRuning = false;
client.on("message", (message) => {
  console.log(message.from);
  console.log(message.body);
  if (message.body === "Stop") {
    clearInterval(intervalo);
    client.sendMessage(message.from, "stopping service...");
    intervalRuning = false;
  } else {
    if (intervalRuning === false) {
      client.sendMessage(message.from, "ACTIVATING SERVICE...");
      intervalo = setInterval(() => {
        client.sendMessage(message.from, randomEmoji.random({ count: 1 })[0]);
        client.sendMessage(message.from, "Write *Stop* to stop service");
      }, 1000);
      intervalRuning = true;
    }
  }
  // ss
});
client.initialize();

export default client;
