// import { createClient } from "pexels";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.IMAGES_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getImage(query) {
  try {
    const response = await openai.createImage({
      prompt: query,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    return image_url;
  } catch (error) {
    console.error(error);
  }
}

export const pexels = {
  getImage,
};
