function startGuesting(hostNetID) {
    isGuesting = true;
    localStorage.setItem("last_hosted", "false");
    console.log('startGuesting("' + hostNetID + '")');

    // Pause quadplay's regular loop to allow streaming to take over
    onPauseButton();

    // Make the pause button look like the play button while we're
    // in guest mode.
    document.querySelector('#pauseButtonContainer .buttonIcon').style.backgroundImage = 'url("button-play.png")';
    document.getElementById('stepButtonContainer').style.visibility = 
        document.getElementById('slowButtonContainer').style.visibility = 
        document.getElementById('playButtonContainer').style.visibility = 'hidden';
    
    const videoElement = document.getElementById('guestVideo');

    if (isSafari) {
        // Safari requires this, and it must be called from an event handler
        videoElement.play();
    } else {
        // On Safari, video will not update unless the video element
        // is in the DOM and visible, so we hide it behind the canvas
        // instead of hiding it completely (which is friendlier to the
        // browser compositor). On other platforms we hide it so that
        // the browser knows it is unused.
        videoElement.style.visibility = 'hidden';
    }        

    if (! deployed) {
        // Show the video element for debugging
        videoElement.style.zIndex = 100;
        videoElement.style.visibility = 'visible';
    }
    
    myPeer = new Peer(myHostNetID, PEER_CONFIG);

    // Will be set on load
    let videoWidth = 0, videoHeight = 0;
    let dataConnection;

    // For restoring screen resolution on disconnect
    stopGuesting.oldScreenSize = {x: SCREEN_WIDTH, y: SCREEN_HEIGHT};
    stopGuesting.oldPrivateScreen = PRIVATE_VIEW;
    stopGuesting.oldBloom = QRuntime.$postFX.bloom;
    QRuntime.$postFX.bloom = 0;

    function drawVideo() {
        // Shut down the video rendering when we stop being a guest
        if (! isGuesting) {
            videoElement.srcObject = null;
            console.log('guest terminating drawVideo() chain');
            return;
        }

        // On FireFox, this is the only way to get them
        let currentVideoWidth, currentVideoHeight;
        if (isFirefox) {
            // Bug in Firefox 91.0 prevents reading from getSettings()
            currentVideoWidth = videoElement.videoWidth;
            currentVideoHeight = videoElement.videoHeight;
        } else {
            const settings = videoElement.srcObject.getVideoTracks()[0].getSettings();
            currentVideoWidth = settings.width;
            currentVideoHeight = settings.height;
        }
            
        //console.log(settings);
        if (currentVideoWidth > 0 && currentVideoHeight > 0) {
            if (currentVideoWidth !== videoWidth ||
                currentVideoHeight !== videoHeight ||
                currentVideoWidth !== SCREEN_WIDTH ||
                currentVideoHeight !== SCREEN_HEIGHT) {
                
                videoWidth = currentVideoWidth | 0;
                videoHeight = currentVideoHeight | 0;

                // A FRAMEBUFFER_SIZE message should also arrive from
                // the host, but this forces automatic changes because
                // the video is asynchronous with the data stream
                const scale = PRIVATE_VIEW ? 0.5 : 1.0;
                setFramebufferSize(videoWidth * scale, videoHeight * scale, PRIVATE_VIEW);
            }

            // Instead of showing the video element directly (which
            // will be bilinearly interpolated), render it to the
            // canvas so that it is cleaned up by pixelization.
            if (PRIVATE_VIEW) {
                // Select the subscreen appropriate for this player.
                // We stream ALL views to all players so that the host
                // can run a single video encoder, which is all that
                // some GPUs support (and since our video is tiny,
                // this doesn't matter).
                const w = videoWidth >> 1, h = videoHeight >> 1;
                const x = w * (myGuestPlayerIndex & 1);
                const y = h * (myGuestPlayerIndex >> 1);
                ctx.drawImage(videoElement, x, y, w, h, 0, 0, w, h);
            } else {
                // Full screen
                ctx.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
            }
            
            applyAfterglow(QRuntime.$postFX.afterglow);
            maybeApplyBloom(QRuntime.$postFX.bloom, true);
        }
        
        // Run right before vsync to eliminate latency between the
        // video update and the canvas update. This will overdraw if the monitor
        // runs at higher than FRAMERATE_HZ, but the client isn't
        // doing much work anyway. 
        requestAnimationFrame(drawVideo);
    }

    // Absolute properties to send. Everything else is reconstructed
    // in the host's updateInput() call.
    const GAMEPAD_PROPERTY_ARRAY = ['$x', '$y', 'a', 'b', 'c', 'd', 'e', 'f', '$p', 'q', '$analog', 'type', '$id'];
    const inputObject = {};

    // Use the interval timer here to get the most regular timing possible
    let inputInterval = null;
    function sampleInput() {
        if (! isGuesting) {
            console.log('guest terminating sampleInput() interval');
            clearInterval(inputInterval);
            inputInterval = null;
            return;
        }

        // Sample input so that controllers are live
        // to send to the host
        updateInput();

        // Send absolute controls to the host
        if (dataConnection) {
            // Clone, stripping accessors. Note that
            // $name, index, and player_color fields
            // must be set on the host, and accessors
            // are not useful
            const gamepad = window.QRuntime.gamepad_array[0];
            for (let i = 0; i < GAMEPAD_PROPERTY_ARRAY.length; ++i) {
                const P = GAMEPAD_PROPERTY_ARRAY[i];
                inputObject[P] = gamepad[P];
            }

            dataConnection.send({type: 'INPUT', gamepad_array: [inputObject]});
        }
    }
    
    myPeer.on('error',
              function (err) {
                  stopGuesting();
                  peerErrorHandler(err);
              });
    
    myPeer.on('open', function (id) {
        // PeerJS has a bug where the 'stream' event handler is
        // called once per track instead of once per stream. We're
        // connecting streams with a single track so that doesn't
        // arise, but we keep checking anyway in case the behavior
        // is different in the future.
        let alreadyAddedVideo = false;
        let alreadyAddedAudio = false;

        // PeerJS cannot initiate a call without a MediaStream, so the
        // client can't initiate the call. Instead, we have the client
        // initiate a data connection and then the host calls *back*
        // with the MmediaStream.
        //
        // Synchronizing the audio and video creates a lot of latency
        // from the audio, so we have the host call back with two
        // independent streams for them.
        
        // When the host calls us back
        myPeer.on('call', function (mediaConnection) {
            console.log('host called back');

            // Answer the call but provide no MediaStream since no
            // media is streaming back.
            mediaConnection.answer(null);
            mediaConnection.on(
                'stream',
                function (hostStream) {
                    console.log('host answered...');
                    const isVideo = hostStream.getVideoTracks().length > 0;

                    if (isVideo) {
                        if (! alreadyAddedVideo) {
                            {
                                // Configure video quality
                                const sender = mediaConnection.peerConnection.getSenders()[0];
                                const parameters = sender.getParameters();
                                if (parameters.encodings.length > 0) {
                                    parameters.encodings[0].maxBitrate = 2e6
                                    sender.setParameters(parameters);
                                } else {
                                    console.log("no encodings");
                                }
                            }
                            
                            alreadyAddedVideo = true;
                            console.log('...with video');
                            // The 'addTrack' callback does not reliably get invoked, so don't use it.
                            // Instead test the video resolution every frame above by polling
                            
                            videoElement.srcObject = hostStream;
                            
                            // Start the callback chain
                            drawVideo();
                            inputInterval = setInterval(sampleInput, ONLINE_INPUT_PERIOD);
                        } else {
                            console.log('...and this guest rejected the duplicate video call');
                        }
                    } else if (! alreadyAddedAudio) {
                        alreadyAddedAudio = true;
                        console.log('...with audio');
                        document.getElementById('guestAudio').srcObject = hostStream;

                        // Chrome has a bug where we have to connect
                        // the stream to an audio element; we can't
                        // wire it directly into the AudioContext.
                        //
                        // https://bugs.chromium.org/p/chromium/issues/detail?id=933677
                        // guestAudioSourceNode = audioContext.createMediaStreamSource(hostStream);
                        // guestAudioSourceNode.connect(audioContext.destination);
                        
                    } else {
                        console.log('...and this guest rejected the duplicate audio call');
                    }
                },
                
                function (err) {
                    console.log('host stream failed with', err);
                }
            ); // mediaConnection.on('stream')
        }); // myPeer.on('call')

        
        console.log('connect data to host');
        // This will trigger the host to call back with a mediaConnection as well
        dataConnection = myPeer.connect(hostNetID, {reliable: true, serialization: SERIALIZATION, metadata: {name: myOnlineName}});

        // Handler for connection message must be registered before the on('data') handler
        dataConnection.messageHandlerTable = {
            DISCONNECT: stopGuesting,

            FRAMEBUFFER_SIZE: function (message) {
                const scale = PRIVATE_VIEW ? 0.5 : 1.0;
                setFramebufferSize(message.SCREEN_WIDTH * scale, message.SCREEN_HEIGHT * scale, message.PRIVATE_VIEW);
            },

            POST_EFFECTS: function (message) {
                console.log('Received', message);
                QRuntime.$postFX.bloom = message.bloom;
            },
            
            CONNECT: function(message) {
                console.log('received CONNECT message from host');
            
                // Store the host in the recent list on successful connect
                const recent_host_array = QRuntime.parse(localStorage.getItem('recent_host_array') || '[]');
                // Remove any previous instance of this ID
                for (let i = 0; i < recent_host_array.length; ++i) {
                    if (recent_host_array[i].code === hostNetID) {
                        recent_host_array.splice(i, 1);
                        break
                    }
                }
                recent_host_array.unshift({code: hostNetID, name: message.name});
                recent_host_array.length = Math.min(recent_host_array.length, 3);
                localStorage.setItem('recent_host_array', QRuntime.unparse(recent_host_array, 0));
                PRIVATE_VIEW = message.private_view;
                QRuntime.$postFX.bloom = message.bloom;
                myGuestPlayerIndex = message.player_index;
                
                showPopupMessage('You are visiting ' + netIDToString(dataConnection.peer, message.name) + '<br>as P' + (message.player_index + 1) + ' ' + myOnlineName.toUpperCase());
                
                // Remove this message handler since it will never matter again.
                delete dataConnection.messageHandlerTable.CONNECT;
            }};
            
        dataConnection.on('open', function () {
            console.log('data connection to host established');
            console.log('in dataConnection.on(open), dataConnection.open = ', dataConnection.open);
            keepAlive(dataConnection, undefined, function () {
                showPopupMessage('You lost connection to the host.');
                setTimeout(stopGuesting);
            });
        });

        dataConnection.on('close', stopGuesting);

    }); // myPeer.on('open')
}