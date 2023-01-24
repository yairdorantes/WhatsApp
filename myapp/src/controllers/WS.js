import randomEmoji from "random-unicode-emoji";
import schedule from "node-schedule";
import client from "../index.js";

// "35 6 16 * * 1,3,5"
const setReminder = async (req, res) => {
  // const
  const { times, days, text, phone } = req.body;

  console.log(req.body);
  try {
    times.map((time) => {
      const parts = time.split(":");
      const remainder = `${parts[1]} ${parts[0]} * * ${days}`;
      // console.log(remainder);
      const job = schedule.scheduleJob(remainder, () => {
        console.log("Task is running!");
        client.sendMessage(`521${phone}@c.us`, text);
      });
    });
    res.json({ message: "Reminder Activated!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const sendMessage = async (req, res) => {
  client.sendMessage("5217293737947@c.us", "HELLO");

  res.json(randomEmoji.random({ count: 1 })[0]);

  // res.json("jaja");
};

export const wp = { sendMessage, setReminder };
