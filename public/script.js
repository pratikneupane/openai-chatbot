// Path: public/script.js
// connect to the socket.io server
const socket = io();

// listen for messages from the server
socket.on('chat message', (msg) => {
  // add the message to the page
  const messages = document.getElementById('messages');
  const message = document.createElement('div');
  message.innerText = msg;
  messages.appendChild(message);
});

// send a message to the server when the send button is clicked
const sendButton = document.getElementById('send');
sendButton.addEventListener('click', () => {
  const message = document.getElementById('message');
  socket.emit('chat message', message.value);
  message.value = '';
});

// send a message to the server when the enter key is pressed
const messageInput = document.getElementById('message');
messageInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
});