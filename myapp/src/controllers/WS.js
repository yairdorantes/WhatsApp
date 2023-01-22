import randomEmoji from "random-unicode-emoji";

import client from "../index.js";

const sendMessage = async (req, res) => {
  client.sendMessage("5217293737947@c.us", "HELLO");

  res.json(randomEmoji.random({ count: 1 })[0]);

  // res.json("jaja");
};

export const wp = { sendMessage };
