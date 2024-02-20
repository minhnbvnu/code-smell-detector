function stopGuesting(noResume) {
    if (isGuesting) {
        if (stopGuesting.oldScreenSize.x !== SCREEN_WIDTH || stopGuesting.oldScreenSize.y !== SCREEN_HEIGHT || stopGuesting.oldPrivateScreen !== PRIVATE_VIEW) {
            setFramebufferSize(stopGuesting.oldScreenSize.x, stopGuesting.oldScreenSize.y, stopGuesting.oldPrivateScreen);
        }

        QRuntime.$postFX.bloom = stopGuesting.oldBloom;
        
        document.querySelector('#pauseButtonContainer .buttonIcon').style.backgroundImage = 'url("button-pause.png")';
        document.getElementById('stepButtonContainer').style.visibility = 
            document.getElementById('slowButtonContainer').style.visibility = 
            document.getElementById('playButtonContainer').style.visibility = 'visible';
        
        document.getElementById('guestAudio').srcObject = null;
        document.getElementById('guestVideo').srcObject = null;
        if (myPeer) {
            console.log('stopGuesting()');
            myPeer.destroy();
            myPeer = null;
        }
    }
    isGuesting = false;
    
    // Shut down the streaming and resume quadplay. Fortunately...
    // quadplay's state was paused in the place where it should
    // resume.

    if (! noResume) {
        onPlayButton();
    }
}