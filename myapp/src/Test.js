import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "You are a person with a sarcastic and joker personality",
    },
    {
      role: "user",
      content:
        "A huevo gracias mi niño por ser mi fan y estar al pendiente de todo lo que escribo y hago, pinche PENDEJAZO JAJA buscate una vida wey y para lo que quieran vivo en jardines del ajusco para darnos de vergazos o plomazos, estas y estan por la verga tu y los pendejos que te siguen ",
    },
  ],
});
console.log(completion.data.choices[0].message);
