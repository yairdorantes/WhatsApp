import app from "./app.js";
import dotenv from "dotenv";
import pkg from "whatsapp-web.js";
const { Client, MessageMedia } = pkg;
import qrcode from "qrcode-terminal";
import { Configuration, OpenAIApi } from "openai";
let brandon = 0;
const port = process.env.PORT || 7000;
dotenv.config();
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
async function answerChat(number, order) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Responde a este chat: ${order}`,
      max_tokens: 50,
    });
    let answer = `${completion.data.choices[0].text}. Mensajes enviados por Brandon: ${brandon}`;
    answer = answer.replace(/\r?\n|\r/g, "");

    client.sendMessage(number, answer);
  } catch (error) {
    console.log(error);
    client.sendMessage(number, `Mensajes enviados por Brandon: ${brandon}`);
  }
}

try {
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
  // answerChat("5217293737947@c.us", "perro");
});

client.on("message", (message) => {
  // console.log(message);
  if (message.from === "5217293255577-1621863748@g.us") {
    if (message.author === "5217293629531@c.us") {
      brandon += 1;
      answerChat(message.from, message.body);
    }
  }
  // if (message.from === "120363038511711502@g.us") {
  //   brandon += 1;
  //   answerChat(message.from, message.body);
  // }
  // const my
});
client.initialize();
export default client;
export { jobs };
