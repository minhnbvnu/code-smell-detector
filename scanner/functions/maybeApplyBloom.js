function maybeApplyBloom(bloom, enable) {
    if (bloom > 0 && enable) {
        overlayScreen.style.visibility = 'visible';
        // Apple devices are gamma corrected and the bloom looks dimmer as a
        // result, so we boost it
        const b = Math.pow(bloom, 1.5) * (isApple ? 1.5 : 1.0);
        const filter = `brightness(${0.45 + b * (1 - 0.45)}) contrast(3) blur(2.5px)` + (bloom > 0.5 ? ` brightness(${0.75 * bloom + 0.5})`: '');
        if (overlayScreen.style.filter !== filter) { overlayScreen.style.filter = filter; }
        overlayCTX.drawImage(emulatorScreen, 0, 0);
    } else {
        overlayScreen.style.visibility = 'hidden';
    }
}