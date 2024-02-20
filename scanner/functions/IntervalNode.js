function IntervalNode(_args) {
        T.Object.call(this, 1, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        _.interval = T(1000);
        _.count = 0;
        _.delay   = 0;
        _.timeout = Infinity;
        _.currentTime = 0;
        _.delaySamples = 0;
        _.countSamples = 0;
        _.onended = fn.make_onended(this);

        this.on("start", onstart);
    }