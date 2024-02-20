function emulatorScreenEventCoordToQuadplayScreenCoord(event) {
    const rect = emulatorScreen.getBoundingClientRect();
    
    let zoom = 1;
    if (isSafari) {
        zoom = parseFloat(document.getElementById('screenBorder').style.zoom || '1');
    }

    return {x: clamp(Math.floor(emulatorScreen.width  * (event.clientX - rect.left * zoom) / (rect.width * zoom)), 0, emulatorScreen.width  - 1) - 0.5,
            y: clamp(Math.floor(emulatorScreen.height * (event.clientY - rect.top  * zoom) / (rect.height * zoom)), 0, emulatorScreen.height - 1) - 0.5};
}