function gotLocalCandidate(event) {
  log('local ice callback');
  if (event.candidate) {
    remotePeerConnection.addIceCandidate(event.candidate);
    log('Local ICE candidate: \n' + event.candidate.candidate);
  }
}