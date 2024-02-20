async function handleVideoOfferMsg(msg) {
  targetUsername = msg.name;

  // If we're not already connected, create an RTCPeerConnection
  // to be linked to the caller.

  log("Received video chat offer from " + targetUsername);
  if (!myPeerConnection) {
    createPeerConnection();
  }

  // We need to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.

  var desc = new RTCSessionDescription(msg.sdp);

  // If the connection isn't stable yet, wait for it...

  if (myPeerConnection.signalingState != "stable") {
    log("  - But the signaling state isn't stable, so triggering rollback");

    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      myPeerConnection.setLocalDescription({type: "rollback"}),
      myPeerConnection.setRemoteDescription(desc)
    ]);
    return;
  } else {
    log ("  - Setting remote description");
    await myPeerConnection.setRemoteDescription(desc);
  }

  // Get the webcam stream if we don't already have it

  if (!webcamStream) {
    try {
      webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    } catch(err) {
      handleGetUserMediaError(err);
      return;
    }

    document.getElementById("local_video").srcObject = webcamStream;

    // Add the camera stream to the RTCPeerConnection

    try {
      webcamStream.getTracks().forEach(
        transceiver = track => myPeerConnection.addTransceiver(track, {streams: [webcamStream]})
      );
    } catch(err) {
      handleGetUserMediaError(err);
    }
  }

  log("---> Creating and sending answer to caller");

  await myPeerConnection.setLocalDescription(await myPeerConnection.createAnswer());

  sendToServer({
    name: myUsername,
    target: targetUsername,
    type: "video-answer",
    sdp: myPeerConnection.localDescription
  });
}