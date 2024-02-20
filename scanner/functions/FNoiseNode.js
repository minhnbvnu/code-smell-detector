function FNoiseNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.freq = T(440);
        _.reg = 0x8000;
        _.shortFlag = false;
        _.phase     = 0;
        _.lastValue = 0;
    }