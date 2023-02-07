import app from "./app.js";
import dotenv from "dotenv";
// import { Client, MessageMedia } from "whatsapp-web.js";
import pkg from "whatsapp-web.js";
const { Client, MessageMedia } = pkg;
import qrcode from "qrcode-terminal";
// import randomEmoji from "random-unicode-emoji";
import schedule from "node-schedule";
import moment from "moment-timezone";
import { mongo } from "../../database/DataBase.js";
import Users from "../../models/Users.js";
const port = process.env.PORT || 7000;
dotenv.config();
// const client = new Client();
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
});

const allUsers = await Users.find({});
// console.log(allUsers);
allUsers.map((user) => {
  user.reminders.map((reminder) => {
    reminder.times.map((time) => {
      // console.log(time);
      const parts = time.split(":"),
        reminder2 = `${parts[1]} ${parts[0]} * * ${reminder.days}`;
      // console.log(reminder2);
      const job = schedule.scheduleJob(reminder2, () => {
        console.log("Task is running!");
        // client.sendMessage(user.phone, text);
      });
    });
  });
});
moment.tz.setDefault("America/Mexico_City");

let myMessage;
try {
  // const mongoose = require("mongoose");
  app.listen(port, () => {
    console.log("Server is running on port", port);
    let date = new Date();
    let hour = date.getHours();
    console.log("server hour:", hour);
  });
} catch (e) {
  console.log(e);
}

client.on("qr", (qr) => {
  // qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message_reaction", (reaction) => {
  // console.log(reaction);

  // console.log(myMessage, "myid");
  if (reaction.msgId.id === myMessage) {
    console.log("reacciono a mensaje");
    if (reaction.reaction === "👍") yo.delete(true);
  }
});

let yo;
let brandon = 0;
client.on("message", (message) => {
  console.log(message);
  if (message.from.includes("g")) {
    console.log("");
  } else {
    const ms = client.sendMessage(
      message.from,
      "Hola 👋, soy un bot 🤖, *Yair* te respondera en un momento 😃, Reacciona a este mensaje 👍 para eliminarme"
    );
    ms.then((msg) => {
      myMessage = msg.id.id;
      yo = msg;
    });
  }

  if (message.from === "5217293255577-1621863748@g.us") {
    if (message.author === "5217293629531@c.us") {
      brandon += 1;
      client.sendMessage(
        message.from,
        `mensajes enviados por Brandon: *${brandon}*`
      );
    }
  }
  // const my
});
client.initialize();

export default client;
