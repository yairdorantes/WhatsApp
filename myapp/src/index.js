import dotenv from "dotenv";
import app from "./app.js";
import pkg from "whatsapp-web.js";
const { Client, MessageMedia } = pkg;
import qrcode from "qrcode-terminal";
import { Configuration, OpenAIApi } from "openai";
import { sendWeather } from "./time.js";
dotenv.config();
let brandonCont = 104;
console.log("The port is: ", process.env.PORT);
const port = process.env.PORT || 7000;
console.log(process.env.TZ);

const client = new Client();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
async function answerChat(messageSource, order, brandon) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a person with a sarcastic and joker personality",
        },
        {
          role: "user",
          content: order,
        },
      ],
    });
    // console.log(completion.data.choices[0].message);
    let answer = "";
    if (brandon) {
      answer = `${completion.data.choices[0].message.content}. Mensajes enviados por Brandon: *${brandonCont}*`;
    } else {
      answer = `${completion.data.choices[0].message.content}`;
    }
    answer = answer.replace(/\r?\n|\r/g, "");

    messageSource.reply(answer);
  } catch (error) {
    console.log(error);
    messageSource.reply(`ups algo salio mal 🫠`);
  }
}
try {
  app.listen(port, () => console.log("Server is running on port", port));
} catch (e) {
  console.log(e);
}
client.on("qr", (qr) => {
  // qrcode.generate(qr, { small: true });
  // console.log(qr);
  console.log(qr);
});
client.on("ready", () => {
  console.log("Client is ready!");
  client.sendMessage("5217293737947@c.us", "hello ");
});

function getWordsAfter(sentence, givenWord) {
  const words = sentence.split(" ");
  const givenWordIndex = words.indexOf(givenWord);

  if (givenWordIndex !== -1 && givenWordIndex < words.length - 1) {
    return words.slice(givenWordIndex + 1).join(" ");
  } else {
    return "";
  }
}

const sendImage = async (message, query) => {
  console.log(query);
  try {
    const response = await openai.createImage({
      prompt: query,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    const media = await MessageMedia.fromUrl(image_url);
    // console.log(image_url);

    message.reply(media);
  } catch (error) {
    // console.log(error);
    try {
      message.reply("Lo siento, no pude generar eso 😢");
    } catch (error) {
      console.log(error);
    }
  }
};

client.on("message", (message) => {
  console.log("message: ", message.body);
  console.log(message.from);

  try {
    if (message.mentionedIds.includes("5217293737947@c.us")) {
      if (message.body.includes("draw")) {
        message.react("🤖");
        sendImage(message, getWordsAfter(message.body, "draw"));
      } else if (message.body.includes("reply")) {
        answerChat(message, getWordsAfter(message.body, "reply"), false);
        message.react("🤖");
      }
    }
    if (message.from === "5217293255577-1621863748@g.us") {
      if (
        message.author === "5217293629531@c.us" ||
        message.body.includes("testing brandon")
      ) {
        if (message.body.length > 0) {
          brandonCont += 1;
          // answerChat(message, message.body, true);
          client.sendMessage(
            message.from,
            `Mensajes enviados por brandon *${brandonCont}*`
          );
        }
      }
    }
    if (message.from === "5217291434687@c.us") {
      console.log("master");
      message.reply("hello there");
      // answerChat(message, message.body, false);
      // sendWeather(client.sendMessage.bind(client));
    }
  } catch (error) {
    console.log(error);
  }
});
client.initialize();
export default client;
