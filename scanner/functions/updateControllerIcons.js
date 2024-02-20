function updateControllerIcons() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    let num = 0;
    for (let i = 0; i < gamepads.length; ++i) {
        const pad = gamepads[i];
        if (pad && pad.connected) {
            // Enable this icon
            const element = document.getElementById('controllerIcon' + num);
            element.className = 'controllerPresent';
            element.title = pad.id + '\n\nClick for details';
            ++num;
        }
    }

    // Disable the remaining icons
    while (num < 4) {
        const element = document.getElementById('controllerIcon' + num);
        element.className = 'controllerAbsent';
        element.title = 'Connect a game controller and press a button on it';
        ++num;
    }
}