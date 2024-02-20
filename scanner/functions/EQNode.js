function EQNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.biquads = new Array(7);

        _.plotBefore = plotBefore;
        _.plotRange  = [-18, 18];
        _.plotFlush  = true;
    }