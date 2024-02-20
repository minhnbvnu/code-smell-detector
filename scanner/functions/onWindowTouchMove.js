function onWindowTouchMove(ev) {
        if (isWindowTouchMoveCancelled) {
            ev.preventDefault();
        }
    }