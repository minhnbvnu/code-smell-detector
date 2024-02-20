function set_playback_rate(handle, rate) {
    if (! (handle && handle.$source)) {
        throw new Error("Must call set_volume() on a sound returned from play_sound()");
    }
    handle.$source.rate = rate;
    rate *= handle.$source.sound.$base_rate;
    handle.$source.playbackRate.value = rate;
}