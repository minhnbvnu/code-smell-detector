function onWelcomeTouch(hasTouchScreen) {
    hasTouchScreen = hasTouchScreen || isMobile;
   
    onWelcomeScreen = false;
    const welcome = document.getElementById('welcome');
    welcome.style.zIndex = -100;
    welcome.style.visibility = 'hidden';
    welcome.style.display = 'none';

    unlockAudio();
    
    if ((uiMode === 'Maximal' || uiMode === 'Windowed') && ! useIDE && hasTouchScreen) {
        // This device probably requires on-screen controls.
        // Setting the UI mode forces fullscreen as well.
        setUIMode('Emulator');
    } else if ((! useIDE && uiMode !== 'Windowed') || hasTouchScreen) {
        if (deployed && (isMobile || getQueryString('mode') !== 'DefaultWindow')) { requestFullScreen(); }
    }

    let url = getQueryString('game');
    let other_host_code = getQueryString('host');
    
    const showPause = (url || other_host_code) && ! useIDE;
    
    url = url || launcherURL;
    // If the url doesn't have a prefix and doesn't begin with a slash,
    // assume that it is relative to the quadplay script in the parent dir.
    if (! (/^(.{3,}:\/\/|[\\/])/).test(url)) {
        url = '../' + url;
    }

    // For loading into a game directly
    const callback = (other_host_code ?
                      function () {
                          const otherNetID = wordsToNetID(other_host_code.split(/[_,]/));
                          startGuesting(otherNetID);
                      } : undefined);
        
    
    if (showPause) {
        // Show the pause message before loading when running a
        // standalone game (not in IDE, not loading the launcher)
        const pauseMessage = document.getElementById('pauseMessage');
        pauseMessage.style.zIndex = 120;
        pauseMessage.style.visibility = 'visible';
        pauseMessage.style.opacity = 1;
        setTimeout(function () {
            pauseMessage.style.opacity = 0;
            setTimeout(function() {
                pauseMessage.style.visibility = 'hidden';
                pauseMessage.style.zIndex = 0;
                onPlayButton(undefined, undefined, undefined, callback);
            }, 200);
        }, 3000);
    } else {
        onPlayButton(undefined, undefined, undefined, callback);
    }
}