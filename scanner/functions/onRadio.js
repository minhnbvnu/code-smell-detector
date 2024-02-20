function onRadio() {
    // Controls
    if (pressed('play')) {
        onPlayButton();
    } else if (pressed('slow') && ((emulatorMode !== 'play') || (targetFramerate !== SLOW_FRAMERATE))) {
        onSlowButton();
    } else if (pressed('pause') && (emulatorMode === 'play')) {
        onPauseButton();
    } else if (pressed('stop') && (emulatorMode !== 'stop')) {
        onStopButton();
    } else if (pressed('step') && (emulatorMode !== 'step')) {
        onStepButton();
    }

    // UI Layout
    if (pressed('emulatorUI') && (uiMode !== 'Emulator')) {
        setUIMode('Emulator');
    } else if (pressed('testUI') && (uiMode !== 'Test')) {
        setUIMode('Test');
    } else if (pressed('IDEUI') && (uiMode !== 'IDE')) {
        setUIMode('IDE');
    } else if (pressed('wideIDEUI') && (uiMode !== 'WideIDE')) {
        setUIMode('WideIDE');
    } else if (pressed('maximalUI') && (uiMode !== 'Maximal')) {
        setUIMode('Maximal');
    } else if (! isMobile && pressed('windowedUI') && (uiMode !== 'Windowed')) {
        setUIMode('Windowed');
    } else if (pressed('editorUI') && (uiMode !== 'Editor')) {
        setUIMode('Editor');
    } else if (pressed('ghostUI') && (uiMode !== 'Ghost')) {
        setUIMode('Ghost');
    }

    saveIDEState();
}