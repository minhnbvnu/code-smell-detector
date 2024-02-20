function PhaserNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.freq = T("sin", {freq:1, add:1000, mul:250}).kr();
        _.Q    = T(1);
        _.allpass  = [];

        this.steps = 2;
    }