function gotLocalDescription(desc) {

  // Set local SDP as the right (local/remote) description for both local
  // and remote parties
  localPeerConnection.setLocalDescription(desc);
  log('localPeerConnection\'s SDP: \n' + desc.sdp);
  remotePeerConnection.setRemoteDescription(desc);

  // Create answer from the remote party, based on the local SDP
  remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
}