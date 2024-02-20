function onReorderGamepadsDone() {
    hideReorderGamepadsDialog();
    
    // Set the unassigned values
    for (let i = showReorderGamepadsDialog.index; i <= 3; ++i) {
        // These are the unset ones. Temporarily make them values that
        // won't match existing values so that we can use indexOf
        showReorderGamepadsDialog.map[i] = 9;
    }

    // Iterate again, setting gamepad i
    for (; showReorderGamepadsDialog.index <= 3; ++showReorderGamepadsDialog.index) {
        // Choose the first unused value
        for (let g = 0; g < i; ++g) {
            // Is g in use?
            if (showReorderGamepadsDialog.map.indexOf(g) === -1) {
                // This one is free
                showReorderGamepadsDialog.map[showReorderGamepadsDialog.index] = g;
                break;
            }
        }
    }
    
    setGamepadOrderMap(showReorderGamepadsDialog.map);
}