function AudioletDevice(audiolet, sampleRate, numberOfChannels, bufferSize) {
    AudioletNode.call(this, audiolet, 1, 0);

    this.sink = Sink(this.tick.bind(this), numberOfChannels, bufferSize,
                     sampleRate);

    // Re-read the actual values from the sink.  Sample rate especially is
    // liable to change depending on what the soundcard allows.
    this.sampleRate = this.sink.sampleRate;
    this.numberOfChannels = this.sink.channelCount;
    this.bufferSize = this.sink.preBufferSize;

    this.writePosition = 0;
    this.buffer = null;
    this.paused = false;

    this.needTraverse = true;
    this.nodes = [];
}