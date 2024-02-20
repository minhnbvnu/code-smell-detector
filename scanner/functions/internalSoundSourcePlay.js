function internalSoundSourcePlay(handle, sound, startPositionMs, loop, volume, pitch, pan, rate, stopped) {
    if (stopped === undefined) { stopped = false; }
    pan = Math.min(1, Math.max(-1, pan))
    
    const source = audioContext.createBufferSource();
    source.sound = sound;
    source.buffer = sound.$buffer;
    // Needed because AudioNode.context is undefined in the onEnded callback
    source.audioContext = audioContext;

    if (audioContext.createStereoPanner) {
        source.panNode = audioContext.createStereoPanner();
        source.panNode.pan.setValueAtTime(pan, audioContext.currentTime);
    } else {
        source.panNode = audioContext.createPanner();
        source.panNode.panningModel = 'equalpower';
        source.panNode.setPosition(pan, 0, 1 - Math.abs(pan));
    }
    source.gainNode = audioContext.createGain();
    source.gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    source.connect(source.panNode);
    source.panNode.connect(source.gainNode);
    source.gainNode.connect(audioContext.gainNode);
    
    source.onended = soundSourceOnEnded;
    source.state = 'PLAYING';
    
    if (! source.start) {
        // Backwards compatibility, needed on Safari
        source.start = source.noteOn;
        source.stop  = source.noteOff;
    }
    
    source.handle = handle;
    source.sound = sound;
    source.startTimeMs = audioContext.currentTime * 1000 - startPositionMs;
    source.loop = loop;
   
    activeSoundHandleMap.set(handle, true);
    handle.$source = source;
    handle.sound = sound;

    set_playback_rate(handle, rate);
    set_pitch(handle, pitch);
    set_volume(handle, volume);
    set_pan(handle, pan);

    source.start(0, (startPositionMs % (source.buffer.duration * 1000)) / 1000);
    if (stopped) {
        source.stop();
        source.resumePositionMs = source.startTimeMs;
        source.state = 'STOPPED';
    }

    return handle;
}