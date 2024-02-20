function Chorus(samplerate) {
        this.samplerate = samplerate;

        var bits = Math.round(Math.log(samplerate * 0.1) * Math.LOG2E);
        this.buffersize = 1 << bits;
        this.bufferL = new T.fn.SignalArray(this.buffersize + 1);
        this.bufferR = new T.fn.SignalArray(this.buffersize + 1);

        this.wave       = null;
        this._wave      = null;
        this.writeIndex = this.buffersize >> 1;
        this.readIndex  = 0;
        this.delayTime  = 20;
        this.rate       = 4;
        this.depth      = 20;
        this.feedback   = 0.2;
        this.wet        = 0.5;
        this.phase      = 0;
        this.phaseIncr  = 0;
        this.phaseStep  = 4;

        this.setWaveType("sin");
        this.setDelayTime(this.delayTime);
        this.setRate(this.rate);
    }