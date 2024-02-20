function COscNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.freq = T(440);
        _.osc1 = new Oscillator(_.samplerate);
        _.osc2 = new Oscillator(_.samplerate);
        _.osc1.step = _.cellsize;
        _.osc2.step = _.cellsize;
        _.tmp = new fn.SignalArray(_.cellsize);
        _.beats = 0.5;

        this.once("init", oninit);
    }