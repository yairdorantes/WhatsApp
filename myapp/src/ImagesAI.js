import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.IMAGES_API_KEY);
// console.log(process.env.PORT);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY_IMAGES,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImage({
  prompt: "a red car jumping over a river",
  n: 1,
  size: "1024x1024",
});
const image_url = response.data.data[0].url;

console.log(image_url);
