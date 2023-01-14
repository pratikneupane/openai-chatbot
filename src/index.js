// chatbot using openai express and socket.io
import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
import openai from 'openai-api';
import {config} from 'dotenv';
config();
const openai_api_key = process.env.OPENAI_API_KEY;
const openai_api = new openai(openai_api_key);
const port = process.env.PORT || 3000;

// create a socket.io server
const io = new Server(server);

// serve static files from the public directory
app.use(express.static('public'));

// listen for socket.io connections
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // send the message to openai
    openai_api.complete({
      engine: 'davinci',
      prompt: msg,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ['\
']
    }).then((response) => {
      // send the response back to the client
      socket.emit('chat message', response.data.choices[0].text);
    }
    );
  });
});

// start the server
server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

