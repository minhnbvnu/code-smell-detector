function gotRemoteIceCandidate(event) {
  log('remote ice callback');
  if (event.candidate) {
    localPeerConnection.addIceCandidate(event.candidate);
    log('Remote ICE candidate: \n ' + event.candidate.candidate);
  }
}