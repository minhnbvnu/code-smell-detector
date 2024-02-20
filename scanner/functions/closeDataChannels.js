function closeDataChannels() {

  // Close channels...
  log('Closing data channels');
  sendChannel.close();
  log('Closed data channel with label: ' + sendChannel.label);
  receiveChannel.close();
  log('Closed data channel with label: ' + receiveChannel.label);

  // Close peer connections
  localPeerConnection.close();
  remotePeerConnection.close();

  // Reset local variables
  localPeerConnection = null;
  remotePeerConnection = null;
  log('Closed peer connections');

  // Rollback to the initial setup of the HTML5 page
  startButton.disabled = false;
  sendButton.disabled = true;
  closeButton.disabled = true;
  dataChannelSend.value = "";
  dataChannelReceive.value = "";
  dataChannelSend.disabled = true;
  dataChannelSend.placeholder = "1: Press Start; 2: Enter text; 3: Press Send.";

}