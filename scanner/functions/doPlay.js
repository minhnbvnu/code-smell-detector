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
    }