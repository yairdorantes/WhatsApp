import { createClient } from "pexels";
const client = createClient(
  "OYZUHfA9sS01TlruADbxtP07rGT6nVEwHB9Mjvkx4ZszZru43QpAdeZq"
);
async function getImage(query) {
  try {
    const photos = await client.photos.search({ query, per_page: 3 });
    const image = photos.photos[getRandom(0, 2)].src.original;

    return image;
  } catch (error) {
    console.error(error);
  }
}

function getRandom(min, max) {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}

export const pexels = {
  getImage,
};
