function reduceTapEvent(e) {
        // To simplify I ignore multiple touch events and only return the first event
        if (e.touches && e.touches.length) { e = e.touches[0]; }
        else if (e.changedTouches && e.changedTouches.length) { e = e.changedTouches[0];}
        return e
    }