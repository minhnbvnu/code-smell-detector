function handleICEConnectionStateChangeEvent(event) {
  log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);

  switch(myPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
    case "disconnected":
      closeVideoCall();
      break;
  }
}