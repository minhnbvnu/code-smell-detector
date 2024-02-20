function stopHosting() {
    if (isHosting) {
        showPopupMessage('Stopped hosting online');
    }

    // Make self absent; guests will be dropped below
    QRuntime.gamepad_array[0].$status = 'absent';
    
    if (hostVideoStream) {
        hostVideoStream.getVideoTracks()[0].stop();
        hostVideoStream = null;
    }

    if (hostAudioDestination) {
        hostAudioDestination.stream.getAudioTracks()[0].stop();
        audioContext.gainNode.disconnect(hostAudioDestination);
        hostAudioDestination = null;
    }

    if (myPeer && isHosting) {
        for (let i = 0; i < connectedGuestArray.length; ++i) {
            connectedGuestArray[i].disconnect();
        }
        connectedGuestArray.length = 0;
        console.log('stopHosting()');
        myPeer.destroy();
        myPeer = null;
    }

    isHosting = false
}