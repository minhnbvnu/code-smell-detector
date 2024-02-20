function setScreenBorderScale(screenBorder, scale) {
    const showPrivateViewsEnabled = document.getElementById('showPrivateViewsEnabled').checked;

    if (PRIVATE_VIEW && ! isGuesting && ! showPrivateViewsEnabled) {
        scale *= 2;
    }
    
    let zoom = 1;
    if (hasBrowserScaleBug) {
        // On Safari, CSS scaling overrides the crisp image rendering.
        // We have to zoom instead (zoom acts differently on other browsers,
        // so we don't use zoom on all platforms).
        screenBorder.style.zoom = '' + scale;
        zoom = scale;
    } else {
        // Setting the scale transform triggers really slow rendering on Raspberry Pi unless we
        // add the "translate3d" hack to trigger hardware acceleration.
        screenBorder.style.transform = 'scale(' + scale + ') translate3d(0,0,0)';
    }

    return zoom;
}