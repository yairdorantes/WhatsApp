import randomEmoji from "random-unicode-emoji";
import schedule from "node-schedule";
import client, { jobs } from "../index.js";
// import Users from "../../../models/Users.js";
// "35 6 16 * * 1,3,5"

const setReminder = async (req, res) => {
  try {
    const { times, days, text, phone } = req.body;
    const number = `521${phone}@c.us`;
    // const user = await Users.findOne({ phone: number });
    // console.log(user);
    // user.reminders.push({ times, days, text });
    // await user.save();
    // console.log(req.body);
    times.map((time) => {
      try {
        const parts = time.split(":");
        const remainder = `${parts[1]} ${parts[0]} * * ${days}`;
        const idJob = Date.now();
        const job = schedule.scheduleJob(remainder, () => {
          console.log("Task is running!");
          const msg = client.sendMessage(`521${phone}@c.us`, text);
          msg.then((data) => {
            const remind = jobs.find((trabajo) => trabajo.job === job);
            if (remind) {
              remind.text = data.id.id;
            } else {
              console.log("no se encontro trabajo");
            }
          });
        });
        const newJob = {
          id: idJob,
          job,
          text,
        };
        jobs.push(newJob);
        // console.log(jobs);
      } catch (error) {
        console.log(error.message);
      }
    });
    res.json({ message: "Reminder Activated!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getReminders = async (req, res) => {
  const { phone } = req.params;
  console.log(phone);

  try {
    // const user = await Users.findOne({ phone: `521${phone}@c.us` });
    // return res.json(user.reminders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const sendMessage = async (req, res) => {
  // client.sendMessage("5217293737947@c.us", "HELLO");

  res.json(randomEmoji.random({ count: 1 })[0]);

  // res.json("jaja");
};

export const wp = { sendMessage, setReminder, getReminders };
