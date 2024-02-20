function resume_audio(handle) {
    if (! (handle && handle.$source && handle.$source.stop)) {
        throw new Error("resume_audio() takes one argument that is the handle returned from play_sound()");
    }
    
    if (handle.$source.state !== 'PLAYING') {
        // A new source must be created every time that the sound is
        // played or resumed. There is no way to pause a source in the
        // current WebAudio API.
        internalSoundSourcePlay(handle, handle.$source.sound, handle.$source.resumePositionMs, handle.$source.loop, handle.$source.volume, handle.$source.pitch, handle.$source.pan, handle.$source.rate);
    }
}