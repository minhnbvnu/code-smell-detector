function BiquadNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.biquad = new Biquad(_.samplerate);
        _.freq = T(340);
        _.band = T(1);
        _.gain = T(0);

        _.plotBefore = plotBefore;
        _.plotRange  = [-18, 18];
        _.plotFlush  = true;
    }