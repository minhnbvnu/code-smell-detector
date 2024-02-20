function ScopeNode(_args) {
        T.Object.call(this, 2, _args);
        fn.listener(this);
        fn.fixAR(this);

        var _ = this._;
        _.samples    = 0;
        _.writeIndex = 0;
        _.plotFlush = true;

        this.once("init", oninit);
    }