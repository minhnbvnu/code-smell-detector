function Reverb(samplerate, buffersize) {
        this.samplerate = samplerate;

        var i, imax;
        var k = samplerate / 44100;

        imax = CombParams.length * 2;
        this.comb = new Array(imax);
        this.combout = new Array(imax);
        for (i = 0; i < imax; ++i) {
            this.comb[i]    = new CombFilter(CombParams[i % CombParams.length] * k);
            this.combout[i] = new T.fn.SignalArray(buffersize);
        }

        imax = AllpassParams.length * 2;
        this.allpass = new Array(imax);
        for (i = 0; i < imax; ++i) {
            this.allpass[i] = new AllpassFilter(AllpassParams[i % AllpassParams.length] * k);
        }
        this.outputs = [ new T.fn.SignalArray(buffersize),
                         new T.fn.SignalArray(buffersize) ];
        this.damp = 0;
        this.wet  = 0.33;

        this.setRoomSize(0.5);
        this.setDamp(0.5);
    }