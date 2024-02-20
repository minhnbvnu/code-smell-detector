function getGamepads() {
    
    if (getGamepads.counter === 0 || (! getGamepads.gamepads) || getGamepads.gamepads.length === 0) {
        // Update
        getGamepads.gamepads = getGamepads.navigator.getGamepads();//getGamepads.poll();
    }

    // Amortize the cost over four frames
    if (getGamepads.gamepads.length > 0 || ++getGamepads.counter >= 4) {
        getGamepads.counter = 0;
    }

    return getGamepads.gamepads;
}