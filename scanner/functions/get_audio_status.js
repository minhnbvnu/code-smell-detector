function get_audio_status(handle) {
    if (! (handle && handle.$source)) {
        throw new Error("Must call get_sound_status() on a sound returned from play_sound()");
    }

    const source = handle.$source;

    let now = 0;
    if (source.state === 'PLAYING') {
        now = source.context.currentTime * 1000 - source.startTimeMs;
    } else {
        now = source.resumePositionMs;
    }
    now *= 0.001;
        
    return {
        sound:    source.sound,
        pitch:    source.pitch,
        volume:   source.volume,
        playback_rate: source.rate,
        pan:      source.pan,
        loop:     source.loop,
        state:    source.state,
        now:      now
    }
}