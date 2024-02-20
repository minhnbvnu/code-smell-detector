function stop_audio(handle) {
    // Intentionally fail silently
    if (handle === undefined) { return; }
    
    if (! (handle && handle.$source && handle.$source.stop)) {
        throw new Error("stop_audio() takes one argument that is the handle returned from play_sound()");
    }
    
    try { 
        handle.$source.state = 'STOPPED';
        handle.$source.resumePositionMs = handle.$source.audioContext.currentTime * 1000 - handle.$source.startTimeMs;
        handle.$source.stop();
    } catch (e) {
        // Ignore invalid state error if loading has not succeeded yet
    }
}