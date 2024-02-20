function createConnection() {

  // Chrome
  if (navigator.webkitGetUserMedia) {
    RTCPeerConnection = webkitRTCPeerConnection;

    // Firefox
  } else if(navigator.mozGetUserMedia) {
    RTCPeerConnection = mozRTCPeerConnection;
    RTCSessionDescription = mozRTCSessionDescription;
    RTCIceCandidate = mozRTCIceCandidate;
  }
  log("RTCPeerConnection object: " + RTCPeerConnection);

  // This is an optional configuration string
  // associated with NAT traversal setup
  var servers = null;

  // JavaScript variable associated with proper
  // configuration of an RTCPeerConnection object:
  // use DTLS/SRTP
  var pc_constraints = {
    'optional': [
      {
        'DtlsSrtpKeyAgreement': true
      }
    ]
  };

  // Create the local PeerConnection object...
  // ...with data channels
  localPeerConnection = new RTCPeerConnection(servers, pc_constraints);
  log("Created local peer connection object, with Data Channel");
  try {

    // Note: SCTP-based reliable DataChannels supported
    // in Chrome 29+ !
    // use {reliable: false} if you have an older version of Chrome
    sendChannel = localPeerConnection.createDataChannel("sendDataChannel", {reliable: true});
    log('Created reliable send data channel');
  } catch (e) {
    alert('Failed to create data channel!');
    log('createDataChannel() failed with following message: ' + e.message);
  }
  // Associate handlers with peer connection ICE events
  localPeerConnection.onicecandidate = gotLocalCandidate;

  // Associate handlers with data channel events
  sendChannel.onopen = handleSendChannelStateChange;
  sendChannel.onclose = handleSendChannelStateChange;

  // Mimic a remote peer connection
  window.remotePeerConnection = new RTCPeerConnection(servers, pc_constraints);
  log('Created remote peer connection object, with DataChannel');

  // Associate handlers with peer connection ICE events...
  remotePeerConnection.onicecandidate = gotRemoteIceCandidate;

  // ...and data channel creation event
  remotePeerConnection.ondatachannel = gotReceiveChannel;

  // We're all set! Let's start negotiating a session...
  localPeerConnection.createOffer(gotLocalDescription, onSignalingError);

  // Disable Start button and enable Close button
  startButton.disabled = true;
  closeButton.disabled = false;
}