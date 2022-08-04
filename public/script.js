let socket = new WebSocket("wss://domingoos.store");

// send message from the form
document.getElementById("submit-btn").addEventListener('click', ()=>{
    const outgoingMessage = document.getElementById("input-text").value;
    socket.send(outgoingMessage);
    let messageElem = document.createElement('div');
    messageElem.textContent = outgoingMessage;
    document.getElementById('messages').prepend(messageElem);
})
  
  // message received - show the message in div#messages
  socket.onmessage = function(event) {
    let message = event.data;
  
    let messageElem = document.createElement('div');
    messageElem.textContent = message;
    document.getElementById('messages').prepend(messageElem);
  }
