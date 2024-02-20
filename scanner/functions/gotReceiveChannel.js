function gotReceiveChannel(event) {
  log('Receive Channel Callback: event --> ' + event);

  // Retrieve channel information
  receiveChannel = event.channel;

  // Set handlers for the following events:
  // (i) open; (ii) message; (iii) close
  receiveChannel.onopen = handleReceiveChannelStateChange;
  receiveChannel.onmessage = handleMessage;
  receiveChannel.onclose = handleReceiveChannelStateChange;
}