process.env.TZ = "America/Mexico_City";
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
import axios from "axios";
import dotenv from "dotenv";
import { scheduleJob } from "node-schedule";
dotenv.config();
const apiKey = process.env.WEATHER_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${19.2883}&lon=${-99.6672}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&lang=es`;

const getWeather = async () => {
  try {
    const res = await axios.get(apiUrl);
    const weatherData = res.data;
    const dailyWeather = weatherData.daily[0]; // Assuming you want the first day (index 0)
    const averageTemperature =
      "🌡️ " +
      ((dailyWeather.temp.max + dailyWeather.temp.min) / 2 - 273.15).toFixed(2);
    const weatherDescription = dailyWeather.weather[0].description;
    const precipitationProbability =
      "🌧️ " + (dailyWeather.pop * 100).toFixed(2);
    const weatherText = `${weatherDescription}, ${precipitationProbability}%, ${averageTemperature}°C`;
    return weatherText;
  } catch (err) {
    console.log(err);
  }
};
const currentHour = new Date().getHours();

export const sendWeather = async (callback) => {
  console.log(`Current hour: ${currentHour}`);
  const jobMorning = scheduleJob("0 0 7 * * *", async function () {
    const weather = await getWeather();
    callback(
      "5217293255577-1621863748@g.us",
      `¡Buenos días a todos! Les comparto el pronóstico del clima para hoy: ${weather}. Que tengan un excelente dia 😊`
    );
  });
  // console.log(jobMorning.name);
};

// printWeather();
// console.log(printWeather());
