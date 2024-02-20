function DelayNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.time  = T(100);
        _.fb    = T(0.2);
        _.cross = T(false);
        _.mix   = 0.33;

        _.delay = new StereoDelay(_.samplerate);
    }