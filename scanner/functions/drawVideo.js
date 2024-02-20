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