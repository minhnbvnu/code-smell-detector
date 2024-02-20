function connectPeers() {
    // Create the local connection and its event listeners
    
    localConnection = new RTCPeerConnection();
    
    // Create the data channel and establish its event listeners
    sendChannel = localConnection.createDataChannel("sendChannel");
    sendChannel.onopen = handleSendChannelStatusChange;
    sendChannel.onclose = handleSendChannelStatusChange;
    
    // Create the remote connection and its event listeners
    
    remoteConnection = new RTCPeerConnection();
    remoteConnection.ondatachannel = receiveChannelCallback;
    
    // Set up the ICE candidates for the two peers
    
    localConnection.onicecandidate = e => !e.candidate
        || remoteConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);

    remoteConnection.onicecandidate = e => !e.candidate
        || localConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);
    
    // Now create an offer to connect; this starts the process
    
    localConnection.createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
    .then(() => remoteConnection.createAnswer())
    .then(answer => remoteConnection.setLocalDescription(answer))
    .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
    .catch(handleCreateDescriptionError);
  }