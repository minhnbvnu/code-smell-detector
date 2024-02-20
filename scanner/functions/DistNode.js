function DistNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.pre  = T( 60);
        _.post = T(-18);
        _.x1L = _.x2L = _.y1L = _.y2L = 0;
        _.x1R = _.x2R = _.y1R = _.y2R = 0;
        _.b0 = _.b1 = _.b2 = _.a1 = _.a2 = 0;
        _.cutoff = 0;
        _.Q = 1;
        _.preScale = 0;
        _.postScale = 0;
    }