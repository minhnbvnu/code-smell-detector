function mainLoopStep() {
    // Keep the callback chain going
    if (emulatorMode === 'play') {
        if (autoSleepEnabled && (Date.now() - lastInteractionTime > IDLE_PAUSE_TIME_MILLISECONDS)) {
            sleep();
            return;
        }
        
        // We intentionally don't use requestAnimationFrame. It can go
        // above 60 Hz and require explicit throttling on high-refresh
        // displays. And when the game is falling below frame rate, we
        // don't trust requestAnimationFrame to reliably hit our
        // fractions of 60 Hz. Schedule the next step at the *start* of this
        // one, so that the time for processing the step does not create a
        // delay.
        //
        // Do not account for QRuntime.$graphicsPeriod here. Always
        // try to run at 60 Hz for input processing and game
        // execution, and drop graphics processing in QRuntime.$show()
        // some of the time.
        //
        // setInterval seems to be slightly faster than setTimeout on
        // Chromium, which costs >5% of the total frame time in call
        // according to the browser profiler.
        
        const interval = Math.floor(1000 / targetFramerate - 1);
        if (interval !== lastAnimationInterval) {
            // New interval
            clearInterval(lastAnimationRequest);
            lastAnimationRequest = setInterval(mainLoopStep, interval);
            lastAnimationInterval = interval;
        }
    }

    // Physics time may be spread over multiple QRuntime.physics_simulate() calls,
    // but graphics is always a single QRuntime.$show() call. Graphics time may
    // be zero on any individual call.
    QRuntime.$physicsTimeTotal = 0;
    QRuntime.$graphicsTime = 0;
    QRuntime.$missedFrames = 0;
    QRuntime.$logicToGraphicsTimeShift = 0;

    // Run the "infinite" loop for a while, maxing out at just under 1/60 of a second or when
    // the program explicitly requests a refresh or keyboard update via $show(). Note that
    // refreshPending may already be false if running with $graphicsPeriod > 1, but it does
    // no harm to set it back to false in that case.
    refreshPending = false;
    updateKeyboardPending = false;
    midiBeforeFrame();

    profiler.startFrame();
    // Run until the end of the game's natural main loop excution, the
    // game invokes QRuntime.$show(), or the user ends the
    // program. The game may suppress its own graphics computation
    // inside QRuntime.$show() if it is running too slowly.
    try {
        const frameStart = profiler.now();
        
        // 10 fps failsafe for code that is returning but not invoking
        // $submitFrame() somehow.
        const endTime = frameStart + 100;

        while (! updateKeyboardPending && ! refreshPending && (performance.now() < endTime) && (emulatorMode === 'play' || emulatorMode === 'step') && coroutine) {
            // Time interval at which to check for new **gamepad**
            // input; won't be able to process keyboard input since
            // that requires events, which requires going out to the
            // main JavaScript loop.
            const gamepadSampleTime = performance.now() + 1000 / 60;
            updateInput();
            while (! updateKeyboardPending && ! refreshPending && (performance.now() < gamepadSampleTime) && (emulatorMode === 'play' || emulatorMode === 'step') && coroutine) {
                coroutine();
            }
        }

        // Based on events, so has to happen outside of the loop
        if (refreshPending) {
            resetTouchInput();
        }

    } catch (e) {
        if (e.reset_game === 1) {
            // Automatic
            onStopButton(true);
            restartProgram(BOOT_ANIMATION.NONE);
            return;
        } else if (e.quit_game === 1) {
            if (useIDE) {
                // Ignore the quit setting and always stop when in the IDE
                onStopButton();
            } else switch (quitAction) {
                case 'none': {
                    console.log('Ignoring quit_game() received when quit=none');
                    return;
                }
                
                case 'close': {
                    // JavaScript can't close a tab unless JavaScript opened it
                    // to begin with, so this is the best that we can do outside
                    // of a standalone binary.
                    try { page.close(); } catch (ignore) {}
                    try { window.close(); } catch (ignore) {}
                    try { document.exitFullscreen(); } catch (ignore) {}
                    window.location = 'about:blank';
                    return;
                }
                
                case 'reload': {
                    inPageReload = true;
                    try { document.exitFullscreen(); } catch (ignore) {}
                    location = location;
                    return;
                }
                
                default:// 'launcher'
                    goToLauncher();
            }
        } else if (e.launch_game !== undefined) {
            console.log('Loading because launch_game() was called.');
            loadGameIntoIDE(e.launch_game, function () {
                onResize();
                onPlayButton(false, true, e.args);
            });
        } else {
            // Runtime error
            onError(e);
        }
    }

    // The frame has ended
    if (! previewRecording) {
        // Only adjust framerate if not preview recording
        profiler.endFrame(QRuntime.$physicsTimeTotal, QRuntime.$graphicsTime, QRuntime.$logicToGraphicsTimeShift, QRuntime.$missedFrames);
    }
    midiAfterFrame();
   
    // Only update the profiler display periodically, because doing so
    // takes about 2ms of frame time on a midrange modern computer.
    if (useIDE && (((QRuntime.mode_frames - 1) % (8 * QRuntime.$graphicsPeriod) === 0) ||
         (targetFramerate < PLAY_FRAMERATE) ||
         (emulatorMode === 'step'))) {

        const showHTML = (uiMode === 'Test') || (uiMode === 'IDE') || (uiMode === 'WideIDE');
        updateDebugger(showHTML);
    }
    
    if (targetFramerate < PLAY_FRAMERATE || emulatorMode === 'step') {
        // Force the profiler to avoid resetting the
        // graphics rate when in slow mode.
        profiler.reset();
    }

    // Update to the profiler's new model of the graphics period
    QRuntime.$graphicsPeriod = profiler.graphicsPeriod;
    QRuntime.$skipGraphics = (QRuntime.mode_frames % QRuntime.$graphicsPeriod) !== 0;
    
    if (emulatorMode === 'step') {
        onPauseButton();
    }
}