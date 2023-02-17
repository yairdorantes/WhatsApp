import app from "./app.js";
import dotenv from "dotenv";
// import { Client, MessageMedia } from "whatsapp-web.js";
import pkg from "whatsapp-web.js";
const { Client, MessageMedia } = pkg;
import qrcode from "qrcode-terminal";
// import randomEmoji from "random-unicode-emoji";
import schedule from "node-schedule";
import moment from "moment-timezone";
import { Configuration, OpenAIApi } from "openai";

// import { mongo } from "../../database/DataBase.js";
// import Users from "../../models/Users.js";
const port = process.env.PORT || 7000;
dotenv.config();
// const client = new Client();
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
});
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
let jobs = [];

// const allUsers = await Users.find({});
// console.log(allUsers);
// allUsers.map((user) => {
//   user.reminders.map((reminder) => {
//     reminder.times.map((time) => {
//       // console.log(time);
//       const parts = time.split(":"),
//         reminder2 = `${parts[1]} ${parts[0]} * * ${reminder.days}`;
//       // console.log(reminder2);
//       const job = schedule.scheduleJob(reminder2, () => {
//         console.log("Task is running!");
//         // client.sendMessage(user.phone, text);
//       });
//     });
//   });
// });

moment.tz.setDefault("America/Mexico_City");

async function answerChat(number, order) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: order,
    max_tokens: 100,
  });
  const answer = completion.data.choices[0].text;
  console.log(completion.data.choices[0].text);
  client.sendMessage(number, answer);
}

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
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message_reaction", (reaction) => {
  // console.log(reaction);
  // console.log(myMessage, "myid");
  // console.log("reacciono a mensaje");
  if (!reaction.msgId.remote.includes("g")) {
    if (myMessages.includes(reaction.msgId.id)) {
      const result = peopleBot.find(
        (obj) => obj.person === reaction.msgId.remote
      );
      if (!result) {
        console.log("si manda msj");
        peopleBot.push({
          person: reaction.msgId.remote,
          count: 0,
          conversation: true,
        });
        answerChat(
          reaction.msgId.remote,
          "te pido que inicies una conversacion"
        );
      }
      // answerChat()
    }
  }
  // if (reaction.reaction === "❌") {
  //   const remind = jobs.find((job) => job.text === reaction.msgId.id);
  //   if (remind) {
  //     let beji = remind.job;
  //     beji.cancel();
  //     console.log(remind.job);
  //     jobs = jobs.filter((item) => {
  //       item.text !== reaction.msgId.id;
  //     });
  //     client.sendMessage(reaction.msgId.remote, "Recordatorio eliminado ✓");
  //     console.log(`Reminder canceled: ${remind.text}`);
  //   } else {
  //     console.log(`Reminder not found: ${remind.text}`);
  //   }
  // }
});
let phones = [];
let myMessages = [];
let yo;
let brandon = 32;
let peopleBot = [];

const job = schedule.scheduleJob("48 19 * * 1,2,3,4,5", () => {
  console.log("Task is running!");
  client.sendMessage(`5217293737947@c.us`, text);
});
// job.cancel();

client.on("message", (message) => {
  // console.log(message);
  if (!message.from.includes("g") && !phones.includes(message.from)) {
    const ms = client.sendMessage(
      message.from,
      "Hola, soy un bot 🤖, *Yair* te respondera en un momento, mientras podemos conversar si reaccionas a este mensaje"
    );
    ms.then((msg) => {
      myMessages.push(msg.id.id);
      yo = msg;
    });
    phones.push(message.from);
  }
  const peopleWithBot = peopleBot.find((obj) => obj.person === message.from);
  if (message.body === "😆") {
    client.sendMessage(message.from, "*Bot apagado*");
    peopleWithBot.conversation = false;
  }
  if (peopleWithBot.count % 4 === 0 && peopleWithBot.conversation) {
    client.sendMessage(
      message.from,
      `responde con 😆 para que deje de contestar mi bot, mensajes restantes ${
        12 - peopleWithBot.count
      } `
    );
  }

  if (
    peopleWithBot &&
    peopleWithBot.count <= 12 &&
    peopleWithBot.conversation
  ) {
    peopleWithBot.count++;
    answerChat(
      message.from,
      `Responder al mensaje de WhatsApp: ${message.body}`
    );
    // console.log(peopleWithBot.count);
  }
  // peopleWithBot.conversation

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
export { jobs };
