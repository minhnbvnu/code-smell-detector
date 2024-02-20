function StereoDelay(samplerate) {
        this.samplerate = samplerate;

        var bits = Math.ceil(Math.log(samplerate * 1.5) * Math.LOG2E);

        this.buffersize = 1 << bits;
        this.buffermask = this.buffersize - 1;
        this.writeBufferL = new T.fn.SignalArray(this.buffersize);
        this.writeBufferR = new T.fn.SignalArray(this.buffersize);
        this.readBufferL = this.writeBufferL;
        this.readBufferR = this.writeBufferR;
        this.delaytime = null;
        this.feedback  = null;
        this.cross = null;
        this.mix   = null;
        this.prevL = 0;
        this.prevR = 0;

        this.readIndex  = 0;
        this.writeIndex = 0;

        this.setParams(125, 0.25, false, 0.45);
    }