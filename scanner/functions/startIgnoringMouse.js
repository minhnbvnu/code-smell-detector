function startIgnoringMouse() {
        ignoreMouseDepth++;
        setTimeout(function () {
            ignoreMouseDepth--;
        }, core.config.touchMouseIgnoreWait);
    }