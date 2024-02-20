function setGamepadOrderMap(map) {
    const pane = document.getElementById('gamepadIndexPane');

    if (map[0] === DISABLED_GAMEPAD &&
        map[1] === DISABLED_GAMEPAD &&
        map[2] === DISABLED_GAMEPAD &&
        map[3] === DISABLED_GAMEPAD) {
        // Unmapping all gamepads is pointless and will
        // leave no way back without a keyboard, so if
        // all are unmapped, force the default mapping.
        map = [0, 1, 2, 3];
    }

    let s = '';
    if (map[0] === 0 && map[1] === 1 && map[2] === 2 && map[3] === 3) {
        // Default configuration
        s = 'Your gamepads are in default order.';
    } else {
        s = 'Your gamepads are in custom order:<br>';
        for (let i = 0; i < 4; ++i) {
            const m = map[i];
            s += `P${i + 1}&nbsp;=&nbsp;${(m === DISABLED_GAMEPAD) ? '∅' : 'controller' + (m + 1)}${i < 3 ? ', ' : '.<br/>'}`;
        }
    }
    pane.innerHTML = s + ' <a title="Change gamepad order" onclick="showReorderGamepadsDialog(); return false" href="#">Click to change</a>';
    gamepadOrderMap = map.slice();
    localStorage.setItem('gamepadOrderMap', gamepadOrderMap.join(''));
}