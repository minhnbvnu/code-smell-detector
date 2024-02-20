function onPauseButton() {
    if (emulatorMode === 'play' || emulatorMode === 'step') {
        document.getElementById('pauseButton').checked = 1;
        emulatorMode = 'pause';
        releasePointerLock();
        pauseAllSounds();
        clearInterval(lastAnimationRequest);
        lastAnimationInterval = undefined;
    }
}