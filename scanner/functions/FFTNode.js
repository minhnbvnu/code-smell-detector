function FFTNode(_args) {
        T.Object.call(this, 2, _args);
        fn.listener(this);
        fn.fixAR(this);

        this.real = new T.ChannelObject(this);
        this.imag = new T.ChannelObject(this);
        this.cells[3] = this.real.cell;
        this.cells[4] = this.imag.cell;

        var _ = this._;
        _.fft = new FFT(_.cellsize * 2);
        _.fftCell  = new fn.SignalArray(_.fft.length);
        _.prevCell = new fn.SignalArray(_.cellsize);
        _.freqs    = new fn.SignalArray(_.fft.length>>1);

        _.plotFlush = true;
        _.plotRange = [0, 32];
        _.plotBarStyle = true;
    }