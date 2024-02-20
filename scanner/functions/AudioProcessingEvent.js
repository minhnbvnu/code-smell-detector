function AudioProcessingEvent(self) {
        var _ = self._;
        this.node = self;
        this.playbackTime = T.currentTime;
        if (_.numberOfInputs === 2) {
            this.inputBuffer  = new AudioBuffer(self, [_.inputBufferL, _.inputBufferR]);
        } else {
            this.inputBuffer  = new AudioBuffer(self, [_.inputBufferL]);
        }
        if (_.numberOfOutputs === 2) {
            this.outputBuffer = new AudioBuffer(self, [_.outputBufferL, _.outputBufferR]);
        } else {
            this.outputBuffer = new AudioBuffer(self, [_.outputBufferL]);
        }
    }