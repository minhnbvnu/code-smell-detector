function Compressor(samplerate, channels) {
        this.samplerate = samplerate;
        this.channels = channels;

        this.lastPreDelayFrames = 0;
        this.preDelayReadIndex  = 0;
        this.preDelayWriteIndex = DefaultPreDelayFrames;
        this.ratio       = -1;
        this.slope       = -1;
        this.linearThreshold = -1;
        this.dbThreshold = -1;
        this.dbKnee      = -1;
        this.kneeThreshold    = -1;
        this.kneeThresholdDb  = -1;
        this.ykneeThresholdDb = -1;
        this.K = -1;

        this.attackTime  = 0.003;
        this.releaseTime = 0.25;

        this.preDelayTime = 0.006;
        this.dbPostGain   = 0;
        this.effectBlend  = 1;
        this.releaseZone1 = 0.09;
        this.releaseZone2 = 0.16;
        this.releaseZone3 = 0.42;
        this.releaseZone4 = 0.98;

        this.detectorAverage = 0;
        this.compressorGain  = 1;
        this.meteringGain    = 1;

        this.delayBufferL = new T.fn.SignalArray(MaxPreDelayFrames);
        if (channels === 2) {
            this.delayBufferR = new T.fn.SignalArray(MaxPreDelayFrames);
        } else {
            this.delayBufferR = this.delayBufferL;
        }
        this.preDelayTime = 6;
        this.preDelayReadIndex = 0;
        this.preDelayWriteIndex = DefaultPreDelayFrames;
        this.maxAttackCompressionDiffDb = -1;
        this.meteringReleaseK = 1 - Math.exp(-1 / (this.samplerate * 0.325));

        this.setAttackTime(this.attackTime);
        this.setReleaseTime(this.releaseTime);
        this.setPreDelayTime(this.preDelayTime);
        this.setParams(-24, 30, 12);
    }