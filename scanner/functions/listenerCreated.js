function listenerCreated() {
        if (!(listenerCnt++)) {
            window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
        }
    }