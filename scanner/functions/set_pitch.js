function set_pitch(handle, pitch) {
    if (! (handle && handle.$source)) {
        throw new Error("Must call set_pitch() on a sound returned from play_sound()");
    }
    if (typeof pitch !== 'number' || isNaN(pitch) || ! isFinite(pitch) || pitch <= 0) {
        throw new Error("The pitch must be a positive finite number (got " + pitch + ")");
    }
    handle.$source.pitch = pitch;
    pitch *= handle.$source.sound.$base_pitch;
    if (handle.$source.detune) {
        // The detune argument is in cents:
        //
        // c = 1200 * log2 (f2 / f1)
        // c = 1200 * log2(pitch)
        handle.$source.detune.linearRampToValueAtTime(Math.log2(pitch) * 1200, handle.$source.context.currentTime + audioRampTime);
    } else if (! warnedAboutPitch) {
        if (isSafari) {
            showPopupMessage('Safari does not support pitch changes.');
        } else {
            showPopupMessage('This browser does not support pitch changes.');
        }
        warnedAboutPitch = true;
    }
}