function IFFTNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.fft = new FFT(_.cellsize * 2);
        _.fftCell    = new fn.SignalArray(this._.fft.length);
        _.realBuffer = new fn.SignalArray(this._.fft.length);
        _.imagBuffer = new fn.SignalArray(this._.fft.length);
    }