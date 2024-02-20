function MoogFFNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.freq = T(100);
        _.gain = T(2);

        _.sr = T.samplerate;
        _.t  = 1 / _.sr;
        _.b0 = _.a1 = _.wcD = 0;
        _.s1 = _.s2 = _.s3 = _.s4 = 0;
    }