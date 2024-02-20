function createPeerConnection() {
  try {
    pc = new RTCPeerConnection(pc_config, pc_constraints);
    pc.addStream(localStream);
    pc.onicecandidate = handleIceCandidate;
    console.log('Created RTCPeerConnnection with:\n' +' config: \'' + JSON.stringify(pc_config) + '\'; \n' +' constraints: \'' + JSON.stringify(pc_constraints) + '\'.');

  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
    return;

  }

  pc.onaddstream = handleRemoteStreamAdded;

  pc.onremovestream = handleRemoteStreamRemoved;
  if (isInitiator) {
    try {

      // Create a reliable data channel
      sendChannel = pc.createDataChannel("sendDataChannel",{reliable: true});
      trace('Created send data channel');
    } catch (e) {
      alert('Failed to create data channel. ');
      trace('createDataChannel() failed with exception: ' + e.message);
    }

    sendChannel.onopen = handleSendChannelStateChange;
    sendChannel.onmessage = handleMessage;
    sendChannel.onclose = handleSendChannelStateChange;
  } else {
    // Joiner
    pc.ondatachannel = gotReceiveChannel;
  }
}