const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// create express app and http server
const app = express();
const server = http.createServer(app);

// initialize socket.io
const io = socketio(server);

// Use express.json() middleware to parse incoming request bodies in JSON format
app.use(express.json());

// endpoint for handling messages
app.post("/message", async (req, res) => {
  try {
    // use openai to generate a response
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:  `${req.body.text}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    // send the response to the client
    // io.emit("chat message", response.choices[0].text);

    // send a success response to the client
    res.status(200).json({ message: "Response sent" });
  } catch (error) {
    // send an error response to the client
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// start the server
server.listen(3000, () => {
  console.log("Server started on port 3000");
});
