import app from "./app.js";
import dotenv from "dotenv";
import pkg from "whatsapp-web.js";
const { Client, MessageMedia } = pkg;
import qrcode from "qrcode-terminal";
import { Configuration, OpenAIApi } from "openai";
import { pexels } from "./Pexels.js";
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
async function answerChat(messageSource, order, brandon) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Responde a este chat: ${order}`,
      max_tokens: 50,
    });
    let answer = "";
    if (brandon) {
      answer = `${completion.data.choices[0].text}. Mensajes enviados por Brandon: ${brandon}`;
    } else {
      answer = `${completion.data.choices[0].text}.`;
    }
    answer = answer.replace(/\r?\n|\r/g, "");

    messageSource.reply(answer);
  } catch (error) {
    console.log(error);
    messageSource.reply(`Mensajes enviados por Brandon: ${brandon}`);
  }
}
try {
  app.listen(port, () => console.log("Server is running on port", port));
} catch (e) {
  console.log(e);
}
client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", () => console.log("Client is ready!"));

function getWordsAfter(sentence, givenWord) {
  const words = sentence.split(" ");
  const givenWordIndex = words.indexOf(givenWord);

  if (givenWordIndex !== -1 && givenWordIndex < words.length - 1) {
    return words.slice(givenWordIndex + 1);
  } else {
    return [];
  }
}

const sendImage = async (message, query) => {
  const image = await pexels.getImage(query);
  try {
    const media = await MessageMedia.fromUrl(image);
    message.reply(media);
  } catch (error) {
    console.log(error);
  }
};

client.on("message", (message) => {
  // sendImage(message.body);
  console.log(message.body);
  if (message.mentionedIds.includes("5217293737947@c.us")) {
    if (message.body.includes("draw")) {
      sendImage(message, getWordsAfter(message.body, "draw"));
    } else if (message.body.includes("reply")) {
      answerChat(message, getWordsAfter(message.body, "reply"), false);
    }
  }
  if (message.from === "5217293255577-1621863748@g.us") {
    if (message.author === "5217293629531@c.us") {
      brandon += 1;
      answerChat(message, message.body, true);
    }
  }
  if (message.from === "5217291434687@c.us")
    answerChat(message, message.body, false);
});
client.initialize();
export default client;
