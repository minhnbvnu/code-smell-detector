function onCopyHostURLButton() {
    // Remove arguments that are 
    let url = location.href.replace(/(name|IDE|game|autoplay)=[^&]+/g, '').replace(/&&+/g, '&');
    if (url.indexOf('?') === -1) {
        url += '?';
    }

    if (! url.endsWith('?') && ! url.endsWith('&')) {
        url += '&';
    }

    // The host argument
    url += 'host=' + QRuntime.HOST_CODE.replace(/, /g, ',').replace(/ /g, '_');

    if (useIDE) {
        // Do not force the guest browser to go fullscreen, since the
        // developer is probably opening a window on the same machine
        // to debug.
        url += '&mode=DefaultWindow';
    }
    
    copyToClipboard(url);
    if (location.href.startsWith('http://127.0.0.1:')) {
        showPopupMessage("Note: URL only usable on this computer.");
    } else {
        showPopupMessage("Copied join URL to clipboard.");
    }
    emulatorKeyboardInput.focus({preventScroll:true});
}