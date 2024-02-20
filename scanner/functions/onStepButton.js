function onStepButton() {
    switch (emulatorMode) {
    case 'play':
        onPauseButton();
        break;

    case 'stop':
    case 'pause':
        onPlayButton();
        if (emulatorMode === 'play') {
            emulatorMode = 'step';
        }
        break;
    }
}