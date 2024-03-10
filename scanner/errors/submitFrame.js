function submitFrame(_updateImageData, _updateImageData32, gpuThreadTime) {
    if (gpuThreadTime !== undefined) {
        profiler.smoothGPUTime.update(gpuThreadTime);
    }
    
    // Force the data back, which may be returned from a web worker
    console.assert(_updateImageData, _updateImageData32);
    updateImageData = _updateImageData;
    updateImageData32 = _updateImageData32;
    
    // Update the image
    const $postFX = QRuntime.$postFX;

    // Ignore bloom and burn_in, which are handled with overlays
    const hasPostFX =
          ($postFX.motion_blur > 0) ||
          ($postFX.color.a > 0) ||
          ($postFX.angle !== 0) ||
          ($postFX.pos.x !== 0) || ($postFX.pos.y !== 0) ||
          ($postFX.scale.x !== 1) || ($postFX.scale.y !== 1) ||
          ($postFX.color_blend !== 'source-over');
    
    if (previewRecording && (QRuntime.game_frames % (60 / PREVIEW_FPS) === 0)) {
        processPreviewRecording();
    }

    if ((! isHosting || isFirefox || isSafari) && ! hasPostFX && ! gifRecording && (emulatorScreen.width === SCREEN_WIDTH && emulatorScreen.height === SCREEN_HEIGHT)) {
        // Directly upload to the screen. Fast path when there are no PostFX.
        //
        // Chromium (Chrome & Edge) have a bug where we can't get a video stream
        // from the direct putImageData, so they are excluded from this path when
        // hosting.
        ctx.putImageData(updateImageData, 0, 0);
    } else {
        // Put on an intermediate image and then stretch. This path is
        // for postFX and supporting Safari and other platforms where
        // context graphics can perform nearest-neighbor interpolation
        // but CSS scaling cannot.
        const updateCTX = updateImage.getContext('2d', {alpha: false});
        updateCTX.putImageData(updateImageData, 0, 0);
        
        if ($postFX.color.a > 0) {
            updateCTX.fillStyle = rgbaToCSSFillStyle($postFX.color);
            updateCTX.globalCompositeOperation = $postFX.color_blend;
            updateCTX.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        }

        ctx.save();

        if ($postFX.pos.x !== 0 || $postFX.pos.y !== 0 || $postFX.angle !== 0 || $postFX.scale.x !== 1 || $postFX.scale.y !== 1) {
            // Transformed

            const backgroundRevealed = $postFX.pos.x !== 0 || $postFX.pos.y !== 0 || $postFX.angle !== 0 || $postFX.scale.x < 1 || $postFX.scale.y < 1;

            if (backgroundRevealed) {
                // Fill revealed background areas. Unfortunately,
                // canvas patterns cannot clamp to border, so we
                // draw a big polygon

                const $background = QRuntime.$background;
                if ($background.spritesheet) {
                    ctx.fillStyle = '#000';
                } else {
                    const color = QRuntime.$colorToUint16($background);
                    ctx.fillStyle = '#' + (color & 0xf).toString(16) + ((color >> 4) & 0xf).toString(16) + ((color >> 8) & 0xf).toString(16);
                }
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(emulatorScreen.width, 0);
                ctx.lineTo(emulatorScreen.width, emulatorScreen.height);
                ctx.lineTo(0, emulatorScreen.height);
                ctx.lineTo(0, 0);
            }            

            ctx.translate(($postFX.pos.x / SCREEN_WIDTH  + 0.5) * emulatorScreen.width,
                          ($postFX.pos.y / SCREEN_HEIGHT + 0.5) * emulatorScreen.height); 
            ctx.rotate(-$postFX.angle);
            ctx.scale($postFX.scale.x, $postFX.scale.y);
            ctx.translate(-emulatorScreen.width * 0.5, -emulatorScreen.height * 0.5);

            if (backgroundRevealed) {
                // Cut out
                ctx.moveTo(0, 0);
                ctx.lineTo(0, emulatorScreen.height);
                ctx.lineTo(emulatorScreen.width, emulatorScreen.height);
                ctx.lineTo(emulatorScreen.width, 0);
                ctx.lineTo(0, 0);
                
                ctx.fill();
            }
        }
        
        if ($postFX.motion_blur > 0) {
            ctx.globalAlpha = 1 - $postFX.motion_blur;
        }
            
        ctx.drawImage(updateImage,
                      0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
                      0, 0, emulatorScreen.width, emulatorScreen.height);
        ctx.restore();
    }

    applyAfterglow($postFX.afterglow);
    maybeApplyBloom($postFX.bloom, allow_bloom);

    /*
    // Random graphics for debugging
    ctx.fillStyle = '#FF0';
    for (let i = 0; i < 2; ++i) {
        ctx.fillRect(Math.floor(Math.random() * 364), Math.floor(Math.random() * 204), 20, 20);
        ctx.fillStyle = '#04F';
    }
    */
    
    // Send the frame if this machine is an online host
    
    if (isHosting && hostVideoStream) {
        const track = hostVideoStream.getVideoTracks()[0];
        if (track.requestFrame) {
            track.requestFrame();
        }
    }
    
    if (gifRecording) {
        // Only record alternating frames to reduce file size
        if (gifRecording.frameNum & 1) {
            if (gifRecording.scale > 1) {
                // Repeat pixels
                gifCtx.imageSmoothingEnabled = false;
                gifCtx.drawImage(emulatorScreen,
                                 0, 0, emulatorScreen.width, emulatorScreen.height,
                                 0, 0, SCREEN_WIDTH * gifRecording.scale, SCREEN_HEIGHT * gifRecording.scale);
                gifRecording.addFrame(gifCtx, {delay: 1000/30, copy: true});
            } else {
                gifRecording.addFrame(updateImage.getContext('2d'), {delay: 1000/30, copy: true});
            }
        }
        ++gifRecording.frameNum;
        if (gifRecording.frameNum > 60 * 12) {
            // Stop after 12 seconds
            document.getElementById('recording').classList.add('hidden');
            gifRecording.render();
            gifRecording = null;
        }
    }

    refreshPending = true;
}