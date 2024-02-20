function onPlayButton(slow, isLaunchGame, args, callback) {
    if (isSafari && ! isMobile) { unlockAudio(); }
    emulatorKeyboardInput.focus({preventScroll:true});

    if (! slow) {
        hideAllRuntimeDialogs();
    }

    // Stop guesting, if currently a guest, but do not stop hosting.
    // This can't come up when single stepping or in slow mode, which
    // are disabled for guests.
    stopGuesting(true);
    
    if (sleep.pollHandler) {
        clearTimeout(sleep.pollHandler);
        sleep.pollHandler = undefined;
    } 
    updateLastInteractionTime();
    
    if (uiMode === 'Editor') {
        // There is nothing useful to see in Editor mode when playing,
        // so switch to IDE mode, which is the closest one that
        // contains an emulator view.
        setUIMode('IDE');
    }
    
    const newTargetFramerate = slow ? SLOW_FRAMERATE : PLAY_FRAMERATE;

    maybeGrabPointerLock();
    if ((emulatorMode === 'play') && (targetFramerate === newTargetFramerate)) {
        // Already in play mode, just refocus input
        emulatorKeyboardInput.focus({preventScroll:true});
        return;
    }

    targetFramerate = newTargetFramerate;
    
    function doPlay() {
        if (slow) {
            document.getElementById('slowButton').checked = 1;
        } else {
            document.getElementById('playButton').checked = 1;
        }
        document.getElementById('playButton').checked = 1;
        setControlEnable('pause', true);
        audioContext.resume();
    
        setErrorStatus('');
        emulatorMode = 'play';
        profiler.reset();
        allow_bloom = true;

        previewRecordingFrame = 0;
        previewRecording = null;
        
        if (! coroutine) {
            // Game has not been compiled yet
            outputDisplayPane.innerHTML = '';
            compiledProgram = '';

            try {
                compiledProgram = compile(gameSource, fileContents, false);
                setErrorStatus('');
            } catch (e) {
                e.message = e.message.replace(/^line \d+: /i, '');
                if (e.message === 'Unexpected token :') {
                    e.message += ', probably due to a missing comma or { nearby';
                }
                if (! e.url) {
                    // This is probably an internal quadplay error
                    console.log(e);
                    return;
                }
                setErrorStatus(shortURL(e.url) + ' line ' + e.lineNumber + ': ' + e.message, {line_number: e.lineNumber, url: e.url});
                editorGotoFileLine(e.url, e.lineNumber, undefined, true);
            }
            
            if (compiledProgram) {
                // Compilation succeeded. Ready to execute. Reload the
                // runtime and compile and launch this code within it.
                programNumLines = compiledProgram.split('\n').length;

                if (gameSource.json.midi_sysex && midi && ! midi.$options.sysex) {
                    // Reinitialize MIDI using sysex requests, and wipe out MIDI devices while waiting
                    midiReset();
                    window.top.navigator.requestMIDIAccess({sysex: true, software: true}).then(onMIDIInitSuccess, onMIDIInitFailure);
                }
                
                restartProgram(isLaunchGame ? BOOT_ANIMATION.NONE : useIDE ? BOOT_ANIMATION.SHORT : BOOT_ANIMATION.REGULAR);
            } else {
                programNumLines = 0;
                onStopButton();
            }
            
        } else {
            // The game was already compiled, so just resume the loop
            lastAnimationRequest = setTimeout(mainLoopStep, 0);
            emulatorKeyboardInput.focus({preventScroll:true});
        }
        
        saveIDEState();

        if (callback) { callback(); }
    } // End of the doPlay callback used below
    

    if (emulatorMode === 'stop') {
        // Erase the table
        debugWatchTable = {};
        updateDebugWatchDisplay();

        // Reload the program
        if (loadManager && loadManager.status !== 'complete' && loadManager.status !== 'failure') {
            console.log('Load already in progress...');
        } else if (useIDE && ! isLaunchGame) {
            if (savesPending === 0) {
                // Force a reload of the game
                console.log('Reloading in case of external changes.')
                loadGameIntoIDE(window.gameURL, doPlay, false);
            } else {
                onStopButton();
                if (pendingSaveCallbacks.length > 0 || ! alreadyInPlayButtonAttempt) {
                    // Some saves haven't even been attempted.
                    //
                    // Force the saves to occur right now and then
                    // try running again shortly afterward.
                    runPendingSaveCallbacksImmediately();
                    
                    // Now reschedule pressing this button soon,
                    // after the saves complete. It might fail
                    // again, of course...in that case, we'll end
                    // up in the error message.
                    alreadyInPlayButtonAttempt = true;
                    setTimeout(function () {
                        try {
                            onPlayButton(slow, isLaunchGame, args);
                        } finally {
                            alreadyInPlayButtonAttempt = false;
                        }
                    }, 300);
                } else {
                    setErrorStatus('Cannot reload while saving. Try again in a second.');
                }
            }
        } else { // Not in IDE regular edit mode
            
            // Just play the game, no reload required because
            // we are in user mode.
            doPlay();
        }
    } else {
        console.assert(emulatorMode === 'step' || emulatorMode === 'pause');
        // Was just paused
        resumeAllSounds();
        doPlay();
        emulatorKeyboardInput.focus({preventScroll:true});
    }
}