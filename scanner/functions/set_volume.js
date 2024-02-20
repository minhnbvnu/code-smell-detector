function set_volume(handle, volume) {
    if (! (handle && handle.$source)) {
        throw new Error("Must call set_volume() on a sound returned from play_sound()");
    }
    if (typeof volume !== 'number' || isNaN(volume) || ! isFinite(volume)) {
        throw new Error("The volume must be a finite number (got " + volume + ")");
    }
    handle.$source.volume = volume;
    volume *= handle.$source.sound.$base_volume;
    handle.$source.gainNode.gain.linearRampToValueAtTime(volume, handle.$source.context.currentTime + audioRampTime);
}