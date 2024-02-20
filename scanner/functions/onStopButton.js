function onStopButton(inReset, preserveNetwork) {
    hideAllRuntimeDialogs();
    
    if (! preserveNetwork) {
        stopHosting();
        stopGuesting(true);
    }
    
    if (! inReset) {
        document.getElementById('stopButton').checked = 1;
        setControlEnable('pause', false);
        emulatorMode = 'stop';
        saveIDEState();
    }

    // Destroy the virtual GPU
    if (QRuntime.$GPU) { QRuntime.$GPU.terminate(); }
    usePointerLock = false;
    releasePointerLock();
    stopAllSounds();
    coroutine = null;
    clearTimeout(lastAnimationRequest);
    clearInterval(lastAnimationRequest);
    lastAnimationInterval = undefined;
    ctx.fillStyle = '#000000';
    afterglowCTX.fillStyle = '#000000';
    overlayCTX.fillStyle = '#000000';
    ctx.fillRect(0, 0, emulatorScreen.width, emulatorScreen.height);
    overlayCTX.clearRect(0, 0, emulatorScreen.width, emulatorScreen.height);
    afterglowCTX.clearRect(0, 0, emulatorScreen.width, emulatorScreen.height);
    overlayScreen.style.visibility = afterglowScreen.style.visibility = 'hidden';
}