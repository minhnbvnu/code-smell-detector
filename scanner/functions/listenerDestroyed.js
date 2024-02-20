function listenerDestroyed() {
        if (!(--listenerCnt)) {
            window.removeEventListener('touchmove', onWindowTouchMove, { passive: false });
        }
    }