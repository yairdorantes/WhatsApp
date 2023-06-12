import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const response = await openai.listModels();

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Responde a este chat de WhatsApp: explica la teoria de cuerdas`,
  max_tokens: 400,
  temperature: 0.7,
  frequency_penalty: 0.3,
  presence_penalty: 0.2,
});

const res = completion.data.choices[0].text;

console.log(res);
// console.log(response.data);
