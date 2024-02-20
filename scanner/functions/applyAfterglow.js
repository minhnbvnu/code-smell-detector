function applyAfterglow(burn) {
    const intensity = Math.max(burn.r, burn.g, burn.b);
    if (intensity > 0) {
        afterglowScreen.style.visibility = 'visible';
        afterglowScreen.style.opacity = '' + (Math.pow(intensity, 0.8) * 0.7);
        
        // Falloff
        afterglowCTX.globalAlpha = 1;
        afterglowCTX.globalCompositeOperation = 'multiply';
        const scale = 250 / Math.pow(intensity, 0.99);
        afterglowCTX.fillStyle = `rgb(${burn.r * scale}, ${burn.g * scale}, ${burn.b * scale})`;
        afterglowCTX.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        // Additive blend
        afterglowCTX.globalCompositeOperation = 'lighten';
        afterglowCTX.globalAlpha = 1;
        afterglowCTX.drawImage(emulatorScreen, 0, 0);

        afterglowCTX.globalCompositeOperation = 'source-over';
        afterglowCTX.fillStyle = '#000';
    } else {
        if (applyAfterglow.prev > 0) {
            // When burn is first turned off, wipe the context so that it
            // does not remain present when turned on again
            afterglowCTX.clearRect(0, 0, emulatorScreen.width, emulatorScreen.height);
        }
        afterglowScreen.style.visibility = 'hidden';
    }
    applyAfterglow.prev = intensity;
}