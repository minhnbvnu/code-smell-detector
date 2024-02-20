function NDictNode(_args) {
        T.Object.call(this, 1, _args);

        var _ = this._;
        _.defaultValue = 0;
        _.index = 0;
        _.dict  = {};
        _.ar    = false;
    }