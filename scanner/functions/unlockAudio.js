function unlockAudio() {
    // Play a silent sound in order to unlock audio on platforms
    // that require audio to first initiate on a click.
    //
    // https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
    
    // create empty buffer
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    // connect to output (your speakers)
    source.connect(audioContext.destination);
    
    // play the file
    if (source.noteOn) {
        source.noteOn(0);
    } else {
        source.start(0);
    }
}