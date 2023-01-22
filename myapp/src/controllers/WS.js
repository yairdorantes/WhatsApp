import randomEmoji from "random-unicode-emoji";
import client from "../index.js";

const sendMessage = async (req, res) => {
  client.sendMessage("5217293737947@c.us", randomEmoji.random({ count: 1 })[0]);
  res.json(randomEmoji.random({ count: 1 })[0]);
};

export const wp = { sendMessage };
