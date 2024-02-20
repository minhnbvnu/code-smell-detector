function SpectrumNode(_args) {
        T.Object.call(this, 2, _args);
        fn.listener(this);
        fn.fixAR(this);

        var _ = this._;
        _.status  = WAIT_STATE;
        _.samples = 0;
        _.samplesIncr = 0;
        _.writeIndex  = 0;

        _.plotFlush = true;
        _.plotRange = [0, 32];
        _.plotBarStyle = true;

        this.once("init", oninit);
    }