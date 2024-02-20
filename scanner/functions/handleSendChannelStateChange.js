function handleSendChannelStateChange() {
  var readyState = sendChannel.readyState;
  log('Send channel state is: ' + readyState);

  if (readyState == "open") {

    // Enable 'Send' text area and set focus on it
    dataChannelSend.disabled = false;
    dataChannelSend.focus();
    dataChannelSend.placeholder = "";

    // Enable both Send and Close buttons
    sendButton.disabled = false;
    closeButton.disabled = false;
  } else {

    // event MUST be 'close', if we are here...
    // Disable 'Send' text area
    dataChannelSend.disabled = true;

    // Disable both Send and Close buttons
    sendButton.disabled = true;
    closeButton.disabled = true;
  }
}