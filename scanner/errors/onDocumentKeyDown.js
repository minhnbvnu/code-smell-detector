function onDocumentKeyDown(event) {
    if (onWelcomeScreen) {
        onWelcomeTouch();
        event.preventDefault();
        return;
    }

    wake();

    switch (event.which || event.keyCode) {
    case 187: // ^= ("^+") = zoom in
        if (! (event.ctrlKey || event.metaKey)) { break; }
        if (useIDE) {
            event.preventDefault();
            onIncreaseFontSizeButton();
        }
        break;
        
    case 189: // ^- = zoom out
        if (! (event.ctrlKey || event.metaKey)) { break; }
        if (useIDE) {
            event.preventDefault();
            onDecreaseFontSizeButton();
        }
        break;
        
    case 121: // F10 = single step
        event.preventDefault();
        if (! inModal() && useIDE) {
            onStepButton();
        }
        break;

    case screenshotKey: // F6
        if (event.shiftKey) {
            if (editableProject) {
                takeLabelImage();
            } else {
                $systemPrint('Cannot create a label image because this project is not editable.');
            }
        } else {
            downloadScreenshot();
        }
        break;

    case gifCaptureKey: // F8
        if (event.shiftKey) {
            if (! previewRecording) {
                if (editableProject) {
                    startPreviewRecording();
                } else {
                    $systemPrint('Cannot create a preview sequence because this project is not editable.');
                }
            }
        } else {
            toggleGIFRecording();
        }
        break;        
        
    case 116: // F5
        event.preventDefault();
        if (! inModal() && useIDE) {
            if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
                onRestartButton();
            } else if (event.shiftKey) {
                onStopButton();
            } else {
                onPlayButton();
            }
        }
        break;

    case 82: // R
        if (useIDE && (event.ctrlKey || event.metaKey)) { // Ctrl+R
            // Intercept from browser
            event.preventDefault();
            event.stopPropagation();
            if (! inModal()) { onRestartButton(); }
        }
        break;

    case 83: // S
        if (event.ctrlKey || event.metaKey) { // Ctrl+S; "save" is never needed
            // Intercept from browser
            event.preventDefault();
            event.stopPropagation();
        }
        break;

    case 219: // [
    case 221: // ]
    case 72: // H
        if (useIDE && (event.ctrlKey || event.metaKey)) {
            // Browser navigation keys...disable when in the IDE!
            event.preventDefault();
            event.stopPropagation();
        }
        break;
        
    case 71: // Ctrl+G = go to line
        if (useIDE && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            event.stopPropagation();
            onCodeEditorGoToLineButton();
        }
        break;
        
    case 80: // Ctrl+P = pause
        if (! event.ctrlKey && ! event.metaKey) { 
            return;
        }
        // Don't print or handle a P in game!
        // Intercept from browser
        event.preventDefault();
        event.stopPropagation();
        
    case 19: // [Ctrl+] Break
        if (useIDE) { onPauseButton(); }
        break;

    case 27: // Esc
        if (useIDE) {
            if (customContextMenu.style.visibility === 'visible') {
                customContextMenu.style.visibility = 'hidden';
                event.stopPropagation();
                event.preventDefault();
            }
        } else {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        break;
    }
}