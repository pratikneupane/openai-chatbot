// import axios and socekt.io-client
const axios = require('axios');
const io = require('socket.io-client');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatHistory = document.getElementById('chat-history');

form.addEventListener('submit', e => {
  e.preventDefault();
  const message = input.value;
  // add this message to the chat history
  chatHistory.innerHTML += `<div class="chat-user">${message}</div>`;
  // clear the input
  input.value = '';

  axios.post('http://localhost:3000/message', {
    text: message
  })
  .then(response => {
    const { fulfillmentText, intent } = response.data;
    chatHistory.innerHTML += `<div class="chat-bot">${fulfillmentText}</div>`;
  })
  .catch(error => {
    console.error(error);
  });
});

const socket = io();
socket.on('chat message', msg => {
  chatHistory.innerHTML += `<div class="chat-user">${msg}</div>`;
});
