function setPadType(p, type) {
    const prompt = controlSchemeTable[type];
    if (p === undefined || p < 0 || p > 3) { throw new Error('"set_pad_type" must be used with an index from 0 to 3'); }
    if (! prompt) { throw new Error('"set_pad_type" must be used with one of the legal types, such as "Quadplay" or "PS4" (received "' + type + '")'); }

    const gamepad = QRuntime.gamepad_array[p]
    gamepad.type = type;
    gamepad.prompt = Object.freeze(Object.assign({'##': '' + (p + 1)}, prompt));
    const id = gamepad.$id;
    if (id && !/^keyboard|^kbd_/i.test(type)) {
        // Update the autodetection table based on what we just learned from this user
        controllerTypeTable[id] = type;
        localStorage.setItem('controllerTypeTable', JSON.stringify(controllerTypeTable));
    }
    
    // Update the stored binding for this controller
    localStorage.setItem('pad0' + p, JSON.stringify({id: id, type: type}));
}