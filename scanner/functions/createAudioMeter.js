function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
    var processor = audioContext.createScriptProcessor(512)
    processor.onaudioprocess = volumeAudioProcess
    processor.clipping = false
    processor.lastClip = 0
    processor.volume = 0
    processor.clipLevel = clipLevel || 0.98
    processor.averaging = averaging || 0.95
    processor.clipLag = clipLag || 750

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    processor.connect(audioContext.destination)
    processor.checkClipping = function() {
        if (!this.clipping) return false
        if ((this.lastClip + this.clipLag) < window.performance.now()) this.clipping = false
        return this.clipping
    }

    processor.shutdown = function() {
        this.disconnect()
        this.onaudioprocess = null
    }

    return processor
}