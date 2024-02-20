function updateDebugger(showHTML) {
    const frame = profiler.smoothFrameTime.get();
    const logic = profiler.smoothLogicTime.get();
    const physics = profiler.smoothPhysicsTime.get();

    // Show the time that GPU graphics is actually taking
    // per frame it processes, with no scaling.
    const gpu = profiler.smoothGPUTime.get();
    
    // Show the time that CPU graphics *would* be taking if
    // it wasn't for the frame rate scaler
    const graphics = profiler.smoothGraphicsTime.get() * QRuntime.$graphicsPeriod;
    const compute = logic + physics + graphics;
    const browser = Math.max(0, frame - compute);
    
    // Use 18 instead of 16.67 ms as the cutoff for displaying
    // overhead because there are sometimes very slight roundoffs
    // due to the timer callback being inexact.
    
    onScreenHUDDisplay.time.frame = (frame > 18) ? frame : compute;
    onScreenHUDDisplay.time.browser = (frame > 17.2) ? browser : 0;
    onScreenHUDDisplay.time.logic = logic;
    onScreenHUDDisplay.time.physics = physics;
    onScreenHUDDisplay.time.graphics = graphics;
    onScreenHUDDisplay.time.gpu = gpu;
    onScreenHUDDisplay.time.refresh = Math.round(60 / QRuntime.$graphicsPeriod);

    if (! showHTML) {
        // Only update the on-screen profiler values
        return;
    }
    
    updateTimeDisplay(onScreenHUDDisplay.time.frame, 'Frame');
    updateTimeDisplay(onScreenHUDDisplay.time.browser, 'Browser');
    updateTimeDisplay(logic, 'Logic');
    updateTimeDisplay(physics, 'Physics');
    updateTimeDisplay(graphics, 'Gfx');

    if ($THREADED_GPU) { updateTimeDisplay(gpu, 'GPU'); }

    if (profiler.debuggingProfiler) { updateTimeDisplay(frame, 'Interval'); }

    let color = 'unset';
    if (QRuntime.$graphicsPeriod === 2) {
        color = '#fe4';
    } else if (QRuntime.$graphicsPeriod > 2) {
        color = '#f30';
    }

    debugFrameRateDisplay.style.color = debugFramePeriodDisplay.style.color = color;
    const fps = '' + Math.round(60 / QRuntime.$graphicsPeriod);
    debugFrameRateDisplay.innerHTML = fps + '&#8239;Hz';
    debugGraphicsFPS.innerHTML = fps;
    debugFramePeriodDisplay.innerHTML = '(' + ('1½⅓¼⅕⅙'[QRuntime.$graphicsPeriod - 1]) + '×)';
    
    // Only display if the graphics period has just ended, otherwise the display would
    // be zero most of the time
    if (window.QRuntime && QRuntime.$previousGraphicsCommandList) {
        debugDrawCallsDisplay.innerHTML = '' + QRuntime.$previousGraphicsCommandList.length;
    }
    
    // console.log(QRuntime.game_frames, debugWatchEnabled.checked, emulatorMode, debugWatchTable.changed);
    if ((QRuntime.game_frames === 0 || debugWatchEnabled.checked) && ((emulatorMode === 'play') || debugWatchTable.changed)) {
        updateDebugWatchDisplay();
    }

    if (QRuntime.$gameMode) {
        if (QRuntime.$modeStack.length) {
            let s = '';
            for (let i = 0; i < QRuntime.$modeStack.length; ++i) {
                s += QRuntime.$modeStack[i].$name + ' → ';
            }
            debugModeDisplay.innerHTML = s + QRuntime.$gameMode.$name;
        } else {
            debugModeDisplay.innerHTML = QRuntime.$gameMode.$name;
        }
    } else {
        debugModeDisplay.innerHTML = '∅';
    }
    
    if (QRuntime.$prevMode) {
        debugPreviousModeDisplay.innerHTML = QRuntime.$prevMode.$name;
    } else {
        debugPreviousModeDisplay.innerHTML = '∅';
    }
    
    debugModeFramesDisplay.innerHTML = '' + QRuntime.mode_frames;
    debugGameFramesDisplay.innerHTML = '' + QRuntime.game_frames;
}