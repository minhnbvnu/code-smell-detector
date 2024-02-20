function setFramebufferSize(w, h, privateScreen) {
    if (privateScreen === undefined) {
        privateScreen = PRIVATE_VIEW;
    }
    
    SCREEN_WIDTH = w;
    SCREEN_HEIGHT = h;
    PRIVATE_VIEW = privateScreen;
    emulatorScreen.width = w;
    emulatorScreen.height = h;
    overlayScreen.width = afterglowScreen.width = w;
    overlayScreen.height = afterglowScreen.height = h;
    /*
    // Performance test:
    overlayScreen.width = afterglowScreen.width = w / 2;
    overlayScreen.height = afterglowScreen.height = h / 2;
    overlayScreen.width = afterglowScreen.style.width = '384px';
    overlayScreen.height = afterglowScreen.style.height = '224px';
    */

    updateImage.width  = w;
    updateImage.height = h;
    updateImageData = ctx.createImageData(w, h);
    updateImageData32 = new Uint32Array(updateImageData.data.buffer);
    QRuntime.$updateImageData = updateImageData;
    QRuntime.$updateImageData32 = updateImageData32;

    bootScreen.style.fontSize = '' + Math.max(10 * SCREEN_WIDTH / 384, 4) + 'px';
    
    // The layout may need updating as well
    setTimeout(onResize, 0);
    setTimeout(onResize, 250);
    setTimeout(onResize, 1250);

    if (QRuntime && gameSource && gameSource.constants && (emulatorMode !== 'stop')) {
        QRuntime.$resize_framebuffer(SCREEN_WIDTH, SCREEN_HEIGHT);
    
        // Rebind the constants
        redefineScreenConstants();
    }

    if (isHosting) {
        notifyGuestsOfFramebufferSize();
    }

    onResize();
}