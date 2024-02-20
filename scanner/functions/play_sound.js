function play_sound(sound, loop, volume, pan, pitch, time, rate, stopped) {
    if (sound.sound && (arguments.length === 1)) {
        // Object version
        loop    = sound.loop;
        volume  = sound.volume;
        pan     = sound.pan;
        pitch   = sound.pitch;
        time    = sound.time;
        rate    = sound.playback_rate;
        stopped = sound.stopped;
        sound   = sound.sound;
    }

    if (pan && (pan.x !== undefined) && (pan.y !== undefined)) {
        // Positional sound
        pan = transform_cs_to_ss(transform_ws_to_cs(pan));
        pan = $clamp((2 * pan.x / SCREEN_SIZE.x) - 1, -1, 1);
    }

    return $play_sound(sound, loop, volume, pan, pitch, time, rate, stopped);
}