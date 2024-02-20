function calculateCapIsNewExceptions(config) {
        let capIsNewExceptions = checkArray(config, "capIsNewExceptions", CAPS_ALLOWED);
        if (capIsNewExceptions !== CAPS_ALLOWED) {
            capIsNewExceptions = capIsNewExceptions.concat(CAPS_ALLOWED);
        }
        return capIsNewExceptions.reduce(invert, {});
    }