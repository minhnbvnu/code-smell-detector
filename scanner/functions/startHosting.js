function startHosting() {
    if (isHosting || isOffline) { return; }
    console.log('startHosting()');
    
    QRuntime.gamepad_array[0].$status = 'host';
    // Mark the others as absent until they connect as guests
    for (let i = 1; i < 4; ++i) {
        QRuntime.gamepad_array[i].$status = 'absent';
    }
    
    localStorage.setItem('last_hosted', 'true');
    isHosting = true;
    
    // Create the video stream. Setting the frame rate here increases
    // latency. Instead, specify when the buffer has changed
    // explicitly in the rendering routines. Setting the rate
    // explicitly to 0 seems to improve Safari guests. On Firefox,
    // requestFrame() doesn't work on the host so we have to allow
    // auto streaming.
    hostVideoStream = document.getElementById('screen').captureStream(isFirefox ? undefined : 0);
    
    // Latencies are expressed in seconds
    hostVideoStream.getVideoTracks()[0].applyConstraints({
        latency: {min: 0, ideal: 0.015, max: 0.100},
        frameRate: {max: 60, ideal: 60, min: 20},
        cursor: {exact: 'always', ideal: 'always'}
    }).catch(function (error) {
        console.log('Suppressed streaming constraint error', error);
    });

    hostAudioDestination = audioContext.createMediaStreamDestination();
    audioContext.gainNode.connect(hostAudioDestination);
    /*
    // Applying any of the following generates an OverconstrainedError

    hostAudioDestination.stream.getAudioTracks()[0].applyConstraints({
        latency: {min: 0, ideal: 0.016},
        channelCount: {min: 1, ideal: 2},
        sampleSize: {min: 4, ideal: 8}
    });
    */
    
    if (! deployed) {
        // Local monitor when debugging
        const videoElement = document.getElementById('guestVideo');
        videoElement.style.zIndex = 100;
        videoElement.style.visibility = 'visible';
        videoElement.srcObject = hostVideoStream;
    }

    // The peer must be created RIGHT before open is registered,
    // otherwise we could miss it.
    try {
        myPeer = new Peer(myHostNetID, PEER_CONFIG);
    } catch (e) {
        console.log(e);
        peerErrorHandler(e);
        stopHosting();
        return;
    }

    myPeer.on('error', function (err) {
        peerErrorHandler(err);
        stopHosting();
    });

    let isOpen = false;

    myPeer.on('disconnected', function () {
        if (! isOpen) {
            showPopupMessage('Sorry, could not connect for hosting.');
            stopHosting();
        }
    });
    
    myPeer.on('open', function(id) {
        isOpen = true;
        console.log('host peer opened with id ' + id);
        showPopupMessage('Now hosting online as ' + myOnlineName.toUpperCase() + ' (' + netIDToSentence(myHostNetID) + ')');

        // The guest calls us on the data channel
        myPeer.on('connection', function (dataConnection) {
            console.log('data connection to guest established');
            console.log('calling the guest back with the stream');
            const videoConnection = myPeer.call(dataConnection.peer, hostVideoStream);
            const audioConnection = myPeer.call(dataConnection.peer, hostAudioDestination.stream);

            // Find an available player index
            let player_index = 1;
            let conflict = false;
            do {
                conflict = false;
                for (let i = 0; i < connectedGuestArray.length; ++i) {
                    if (connectedGuestArray[i].player_index === player_index) {
                        conflict = true;
                        ++player_index;
                        break;
                    }
                }
            } while (conflict);

            // Show a message here on the host
            showPopupMessage(dataConnection.metadata.name.toUpperCase() + ' joined as P' + (player_index + 1));

            // Prevent the local input from overriding remote input immediately
            QRuntime.gamepad_array[player_index].$status = 'guest';
            QRuntime.gamepad_array[player_index].$guest_name = dataConnection.metadata.name;

            // Add to connected guest array
            const guest = {
                player_index: player_index,

                dataConnection: dataConnection,
                
                disconnect: function () {
                    const gamepad = QRuntime.gamepad_array[player_index];

                    let controlBindings = JSON.parse(localStorage.getItem('pad0' + player_index) || 'null');
                    if (! controlBindings) {
                        controlBindings = {id: isMobile ? 'mobile' : '', type: defaultControlType(player_index)};
                    }
                    gamepad.$status = 'absent';
                    gamepad.type = controlBindings.type;
                    gamepad.prompt = Object.freeze(Object.assign({'##': '' + (player_index + 1)}, controlSchemeTable[controlBindings.type]));

                    // Remove from the guest array on disconnect
                    for (let i = 0; i < connectedGuestArray.length; ++i) {
                        if (connectedGuestArray[i].dataConnection === dataConnection) {
                            // This was the guest
                            connectedGuestArray.splice(i, 1);
                            break;
                        }
                    }

                    dataConnection.close();
                    videoConnection.close();
                    audioConnection.close();                
                }
            }; // guest
            connectedGuestArray.push(guest);

            let keepAliveSetupTries = 0;
            function setupKeepAlive() {
                ++keepAliveSetupTries;
                if (dataConnection.open) {
                    keepAlive(dataConnection, undefined, function (dataConnection) {
                        guest.disconnect();
                        showPopupMessage(dataConnection.metadata.name.toUpperCase() + ' left');
                    });
                } else if (setupKeepAliveTries < 10) {
                    setTimeout(setupKeepAlive, 250);
                } else {
                    console.log('Failed after 10 tries to set up keepAlive() on the host');
                }
            };
            
            // Register keepAlive. As of peer.js 1.4.6, the dataConnection is
            // not open when this handler first runs, so we have to wait for it
            // to open later.
            setupKeepAlive();

            dataConnection.messageHandlerTable = {
                INPUT: function (message) {
                    // Overwrite the local controller for this connection
                    // (ignore if the game is still loading, so there is
                    // no gamepad_array)
                    
                    const array = QRuntime.gamepad_array;
                    if (array) {
                        // updateInput() will update properties from this absolute state
                        // once per frame
                        array[player_index].$guest_latest_state = message.gamepad_array[0];
                    } else {
                        console.log('ignored INPUT network message because runtime is reloading');
                    }                
                } // function
            }; // messageHandlerTable

            function sendConnectMessage() {
                dataConnection.send({
                    type: 'CONNECT',
                    name: myOnlineName,
                    player_index: player_index,

                    // Initial state of client graphics.
                    // Updates will be sent to all guests
                    // as new messages
                    private_view: PRIVATE_VIEW,
                    bloom: QRuntime.$postFX.bloom
                });
                console.log('sent connect message');
            }
            
            // Sometimes the guest never receives this first message
            // (even if reliable connections are turned on), so we
            // send a few times with delays. Once the first message
            // is processed, the others will be ignored.
            for (let i = 0; i < 7; ++i) {
                setTimeout(sendConnectMessage, i * 200);
            }
        });
        
    }); // myPeer.on('open')
}