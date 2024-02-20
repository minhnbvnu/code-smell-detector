function setUIMode(d, noFullscreen) {
    if (! useIDE && (d === 'IDE' || d === 'WideIDE' || d === 'Ghost' || d === 'Editor' || d === 'Test')) {
        // When in dedicated play, no-IDE mode and the UI was
        // previously set to UI, fall back to the emulator.
        d = 'Emulator';
    }

    uiMode = d;
    const body = document.getElementsByTagName('body')[0];

    // Set the CSS class
    body.classList.remove('MaximalUI');
    body.classList.remove('EmulatorUI');
    body.classList.remove('IDEUI');
    body.classList.remove('WideIDEUI');
    body.classList.remove('EditorUI');
    body.classList.remove('GhostUI');
    body.classList.remove('TestUI');
    body.classList.add((uiMode === 'Windowed' ? 'Maximal' : uiMode) + 'UI');

    // Check the appropriate radio button
    document.getElementById({'IDE'      : 'IDEUIButton',
                             'WideIDE'  : 'wideIDEUIButton',
                             'Emulator' : 'emulatorUIButton',
                             'Test'     : 'testUIButton',
                             'Maximal'  : 'maximalUIButton',
                             'Windowed' : 'windowedUIButton',
                             'Editor'   : 'editorUIButton',
                             'Ghost'    : 'ghostUIButton'}[uiMode] || 'maximalUIButton').checked = 1;

    if (((uiMode === 'Maximal') || ((uiMode === 'Emulator') && ! useIDE)) && ! noFullscreen && ! document.fullscreenElement) {
        requestFullScreen();
    }

    if (uiMode === 'Windowed' && document.fullscreenElement) {
        // Undo fullscreen
        try {
            document.exitFullscreen();
        } catch {
        }
    }

    // Need to wait for layout to update before the onResize handler
    // has correct layout sizes.
    setTimeout(onResize, 100);

    // Reset keyboard focus
    emulatorKeyboardInput.focus({preventScroll:true});

    // Ace doesn't notice CSS changes. This explicit resize is needed
    // to ensure that the editor can fully scroll horizontally
    // in 'wide' mode
    if (useIDE) { setTimeout(function() { aceEditor.resize(); }); }

    // Force a debugger update so that the stats are correct
    // when switching back to it
    updateDebugger();
}