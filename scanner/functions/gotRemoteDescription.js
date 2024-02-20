function gotRemoteDescription(desc) {

  // Set remote SDP as the right (remote/local) description for both local
  // and remote parties
  remotePeerConnection.setLocalDescription(desc);
  log('Answer from remotePeerConnection\'s SDP: \n' + desc.sdp);
  localPeerConnection.setRemoteDescription(desc);
}