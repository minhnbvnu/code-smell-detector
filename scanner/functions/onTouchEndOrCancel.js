function onTouchEndOrCancel(event) {
    // Add the new touches
    for (let i = 0; i < event.changedTouches.length; ++i) {
        const touch = event.changedTouches[i];
        const tracker = activeTouchTracker[touch.identifier];
        
        // The tracker *should* be found, but check defensively
        // against weird event delivery
        if (tracker) {
            if (tracker.lastTarget === emulatorScreen || tracker.lastTarget === overlayScreen || tracker.lastTarget === afterglowScreen) {
                // Lost contact with screen
                QRuntime.touch.a = 0;
                QRuntime.touch.released_a = 1;
            }
            
            // Delete is relatively slow (https://jsperf.com/delete-vs-undefined-vs-null/16),
            // but there are far more move events than end events and the table is more
            // convenient and faster for processing move events than an array.
            delete activeTouchTracker[touch.identifier];            
        }
    }
    
    onTouchesChanged(event);
    return false;
}