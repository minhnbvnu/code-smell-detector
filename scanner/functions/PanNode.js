function PanNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.pos  = T(0);
        _.panL = 0.5;
        _.panR = 0.5;
    }