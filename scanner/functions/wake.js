function wake() {
    // Wake if asleep (we might be in pause mode because we're a guest, too)
    if (autoSleepEnabled && (emulatorMode === 'pause') && (document.getElementById('sleep').style.visibility === 'visible')) {
        document.getElementById('sleep').style.visibility = 'hidden';
        onPlayButton();
        
        // The set focus doesn't work without this delay for some reason
        setTimeout(function() { emulatorKeyboardInput.focus({preventScroll:true}); });
        
        // sleep.pollHandler will be removed by onPlayButton()

        // Unless told not to, check for update on waking since
        // sleeping disables update checks. This is for the case of
        // someone waking up their console specfically to upgrade it
        if ((getQueryString('update') && getQueryString('update') !== '0') && isQuadserver && getQueryString('kiosk') !== 1) {
            checkForUpdate();
        }
    }
}