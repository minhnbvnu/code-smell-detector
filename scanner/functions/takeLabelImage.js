function takeLabelImage() {
    // Don't capture labels at tiny resolutions
    if (SCREEN_WIDTH < 128) {
        console.log('Cannot capture label images below 128 width');
        return;
    }

    // Copy the center 128x128
    const label = document.createElement('canvas');
    label.width = 128; label.height = 128;
    const ctx = label.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(emulatorScreen, (SCREEN_WIDTH - 128) >> 1, (SCREEN_HEIGHT - 128) >> 1, 128, 128, 0, 0, 128, 128);
    download(label.toDataURL(), 'label128.png');

    label.width = 64; label.height = 64;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(emulatorScreen, (SCREEN_WIDTH - 128) >> 1, (SCREEN_HEIGHT - 128) >> 1, 128, 128, 0, 0, 64, 64);
    download(label.toDataURL(), 'label64.png');
}